import sys
import re
import os
from os import listdir
from os.path import isfile, join
from stemming.porter2 import stem
w=[]
subd={}
wordsd={}
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
            print subl
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
                wordsl=wordsl+[w for w in re.split('\W',line) if w]
            elif re.search(r'forwarded by',line.lower()) or re.search(r'original message',line.lower()):
                break
        for elements in wordsl:
            element=stem(elements)
            if element in wordsd:
                wordsd[element]+=1
            else:
                wordsd[element]=1
print subd.items()
print wordsd.items()



######     I have to read about writing in a file so if u can then change the code below to write in file
######
######
######
######     Here we will write code to remove unwanted numbers from list and dictionaries and store it in a list
######     in a sorted manner so that we will check the each element in that list having how many count in each
######     message's dict of words and sub in order to maintain a particular order to form vectors.
######
######     Below I have assumed that i have removed and filtered the dict for subj and words

fw = open('workfile.txt', 'w')
for elements in (subd and wordsd):
    fw.write(elements)
    fw.write(' ')
fw.close()
for fo in listdir(mypath):
    if isfile(join(mypath,fo)):
        subd_temp={}
        wordsd_temp={}
        f=open(fo,"rw+")
        fr=f.read()
        subl=[]
        match=re.search('subject:(.+)\n',fr.lower())
        if match:
            subl=subl+[w for w in re.split('\W',match.group(1)) if w]
            for elements in subl:
                element=stem(elements)
                if element in subd:
                    if element in subd_temp:
                        subd_temp[element]+=1
                    else:
                        subd_temp[element]=1
##        print subd_temp.items()
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
                wordsl=wordsl+[w for w in re.split('\W',line) if w]
            elif re.search(r'forwarded by',line.lower()) or re.search(r'original message',line.lower()):
                break
        for elements in wordsl:
            element=stem(elements)
            if element in wordsd:
                if element in wordsd_temp:
                    wordsd_temp[element]+=1
                else:
                    wordsd_temp[element]=1
##        print wordsd_temp.items()
