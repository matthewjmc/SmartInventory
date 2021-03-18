USE Inventory;

SELECT 
	Items.item_name,
	Users.userID,
    Users.firstname,
    Users.lastname,
    Borrow_Record.date_borrowed,
    Borrow_Record.expected_return_date

    
FROM Borrow_Record
INNER JOIN Users
ON Borrow_Record.userID=Users.userID
INNER JOIN Items
ON Items.itemID=Borrow_Record.itemID
WHERE Items.itemID=2;
