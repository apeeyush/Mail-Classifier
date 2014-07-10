import sys
import re
import os
from os import listdir
from os.path import isfile, join
from stemming.porter2 import stem
w=[]
subd={}
wordsd={}
numbers=[]
dollars=[]
urls=[]
emails=[]
count_number=0
count_dollar=0
os.chdir("/media/Hardy/Acads/Projects/ML Project/enron_mail_20110402/maildir/arnold-j/compaq")
mypath="/media/Hardy/Acads/Projects/ML Project/enron_mail_20110402/maildir/arnold-j/compaq"
for fo in listdir(mypath):
    if isfile(join(mypath,fo)):
        f=open(fo,"rw+")
        fr=f.read()
        subl=[]
        match=re.search('subject:(.+)\n',fr.lower())
        if match:
            subl=subl+[w for w in re.split('\W',match.group(1)) if w]
##            print subl
            for elements in subl:
                element=stem(elements)
                if element in subd:
                    subd[element]+=1
                else:
                    subd[element]=1
##            print subd.items()
        f.close()
        f=open(fo,"rU")
        flag=0
        wordsl=[]
        for line in f:
            if flag==0 and not re.search(r'x-filename',line.lower()):
                continue
            elif flag==0 and re.search(r'x-filename',line.lower()):
                flag=1
                continue
            elif not ( re.search(r'forwarded by',line.lower()) or re.search(r'original message',line.lower()) ):
##                print line
                numbers = numbers+re.findall(r'[0-9][0-9\-]+',line)
                ##print numbers
                dollars = dollars+re.findall(r'\$',line)
                ##print dollars
##                for number in numbers:
##                    count_number+=1
##                for dollar in dollars:
##                    count_dollar+=1
                wordsl=wordsl+[w for w in re.split('\W',line.lower()) if w]
            elif re.search(r'forwarded by',line.lower()) or re.search(r'original message',line.lower()):
                break
        for elements in wordsl:
            element=stem(elements)
            if element in wordsd:
                wordsd[element]+=1
            else:
                wordsd[element]=1
        f.close()
        f=open(fo,"rU")
##        count_mail=0
##        count_url=0
        for line in f:
            if not ( re.search(r'forwarded by',line.lower()) or re.search(r'original message',line.lower()) ):
##                print line
                emails =emails + re.findall(r'\w+[.|\w]\w+@\w+[.]\w+[.|\w+]\w+',line)
                ##urls = urls + re.findall(r'www.',line)
##                for email in emails:
##                    count_mail=count_mail+1
##                for url in urls:
##                    count_url=count_url+1
            else :
                break
        f.close()
##print numbers
##print dollars
##print urls
##print emails

##print subd.items()
##print wordsd.items()
##print count_number
##print count_dollar
##print count_url
##print count_mail


######     I have to read about writing in a file so if u can then change the code below to write in file
######
######
######
######     Here we will write code to remove unwanted numbers from list and dictionaries and store it in a list
######     in a sorted manner so that we will check the each element in that list having how many count in each
######     message's dict of words and sub in order to maintain a particular order to form vectors.
######
######     Below I have assumed that i have removed and filtered the dict for subj and words



fw = open('workfile.csv', 'w')
for elements in (subd and wordsd):
    fw.write(elements)
    fw.write(',')
fw.write('\n')
for fo in listdir(mypath):
    if isfile(join(mypath,fo)):
        subd_temp={}
        wordsd_temp={}
        f=open(fo,"rw+")
        fr=f.read()
        fr=fr.lower()
        subl=[]
        match=re.search('subject:(.+)\n',fr)
        if match:
            subl=subl+[w for w in re.split('\W',match.group(1)) if w]
            for elements in subl:
                element=stem(elements)
                if element in subd:
                    if element in subd_temp:
                        subd_temp[element]+=1
                    else:
                        subd_temp[element]=1
        ##print subd_temp.items()
        f.close()
        f=open(fo,"rU")
        flag=0
        wordsl=[]
        for line in f:
            if flag==0 and not re.search(r'x-filename',line.lower()):
                continue
            elif flag==0 and re.search(r'x-filename',line.lower()):
                flag=1
                continue
            elif not ( re.search(r'forwarded by',line.lower()) or re.search(r'original message',line.lower()) ):
##                print line
                wordsl=wordsl+[w for w in re.split('\W',line.lower()) if w]
            elif re.search(r'forwarded by',line.lower()) or re.search(r'original message',line.lower()):
                break
        for elements in wordsl:
            element=stem(elements)
            if element in wordsd:
##                fw.write(element)
##                fw.write(',')
                if element in wordsd_temp:
##                    fw.write(element)
##                    fw.write(',')
                    wordsd_temp[element]+=1
                else:
                    wordsd_temp[element]=1
##        fw.write('\n')
        for word in wordsd:
            if word in wordsd_temp:
                fw.write(str(wordsd_temp[word]))
                fw.write(',')
            else:
                fw.write('0,')
        fw.write('\n')
            
        ##print wordsd_temp.items()
