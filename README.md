# RingBell API

<br />

## Base URL:
https://ringbell-api.herokuapp.com/api/v1/listeners

<br />

## GET
### /
* get all Listeners
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

<br />

## PUT
### /\<id\>
* update single Listener by ID

<br />

## DELETE
### /\<id\>
* delete single Listene by ID
