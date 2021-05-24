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
    client.subscribe("backend")

def on_message(client, userdata, message):
    temp = message.payload.decode()
    data = json.loads(temp)
    print(temp)
    # print(data['Command'])
    if data['Command'] == "register":
        register_users(data)
    if data['Command'] == "borrowed":
        borrow_items(data)
    if data['Command'] == "returned":
        return_items(data)
    if data['Command'] == "update":
        update_stocks(data)
    if data['Command'] == "add":
        add_items(data)
    if data['Finger'] == "get":
        get_role(data)


# register new users (one-by-one)
# assumption: all users are already in the system
def register_users(data):
    kursor = con.cursor()
    sql = "INSERT INTO Users (`userID`, `firstname`, `lastname`, `role`) VALUES (%s, %s, %s,%s);"
    kursor.execute(sql, (data['UserID'], data['Name'], data['Lastname'], data['Role']))
    con.commit()
    print(kursor.rowcount, 'Registerd successfully!')


### return to hardware and UI to redirect page and trigger the hardware to scan nfc
def get_role(data):
    kursor = con.cursor()
    sql_get = "SELECT role FROM Users WHERE userID = %s"
    kursor.execute(sql_get, data['UserID'])
    role = kursor.fetchall()
    temp = {}
    for i in role:
            for j in i:
                temp = {"Command": data['Command'], "UserID": data['UserID'], "Role": i[j]}
    data_out = json.dumps(temp)
    print(data_out)
    client.publish("hardware", data_out)


# add new item to stock table (one-by-one)
def add_items(data):
    kursor = con.cursor()
    sql = "INSERT INTO Stock (`stockID`,`item_name`,`amount`,`lending_period`,`availability`) VALUES (%s, %s, 0,%s,False);"
    kursor.execute(sql, (data['StockID'], data['ItemName'], data['LendingPeriod']))
    con.commit()
    print(kursor.rowcount, 'Added item successfully!')


# update stock for already existed item
def update_stocks(data):
    kursor = con.cursor()
    sql_get = "SELECT amount, item_name FROM Stock WHERE stockID = %s" 
    kursor.execute(sql_get, data['StockID'])
    temp = kursor.fetchall()
    for i in temp:
        print(i['amount'])
    # for old_amount in amount:
    #         for j in old_amount:
    #             #print(old_amount[j])
    #             sql = "UPDATE Stock SET `amount` = %s, `availability` = True WHERE `itemID` = %s"
    #             kursor.execute(sql, (old_amount[j]+data['Amount'],data['ItemID']))
    # con.commit()
    # print('Added stock successfully!')


# borrow items (one or multiple items at once) and update stock
def borrow_items(data):
    print(data['ItemID'])
    # items = dict(Counter(data['ItemID']))
    # print(items)
    for i in data['ItemID']:
        kursor = con.cursor()
        sql = "SELECT stockID FROM Items WHERE itemID = %s"
        kursor.execute(sql, i)
        tempstockID = kursor.fetchall()
        stockID = 0
        for j in tempstockID:
            stockID = j['stockID']
        print(stockID)
        sql1 = """INSERT INTO Borrow_Record (`userID`,`itemID`,`amount`,`date_borrowed`,`expected_return_date`) 
                VALUES(%s,%s,1,NOW(),(SELECT ADDDATE(NOW(), (SELECT `Stock`.`lending_period`FROM `Stock` WHERE `stockID` =%s))));"""
        kursor.execute(sql1, (data['UserID'], i, stockID))
        sql2 = """INSERT INTO Return_Record (`userID`,`itemID`,`amount`,`date_borrowed`,`expected_return_date`,`remaining_date`,`check_status`) 
                VALUES(%s,%s,1,NOW(),(SELECT ADDDATE(NOW(), (SELECT `lending_period`FROM `Stock` WHERE `stockID` =%s))),(SELECT `Stock`.`lending_period` FROM `Stock` WHERE `stockID` =%s), False);"""
        kursor.execute(sql2, (data['UserID'], i,stockID,stockID))    
        sql_get = "SELECT amount FROM Stock WHERE stockID = %s"
        kursor.execute(sql_get, stockID)
        amount = kursor.fetchall()
        for old_amount in amount:
            for j in old_amount:
                #print(old_amount[j])
                new_amount = old_amount[j]-1
                sql = "UPDATE Stock SET `amount` = %s WHERE `stockID` = %s"
                kursor.execute(sql, (new_amount, stockID))
                if new_amount == 0:
                    sql = "UPDATE Stock SET `availability` = False WHERE `stockID` = %s"
                    kursor.execute(sql, (stockID))
        con.commit()
    print(kursor.rowcount, 'borrow success!')


# return items (one or multiple items) with amount checked and update stock
def return_items(data):
    print(data['ItemID'])
    for i in data['ItemID']:
        kursor = con.cursor()
        # sql_get = "SELECT amount FROM Return_Record WHERE itemID = %s AND userID = %s"
        # kursor.execute(sql_get,(i, data['UserID']))
        # borrow_amount = kursor.fetchall()
        # for amount in borrow_amount:
        #     for j in amount:
        #         if amount[j] == items[i]:
        #             sql = "UPDATE Return_Record SET `check_status` = True WHERE `itemID` = %s AND userID = %s"
        #             kursor.execute(sql,(i, data['UserID']))
        #         elif amount[j] > items[i]:
        #             print("mai krob!")
        #             new_val = amount[j]-items[i]
        #             sql = "UPDATE Return_Record SET `amount` = %s WHERE `itemID` = %s AND userID = %s"
        #             kursor.execute(sql,(new_val,i,data['UserID']))
        sql = "UPDATE Return_Record SET `check_status` = True WHERE `itemID` = %s AND userID = %s"
        kursor.execute(sql,(i, data['UserID']))
        
        sql_get_stockID = "SELECT stockID FROM Items WHERE itemID = %s"
        kursor.execute(sql_get_stockID, i)
        tempstockID = kursor.fetchall()
        stockID = 0
        for j in tempstockID:
            stockID = j['stockID']
        print(stockID)

        sql_get = "SELECT amount FROM Stock WHERE stockID = %s"
        kursor.execute(sql_get, stockID)
        amount = kursor.fetchall()
        for old_amount in amount:
            for k in old_amount:
                #print(old_amount[j])
                new_amount = old_amount[k]+1
                sql = "UPDATE Stock SET `amount` = %s WHERE `stockID` = %s"
                kursor.execute(sql, (new_amount,stockID))
                if new_amount != 0:
                    sql = "UPDATE Stock SET `availability` = True WHERE `stockID` = %s"
                    kursor.execute(sql, (stockID))
        con.commit()
    print('return success!')


def update_overdue():
    kursor = con.cursor()
    sql_get = "SELECT * FROM Return_Record WHERE check_status = False"
    kursor.execute(sql_get)
    temp = kursor.fetchall()
    print(temp)
    # sql = """INSERT INTO Overdue (`userID`,`itemID`,`amount`) VALUES(
    #     (SELECT userID FROM Return_Record WHERE `expected_return_date` >= CURDATE() AND `check_status` = False), 
    #     (SELECT itemID FROM Return_Record WHERE `expected_return_date` >= CURDATE() AND `check_status` = False), 
    #     (SELECT amount FROM Borrow_Record WHERE `itemID` = `itemID` AND `userID` = `userID`))"""
    # kursor.execute(sql)
    # con.commit()
    # print("overdue checked!")


class ThreadTest():
    def loop1(self):
        while True:
            client.on_connect = on_connect
            client.on_message = on_message
            client.loop_forever()

    def loop2(self):
        while True:
            update_overdue()
            time.sleep(3)
        

if __name__ == '__main__':
    T1 = Thread(target=ThreadTest().loop1, args=())
    T2 = Thread(target=ThreadTest().loop2, args=())
    T1.start()
    T2.start()
    T1.join()
    T2.join()