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
    
    
INSERT INTO Items(itemID,item_name,description,lending_period)
	VALUES
    (1,"HoloLens","Microsoft Hololens",14),
    (2,"Oculus VR","Oculus Virtual Reality Goggles",7),
    (3,"HTC VIVE","HTC Vive Virtual Reality Goggles",12),
    (4,"NZXT Computers","NZXT High Performance Computers",14),
    (5,"Alienware PC","Alienware Personal Computer",13),
    (6,"Cobot","Cobot Arm",13),
    (7,"Nao","Nao Robot",14);
    

INSERT INTO Borrow_Record(userID,itemID,amount,date_borrowed,expected_return_date)
	VALUES
    (61011003,2,1,"2021-03-1","2021-03-8"),
    (61011004,2,1,"2021-03-5","2021-03-12"),
    (61011004,3,1,"2021-03-2","2021-03-14"),
    (61011005,7,1,"2021-03-7","2021-03-21");
    

INSERT INTO Return_Record(userID,itemID,expected_return_date,check_status)
	VALUES
    (61011005,7,"2021-03-12",false),
    (61011006,4,"2021-02-10",true),
    (61011007,6,"2021-02-22",true),
    (61011008,1,"2021-02-27",true),
    (61011009,5,"2021-02-19",true);
    

INSERT INTO Overdue(userID,itemID,amount)
	VALUES
	(61011003,2,1),
    (61011004,2,1),
    (61011004,3,1);
    
INSERT INTO Stock(itemID,amount,availability)
	VALUES
    (1,3,true),
    (2,4,true),
    (3,3,true),
    (4,5,true),
    (5,2,true),
    (6,4,true),
    (7,2,true);
    
    
    
    
    
    
    
    
    
    
    