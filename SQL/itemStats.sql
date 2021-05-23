USE Inventory;

SELECT 
	MONTHNAME(Borrow_Record.date_borrowed) AS Month,
    YEAR(Borrow_Record.date_borrowed) AS Year,
    Items.item_name AS Name,
    COUNT(Items.itemID) AS AmountBorrowed

FROM Borrow_Record
INNER JOIN Items
ON Borrow_Record.itemID=Items.itemID
GROUP BY MONTH(Borrow_Record.date_borrowed),Items.item_name;