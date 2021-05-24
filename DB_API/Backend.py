# subscriber
import paho.mqtt.client as mqtt
import pymysql
import json
import time
from collections import Counter
from threading import Thread
import os

client = mqtt.Client()
client.connect(os.getenv("MQTTHOST"), 1883)

con = pymysql.connect(
        host = os.getenv("MYSQLHOST"),
        user = os.getenv("MYSQLUSER"),
        password = os.getenv("MYSQLPass"),
        db = os.getenv("MYSQLDB"),
        cursorclass = pymysql.cursors.DictCursor
    )


def on_connect(client, userdata, flags, rc):
    #print("Connected to a broker!")
    client.subscribe("may")


def on_message(client, userdata, message):
    temp = message.payload.decode()
    data = json.loads(temp)
    print(data['Command'])
    if data['Command'] == "register":
        register_users(data)
    if data['Command'] == "borrow":
        borrow_items(data)
    if data['Command'] == "return":
        return_items(data)
    if data['Command'] == "update":
        add_stocks(data)
    if data['Command'] == "add":
        add_items(data)


# register new users (one-by-one)
# assumption: all users are already in the system
def register_users(data):
    kursor = con.cursor()
    sql = "INSERT INTO Users (`userID`, `firstname`, `lastname`, `role`) VALUES (%s, %s, %s,%s);"
    kursor.execute(sql, (data['UserID'], data['Name'], data['Lastname'], data['Role']))
    con.commit()
    print(kursor.rowcount, 'Registerd successfully!')


### return to hardware and UI to redirect page and trigger the hardware to scan nfc
def check_role(data):
    print('check')


# add new item to item table (one-by-one)
def add_items(data):
    kursor = con.cursor()
    sql = "INSERT INTO Items (`itemID`, `item_name`, `description`,`lending_period`) VALUES (%s, %s, %s,%s);"
    kursor.execute(sql, (data['ItemID'], data['ItemName'], data['Description'], data['LendingPeriod']))
    sql1 = "INSERT INTO Stock (`itemID`, `amount`, `availability`) VALUES (%s, '0', False);"
    kursor.execute(sql1, (data['ItemID']))
    con.commit()
    print(kursor.rowcount, 'Added item successfully!')


# add stock for already existed item
def add_stocks(data):
    kursor = con.cursor()
    sql_get = "SELECT amount FROM Stock WHERE itemID = %s"
    kursor.execute(sql_get,data['ItemID'])
    amount = kursor.fetchall()
    for old_amount in amount:
            for j in old_amount:
                #print(old_amount[j])
                sql = "UPDATE Stock SET `amount` = %s, `availability` = True WHERE `itemID` = %s"
                kursor.execute(sql, (old_amount[j]+data['Amount'],data['ItemID']))
    con.commit()
    print('Added stock successfully!')


# borrow items (one or multiple items at once) and update stock
def borrow_items(data):
    print(data['ItemID'])
    items = dict(Counter(data['ItemID']))
    print(items)
    for i in items:
        print(items[i])
        kursor = con.cursor()
        sql1 = """INSERT INTO Borrow_Record (`userID`,`itemID`,`amount`,`date_borrowed`,`expected_return_date`) 
                VALUES(%s,%s,%s,NOW(),(SELECT ADDDATE(NOW(), (SELECT `Items`.`lending_period`FROM `inventory`.`Items` WHERE `itemID` =%s))));"""
        kursor.execute(sql1, (data['UserID'], i, items[i],i))
        sql2 = """INSERT INTO Return_Record (`userID`,`itemID`,`amount`,`date_borrowed`,`expected_return_date`,`remaining_date`,`check_status`) 
                VALUES(%s,%s,%s,NOW(),(SELECT ADDDATE(NOW(), (SELECT `Items`.`lending_period`FROM `inventory`.`Items` WHERE `itemID` =%s))),
                (SELECT `Items`.`lending_period` FROM `inventory`.`Items` WHERE `itemID` =%s), False);"""
        kursor.execute(sql2, (data['UserID'], i,items[i],i,i))    
        sql_get = "SELECT amount FROM Stock WHERE itemID = %s"
        kursor.execute(sql_get, i)
        amount = kursor.fetchall()
        for old_amount in amount:
            for j in old_amount:
                #print(old_amount[j])
                new_amount = old_amount[j]-items[i]
                sql = "UPDATE Stock SET `amount` = %s WHERE `itemID` = %s"
                kursor.execute(sql, (new_amount,i))
                if new_amount == 0:
                    sql = "UPDATE Stock SET `availability` = False WHERE `itemID` = %s"
                    kursor.execute(sql, (i))
        con.commit()
    print(kursor.rowcount, 'borrow success!')


# return items (one or multiple items) with amount checked and update stock
def return_items(data):
    print(data['ItemID'])
    items = dict(Counter(data['ItemID']))
    print(items)
    for i in items:
        print(items[i])
        kursor = con.cursor()
        sql_get = "SELECT amount FROM Return_Record WHERE itemID = %s AND userID = %s"
        kursor.execute(sql_get,(i, data['UserID']))
        borrow_amount = kursor.fetchall()
        for amount in borrow_amount:
            for j in amount:
                if amount[j] == items[i]:
                    sql = "UPDATE Return_Record SET `check_status` = True WHERE `itemID` = %s AND userID = %s"
                    kursor.execute(sql,(i, data['UserID']))
                elif amount[j] > items[i]:
                    print("mai krob!")
                    new_val = amount[j]-items[i]
                    sql = "UPDATE Return_Record SET `amount` = %s WHERE `itemID` = %s AND userID = %s"
                    kursor.execute(sql,(new_val,i,data['UserID']))
        sql_get = "SELECT amount FROM Stock WHERE itemID = %s"
        kursor.execute(sql_get, i)
        amount = kursor.fetchall()
        for old_amount in amount:
            for k in old_amount:
                #print(old_amount[j])
                new_amount = old_amount[k]+items[i]
                sql = "UPDATE Stock SET `amount` = %s WHERE `itemID` = %s"
                kursor.execute(sql, (new_amount,i))
                if new_amount != 0:
                    sql = "UPDATE Stock SET `availability` = True WHERE `itemID` = %s"
                    kursor.execute(sql, (i))
        con.commit()
    print('return success!')


## auto loop
def update_overdue():
    kursor = con.cursor()
    sql_get = "SELECT amount FROM Borrow_Record WHERE `itemID` = `itemID` AND `userID` = `userID`"
    kursor.execute(sql_get)
    sql = """INSERT INTO Overdue (`userID`,`itemID`,`amount`) VALUES(
        (SELECT userID FROM Return_Record WHERE `expected_return_date` >= CURDATE() AND `check_status` = False), 
        (SELECT itemID FROM Return_Record WHERE `expected_return_date` >= CURDATE() AND `check_status` = False), 
        (SELECT amount FROM Borrow_Record WHERE `itemID` = `itemID` AND `userID` = `userID`))"""
    kursor.execute(sql)
    con.commit()
    print("overdue checked!")


class ThreadTest():
    def loop1(self):
        while True:
            client.on_connect = on_connect
            client.on_message = on_message
            client.loop_forever()

    def loop2(self):
        while True:
            update_overdue()
            time.sleep(5)

if __name__ == '__main__':
    T1 = Thread(target=ThreadTest().loop1, args=())
    T2 = Thread(target=ThreadTest().loop2, args=())
    T1.start()
    T2.start()
    T1.join()
    T2.join()