USE Inventory;

SELECT EXISTS(SELECT * FROM Users WHERE userID = ?);


INSERT IGNORE INTO Users(userID,firstname,lastname,role)
	VALUES 
    (?,?,?,?);