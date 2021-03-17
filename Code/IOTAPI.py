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
    if header.get("Content-Type")=="application/json":
        cursor = db.connection.cursor()
        cursor.execute("SELECT item_name,description,availability FROM Items;")
        result = cursor.fetchall()
        if result:
            return jsonify(result)
    else:
        result = {
            "Error": "Invalid Request"
        }
        return jsonify(result),400


@app.route('/api/v1/withdraw',methods=["get"])
def GetWithdrawal():
    header = dict(request.headers)
    data = request.json
    if header.get("Content-Type")=="application/json":
        if data["command"] == "all":
            ### Change SQL Statements
            cursor = db.connection.cursor()
            cursor.execute("SELECT item_name,description,availability FROM Items;")
            result = cursor.fetchall()
            return jsonify({"result":"Request ALL Data"})

        elif data["command"] == "userID":
             ### Change SQL Statements and Add check For values 
            cursor = db.connection.cursor()
            cursor.execute("SELECT item_name,description,availability FROM Items;")
            result = cursor.fetchall()
            return jsonify({"result":"Request userID Data"})
        
        elif data["command"] == "itemID":
             ### Change SQL Statements and Add check for Values
            cursor = db.connection.cursor()
            cursor.execute("SELECT item_name,description,availability FROM Items;")
            result = cursor.fetchall()
            return jsonify({"result":"Request itemID Data"})
        else:
            result = {
                "Error": "Invalid Request"
            }
            return jsonify(result),400
    
    else:
        result = {
                "Error": "Invalid Request"
            }
        return jsonify(result),400

        


@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404


app.run(host="0.0.0.0",port=5000)
