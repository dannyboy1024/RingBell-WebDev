import json
import openpyxl

NUM_ROWS = 13
TIMEZONE_OFFSET = 4 

def getListeners(excelFileName):
    
    # Listener Attributes
    attributes = ['', 'university', 'name', 'email', 'availability']
    days = ['周日','周一','周二','周三','周四','周五','周六']
    
    # Open the excel
    wb = openpyxl.load_workbook(excelFileName)
    sheet = wb.active
    
    # Generate listeners as dictionaries.
    listeners = []
    for r in range(3,NUM_ROWS+1):
        listener = {}
        for c in range(1,len(attributes)):    
            cell = sheet.cell(row = r, column = c)
            curAttribute = attributes[c]
            if cell.value==None:
                listener[curAttribute] = ''
                continue
            if curAttribute == 'availability':
                timeSlots = cell.value.split(',')
                for slot in timeSlots:
                    lo = 0
                    while slot[lo]==' ': lo += 1
                    day = days.index(slot[lo:].split(' ')[0])
                    hour = int(slot[lo:].split(' ')[1].split(':')[0])
                    hour = hour+12 if slot[lo:].split(' ')[1][-2:]=='pm' else hour
                    # Apply time zone offset
                    if hour+TIMEZONE_OFFSET>=24:
                        day = (day+1) % 7
                        hour = hour+TIMEZONE_OFFSET-24
                    else:
                        hour += TIMEZONE_OFFSET
                    if curAttribute in listener:
                        listener[curAttribute].append({'day_in_week':day, 'hour':hour})
                    else:
                        listener[curAttribute] = [{'day_in_week':day, 'hour':hour}]
            else:
                listener[curAttribute] = cell.value
        listeners.append(listener)
    return listeners

def genJsonFile(listeners, jsonFileName):
    # the json file where the output must be stored
    out_file = open(jsonFileName, "w", encoding='utf8')
    json.dump(listeners, out_file, ensure_ascii=False, indent = 6)
    out_file.close()

genJsonFile(getListeners('uwo_listeners.xlsx'), 'uwo_listeners.json')






# data = [
#     {
#         "name": "Dimitrescu",
#         "email": "bellring.test@gmail.com",
#         "university": "多伦多大学 University of Toronto",
#         "availability": [
#             {
#                 "day_in_week": "6",
#                 "hour": "6"
#             }
#         ],
#         "occupied_availability": [],
#         "slug": "dimitrescu",
#         "__v": 0
#     },
#     {
#         "name": "hahaha",
#         "email": "bellring.test@gmail.com",
#         "university": "多伦多大学 University of Toronto",
#         "availability": [
#             {
#                 "day_in_week": "6",
#                 "hour": "6"
#             }
#         ],
#         "occupied_availability": [],
#         "slug": "dimitrescu",
#         "__v": 0
#     }
# ]