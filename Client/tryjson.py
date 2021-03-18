import json

def writeToJSONFile(path, fileName, data):
    filePathNameWExt = './' + path +'/' +fileName + '.json'
    with open(filePathNameWExt, 'w')as fp:
        json.dump(data,fp)


path = './'
fileName= 'client2'

data= {}
data['userId'] = '456789'
data['command'] = 'denied'
data['data'] = 'True'

writeToJSONFile(path,fileName,data)