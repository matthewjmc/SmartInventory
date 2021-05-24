CREATE SCHEMA `Inventory`;

USE Inventory;

CREATE TABLE Users (
  userID INT NOT NULL,
  firstname VARCHAR(40) NOT NULL,
  lastname VARCHAR(40) NOT NULL,
  role VARCHAR(20) NOT NULL,
  PRIMARY KEY (`userID`)
);

CREATE TABLE Stock (
  stockID INT NOT NULL,
  item_name VARCHAR(100) NOT NULL,
  amount INT NOT NULL,
  lending_period INT NOT NULL,
  availability BOOLEAN NOT NULL,
  PRIMARY KEY (`stockID`)
);

CREATE TABLE Items (
  itemID VARCHAR(100) NOT NULL,
  item_name VARCHAR(100) NOT NULL,
  stockID INT NOT NULL,
  PRIMARY KEY (`itemID`)
);

CREATE TABLE Borrow_Record (
  userID INT NOT NULL,
  itemID VARCHAR(100) NOT NULL,
  amount INT NOT NULL,
  date_borrowed DATE NOT NULL,
  expected_return_date DATE NOT NULL,
  PRIMARY KEY (`userID`, `itemID`),
  FOREIGN KEY(userID) references Users(userID),
  FOREIGN KEY(itemID) references Items(itemID)
);

CREATE TABLE Return_Record (
  userID INT NOT NULL,
  itemID VARCHAR(100) NOT NULL,
  amount INT NOT NULL,
  date_borrowed DATE NOT NULL,
  expected_return_date DATE NOT NULL,
  remaining_date INT,
  check_status BOOLEAN NOT NULL,
  PRIMARY KEY (`userID`, `itemID`),
  FOREIGN KEY(userID) references Users(userID),
  FOREIGN KEY(itemID) references Items(itemID)
);

CREATE TABLE Overdue (
  userID INT NOT NULL,
  itemID VARCHAR(100) NOT NULL,
  amount INT NOT NULL,
  PRIMARY KEY (`userID`, `itemID`),
  CONSTRAINT Return_Record_unique UNIQUE (itemID, userID),
  FOREIGN KEY(userID) references Users(userID),
  FOREIGN KEY(itemID) references Items(itemID)
);