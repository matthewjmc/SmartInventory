USE Inventory;

SELECT 
    Items.item_name,
    Items.description,
    Stock.availability,
    Stock.amount
    
FROM Stock
INNER JOIN Items ON Stock.itemID=Items.itemID;