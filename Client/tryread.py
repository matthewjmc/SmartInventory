import json 
  
# Opening JSON file 
f = open('client1.json',) 
  
# returns JSON object as  
# a dictionary 
data = json.load(f) 
  
# Iterating through the json 
# list 
#for i in data[['user']]: 
print(data)
print(data['user']["command"][1])
  
# Closing file 
f.close() 