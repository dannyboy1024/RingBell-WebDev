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
### /timeSlots
* get an array of all available time slots
* sample return value:
  ```
  {
    "success": true,
    "data": [
        {
            "timeID": 4,
            "time": "2021-11-24T09:00:00.000Z",
            "_id": "6175cc0109a56ef948e07b75"
        },
        {
            "timeID": 1,
            "time": "2021-11-24T06:00:00.000Z",
            "_id": "6175cc0109a56ef948e07b76"
        },
        {
            "timeID": 2,
            "time": "2021-11-24T07:00:00.000Z",
            "_id": "6175cc0409a56ef948e07b9e"
        },
        {
            "timeID": 3,
            "time": "2021-11-24T08:00:00.000Z",
            "_id": "6175cc0509a56ef948e07bc1"
        }
    ]
  }
  ```


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
        "timeSlot": {
            "timeID": 4,
            "time": "2021-11-24T09:00:00.000Z",
            "_id": "6175cc0109a56ef948e07b75"
        }
    }
   }
   ```
  
### /confirmMatch
* confirm matching a Bell-ringer with a Listener
* note that it's easier to reuse the "listener" returned by /getMatch
* sample body:
  ```
  {
    "timeSlot": {
                "timeID": 1,
                "time": {
                    "$date": "2021-11-24T06:00:00.000Z"
                },
                "_id": {
                    "$oid": "6175cc0109a56ef948e07b86"
                }
            },
    "listener": {
        "_id": {
            "$oid": "616bb9b94e853592c2104185"
        },
        "name": "Mike",
        "email": "ringbell.test@gmail.com",
        "university": "多伦多大学 University of Toronto",
        "availability": [
            {
                "timeID": 1,
                "time": {
                    "$date": "2021-11-24T06:00:00.000Z"
                },
                "_id": {
                    "$oid": "6175cc0109a56ef948e07b86"
                }
            }
        ],
        "occupied_availability": [],
        "application_time": {
            "$date": "2021-10-17T05:50:49.778Z"
        },
        "slug": "mike",
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
