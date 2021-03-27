# API Documentation

## Request Items Stored in System

```
GET /api/v1/inventory
Accept: application/json
```
### Return
```
[
    {
        "item_name": "HoloLens",
        "description": "Microsoft Hololens",
        "availability": 1,
        "amount": 3
    },
    {
        "item_name": "Oculus VR",
        "description": "Oculus Virtual Reality Goggles",
        "availability": 1,
        "amount": 4
    },
    {
        "item_name": "HTC VIVE",
        "description": "HTC Vive Virtual Reality Goggles",
        "availability": 1,
        "amount": 3
    },
    {
        "item_name": "NZXT Computers",
        "description": "NZXT High Performance Computers",
        "availability": 1,
        "amount": 5
    },
    {
        "item_name": "Alienware PC",
        "description": "Alienware Personal Computer",
        "availability": 1,
        "amount": 2
    },
    {
        "item_name": "Cobot",
        "description": "Cobot Arm",
        "availability": 1,
        "amount": 4
    },
    {
        "item_name": "Nao",
        "description": "Nao Robot",
        "availability": 1,
        "amount": 2
    }
]
```



## Get Withdrawal History
```
GET /api/v1/withdraw
Accept: application/json
Data: # Options {all, userID, ItemID} 
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