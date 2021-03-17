USE Inventory;

INSERT INTO Users(userID,firstname,lastname,role)
	VALUES 
    (61011000,"Matthew","McMullin","Student"),
	(61011001,"Nonthicha","Prasongsuthon","Student"),
    (61011002,"Lu","Somsuay","Student"),
    (61011003,"Lucy","Somsuay","Student"),
    (61011004,"Hole","Somsuay","Student"),
    (61011005,"Vorachat","Somsuay","Student"),
    (61011006,"Tagun","Jivasithikul","Student"),
    (61011007,"Wiroje","Jivasithikul","Student"),
    (61011008,"Jiamjit","Jivasithikul","Student"),
    (61011009,"Booky","Prasongsuthon","Student");
    
    
INSERT INTO Items(itemID,item_name,description,availability,lending_period)
	VALUES
    (1,"HoloLens","Microsoft Hololens",true,14),
    (2,"Oculus VR","Oculus Virtual Reality Goggles",true,7),
    (3,"HTC VIVE","HTC Vive Virtual Reality Goggles",true,12),
    (4,"NZXT Computers","NZXT High Performance Computers",true,14),
    (5,"Alienware PC","Alienware Personal Computer",true,13),
    (6,"Cobot","Cobot Arm",true,13),
    (7,"Nao","Nao Robot",true,14);
    

INSERT INTO Borrow_Record(userID,itemID,date_borrowed,expected_return_date)
	VALUES
    (61011003,2,"2021-03-1","2021-03-8"),
    (61011004,2,"2021-03-5","2021-03-10"),
    (61011004,3,"2021-03-2","2021-03-9"),
    (61011005,7,"2021-03-7","2021-03-12");
    