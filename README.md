# RingBell API

<br />

## Base URL:
https://ringbell-api.herokuapp.com/api/v1/listeners

<br />

## GET
### /
* get all Listeners
* auto update listeners' availability based on current time (WIP)
### /\<id\>
* get single Listener by ID

<br />

## POST
### /
* create a Listener
* sample body:
  ```
  {
    "name": "Lio",
    "university": "多伦多大学 University of Toronto",
    "email": "bellringtest@gmail.com",
    "availability": [50, 167],
    "occupied_availability": []
  }
  ```
  
### /getMatch
* get matched Listener
* sample body:
  ```
  {
    "title": "User chosen time slots IDs",
    "body": [1,2,3]
  }
  ```
 * sample return value:
   ```
   {
    "success": true,
    "data": {
        "listener": {
            "_id": "616bb9ae4e853592c2104183",
            "name": "Kate",
            "slug": "kate",
            "email": "bellringtest@gmail.com",
            "university": "多伦多大学 University of Toronto",
            "application_time": "2021-10-17T05:50:38.898Z",
            "availability": [
                1,
                2,
                3
            ],
            "occupied_availability": [],
            "__v": 0
        },
        "timeSlot": 1
    }
   }
   ```
  
### /confirmMatch
* confirm matching a Bell-ringer with a Listener
* note that it's easier to reuse the "listener" returned by /getMatch
* sample body:
  ```
  {
    "timeSlot": 1,
    "listener": {
        "_id": "616bb9b94e853592c2104185",
        "name": "Mike",
        "slug": "mike",
        "email": "ringbell.test@gmail.com",
        "university": "多伦多大学 University of Toronto",
        "application_time": "2021-10-17T05:50:49.778Z",
        "availability": [
            2,
            3,
            1
        ],
        "occupied_availability": [],
        "__v": 0
    },
    "bellRinger": {
        "email": "ringbell.test@gmail.com",
        "name": "John"
    }
  }
  ```

<br />

## PUT
### /\<id\>
* update single Listener by ID

<br />

## DELETE
### /\<id\>
* delete single Listener by ID
