CREATE SCHEMA `Inventory`;

USE Inventory;

CREATE TABLE `Users` (
  `userID` INT NOT NULL,
  `firstname` VARCHAR(40) NOT NULL,
  `lastname` VARCHAR(40) NOT NULL,
  `role` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`userID`)
);

CREATE TABLE `Items` (
  `itemID` INT NOT NULL,
  `item_name` VARCHAR(100) NOT NULL,
  `description` LONGTEXT NULL,
  `lending_period` INT NOT NULL,
  PRIMARY KEY (`itemID`)
);

CREATE TABLE `Borrow_Record` (
  `userID` INT NOT NULL,
  `itemID` INT NOT NULL,
  `amount` INT NOT NULL,
  `date_borrowed` DATE NOT NULL,
  `expected_return_date` DATE NOT NULL,
  PRIMARY KEY (`userID`, `itemID`),
  FOREIGN KEY(userID) references Users(userID),
  FOREIGN KEY(itemID) references Items(itemID)
);

CREATE TABLE `Return_Record` (
  `userID` INT NOT NULL,
  `itemID` INT NOT NULL,
  `expected_return_date` DATE NOT NULL,
  `check_status` BOOLEAN NOT NULL,
  PRIMARY KEY (`userID`, `itemID`),
  FOREIGN KEY(userID) references Users(userID),
  FOREIGN KEY(itemID) references Items(itemID)
);

CREATE TABLE `Overdue` (
  `userID` INT NOT NULL,
  `itemID` INT NOT NULL,
  `amount` INT NOT NULL,
  PRIMARY KEY (`userID`, `itemID`),
  CONSTRAINT Return_Record_unique UNIQUE (itemID, userID),
  FOREIGN KEY(userID) references Users(userID),
  FOREIGN KEY(itemID) references Items(itemID)
);

CREATE TABLE `Stock` (
  `stockID` INT NOT NULL AUTO_INCREMENT,
  `itemID` INT NOT NULL,
  `amount` INT NOT NULL,
  `availability` BOOLEAN NOT NULL,
  PRIMARY KEY (`stockID`),
  FOREIGN KEY (itemID) references Items(itemID)
);