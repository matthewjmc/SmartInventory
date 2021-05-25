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
    
INSERT INTO Stock(stockID,item_name,amount,lending_period,availability)
	VALUES
    (1,"HoloLens",3,14,true),
    (2,"Oculus VR",4,7,true),
    (3,"HTC VIVE",3,12,true),
    (4,"NZXT Computers",5,14,true),
    (5,"Alienware PC",2,13,true),
    (6,"Cobot",4,13,true),
    (7,"Nao",2,14,true);

INSERT INTO Items(itemID,item_name,description,stockID)
	VALUES
    (1,"HoloLens","Microsoft Hololens",1),
    (2,"Oculus VR","Oculus Virtual Reality Goggles",2),
    (3,"HTC VIVE","HTC Vive Virtual Reality Goggles",3),
    (4,"NZXT Computers","NZXT High Performance Computers",4),
    (5,"Alienware PC","Alienware Personal Computer",5),
    (6,"Cobot","Cobot Arm",6),
    (7,"Nao","Nao Robot",7);
    

INSERT INTO Borrow_Record(userID,itemID,amount,date_borrowed,expected_return_date)
	VALUES
    (61011003,2,1,"2021-03-1","2021-03-8"),
    (61011004,2,1,"2021-03-5","2021-03-12"),
    (61011004,3,1,"2021-03-2","2021-03-14"),
    (61011005,7,1,"2021-03-7","2021-03-21");


INSERT INTO Overdue(userID,itemID)
	VALUES
	(61011005,7),
    (61011006,4),
    (61011007,6),
    (61011008,1),
    (61011009,5);

INSERT INTO Return_Record(userID,itemID,amount,date_borrowed,expected_return_date,check_status,overdueID)
	VALUES
    (61011005,7,1,"2021-03-1","2021-03-12",false,1),
    (61011006,4,2,"2021-02-1","2021-02-10",true,2),
    (61011007,6,1,"2021-02-10","2021-02-22",true,3),
    (61011008,1,2,"2021-02-12","2021-02-27",true,4),
    (61011009,5,1,"2021-02-10","2021-02-19",true,5);
    


    

    
    
    
    
    
    
    
    
    
    
    