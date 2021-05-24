USE Inventory;

-- SELECT statID,FROM_UNIXTIME(time),userID from loginStat;
SELECT 
    Users.userID,
    CONCAT_WS(" ",Users.firstname,Users.lastname) AS FullName,
    FROM_UNIXTIME(loginStat.time)

FROM loginStat
INNER JOIN Users
ON loginStat.userID=Users.userID;