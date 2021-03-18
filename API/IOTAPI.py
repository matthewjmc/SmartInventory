import flask
from flask import request,jsonify,redirect, url_for, Response
from flask_mysqldb import MySQL
import sys
print(sys.version)

app = flask.Flask(__name__)
app.config["DEBUG"] = True
 
app.config['MYSQL_HOST'] = 'mariadb'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '123456789'
app.config['MYSQL_DB'] = 'Inventory'

db = MySQL(app)

@app.route('/api/v1/inventory', methods=["get"])
def GetInventory():
    header = dict(request.headers)
    if header.get("Accept")=="application/json":
        cursor = db.connection.cursor()
        cursor.execute("SELECT Items.item_name, Items.description, Stock.availability, Stock.amount FROM Stock INNER JOIN Items ON Stock.itemID=Items.itemID;")
        result = cursor.fetchall()
        if result:
            print(result,flush=True)
            temp = []
            for i in result:
                total = {
                    "name":i[0],
                    "desc":i[1],
                    "available":i[2],
                    "quantity":i[3]
                }
                temp.append(total)
            return jsonify(temp)
    else:
        result = {
            "Error": "Invalid Content-Type"
        }
        return jsonify(result),400


@app.route('/api/v1/withdraw',methods=["get"])
def GetWithdrawal():
    header = dict(request.headers)
    data = request.json
    command  = data["command"]
    if header.get("Accept")=="application/json":
        if command == "all":
            cursor = db.connection.cursor()
            cursor.execute("SELECT Items.item_name,Users.userID,Users.firstname,Users.lastname,Borrow_Record.date_borrowed,Borrow_Record.expected_return_date FROM Borrow_Record INNER JOIN Users ON Borrow_Record.userID=Users.userID INNER JOIN Items ON Items.itemID=Borrow_Record.itemID;")
            result = cursor.fetchall()
            temp = []
            for i in result:
                total = {
                    "itemName":i[0],
                    "userID":i[1],
                    "firstname":i[2],
                    "lastname":i[3],
                    "dateBorrowed":i[4],
                    "expectedReturn":i[5]
                }
                temp.append(total)
            return jsonify(temp)

        elif command == "userID" and "value" in data:
            values = data["value"]
            cursor = db.connection.cursor()
            cursor.execute(f"SELECT Items.item_name,Users.userID,Users.firstname,Users.lastname,Borrow_Record.date_borrowed,Borrow_Record.expected_return_date FROM Borrow_Record INNER JOIN Users ON Borrow_Record.userID=Users.userID INNER JOIN Items ON Items.itemID=Borrow_Record.itemID WHERE Users.userID= {values};")
            result = cursor.fetchall()
            temp = []
            for i in result:
                total = {
                    "itemName":i[0],
                    "userID":i[1],
                    "firstname":i[2],
                    "lastname":i[3],
                    "dateBorrowed":i[4],
                    "expectedReturn":i[5]
                }
                temp.append(total)
            return jsonify(temp)

        elif command == "itemID" and "value" in data:
            values = data["value"]
            cursor = db.connection.cursor()
            cursor.execute(f"SELECT Items.item_name,Users.userID,Users.firstname,Users.lastname,Borrow_Record.date_borrowed,Borrow_Record.expected_return_date FROM Borrow_Record INNER JOIN Users ON Borrow_Record.userID=Users.userID INNER JOIN Items ON Items.itemID=Borrow_Record.itemID WHERE Items.itemID= {values};")
            result = cursor.fetchall()
            temp = []
            for i in result:
                total = {
                    "itemName":i[0],
                    "userID":i[1],
                    "firstname":i[2],
                    "lastname":i[3],
                    "dateBorrowed":i[4],
                    "expectedReturn":i[5]
                }
                temp.append(total)
            return jsonify(temp)
        else:
            result = {
                "Error": "Invalid Request"
            }
            return jsonify(result),400
    
    else:
        result = {
                "Error": "Invalid Content-Type"
            }
        return jsonify(result),400




@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404



app.run(host="0.0.0.0",port=5000)
