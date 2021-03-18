# API Documentation

## Request Items Stored in System

```
GET /api/v1/inventory
Content-Type: application/json
```
### Return
```
[
    [
        "HoloLens",
        "Microsoft Hololens",
        1,
        3
    ],
    [
        "Oculus VR",
        "Oculus Virtual Reality Goggles",
        1,
        4
    ],
    [
        "HTC VIVE",
        "HTC Vive Virtual Reality Goggles",
        1,
        3
    ],
    [
        "NZXT Computers",
        "NZXT High Performance Computers",
        1,
        5
    ]
]
```



## Get Withdrawal History
```
GET /api/v1/withdraw
Content-Type: application/json
Data: # Options {all, userID, ItemID} Body not Header
```
### Data Format in Header
```
Data:{
    command: all
}
```
```
Data:{
    command: userID,
    value: "61011279"
}
```
```
Data:{
    command: itemID,
    value: "7"
}
```