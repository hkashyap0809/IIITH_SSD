import csv

arr=[] 

with open('./lab_11_data.csv', mode ='r')as file:
   csvFile = csv.reader(file)
   for lines in csvFile:
   	arr.append(lines)


# (i)
fields = arr[0]
arr.pop(0)
length = len(fields)

for i in range (6):
	fields.pop(length-i-1);
	
for i in range(len(arr)):
	for j in range (6):
		arr[i].pop(length-j-1);



# (ii)
result = list(filter(lambda row:(float(row[6])>=-3), arr))


# (iii)
openList = list(map(lambda row:float(row[1].replace(",","")),result))
highList = list(map(lambda row:float(row[2].replace(",","")),result))
lowList = list(map(lambda row:float(row[3].replace(",","")),result))

openAvg = sum(openList)/len(openList)
highAvg = sum(highList)/len(highList)
lowAvg = sum(lowList)/len(lowList)

averageFileName = "./avg_output.txt"
file = open(averageFileName,"w")

averageOutput =str(openAvg)+"\n" +str(highAvg)+"\n"+str(lowAvg);
file.write(averageOutput);
file.close()




# (iv)
start=input()
finalResult = list(filter(lambda row:(row[0][0]==start),result))



# (v)    
outputFilename = "./stock_output.txt"
outputFile = open(outputFilename,"w")

output=''

for i in range(len(finalResult)):
	output = output + (" ".join(finalResult[i]))+"\n"
	
outputFile.write(output)





    

    

    
    
    
    