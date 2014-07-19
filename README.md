# Content aware email multiclass classifier
> By Peeyush Agarwal, Aditya Modi, Lucky Sahani, Hardik Bansal

People nowadays are overwhelmed by tons of coming emails every day at work or in their daily life. The large quantities of emails keep causing confusions. Email classification can be applied to several different applications, including ltering messages based on priority, assigning messages to user-created folders, or identifying SPAM. Not only spam emails are considered to be ‘junk’, but also unwanted emails (e.g. advertisements) cause people to waste time on reading them. Therefore, it becomes urgent to develop reliable automatic categorization of emails to save the trouble.

## AIM
Supervised classification of emails into user created folders according to email content, thereby creating a classification scheme based on previously categorised emails (create a Gmail web app for the same).

## INTRODUCTION
Email classification falls into text categorization section of machine learning. A successful example of its implementation over the years is spam filtering which has reached a great level of accuracy. Email foldering or automatic categorization of emails can also be implemented by using various techniques.

### Email Representation
Emails can be represented as distributions over features, where features can be words, sequences of words, part-of-speech tags, word clusters, etc. Therefore all possible features come in the bag of words approach. Document representations usually undergo a transformation of dimensionality reduction.

### Classifier selection
Various classifiers can be applied to the text categorization. We choose the one which suits our data best and gives best results.

## DESIGN

### Dataset
To study and observe various methods and classifiers for email foldering we use a large corpus of real world email messages from Enron employees. The Enron corpus was made public during the legal investigation concerning the Enron Corporation. We used the cleaned and refined corpus made available by Carnegie Mellon University. It consists of email directories of seven former Enron employees with each of them having more than thousand messages and a good number of folders. Auto-generated folders such as “inbox”,”sent_items”,”trash” and so on have been removed from it.
It consists of around 8000 mails.

### Workflow
We firstly grouped the emails from the corpus into five folders for general evaluation. We put all messages in these five categories:
* Personal
* Business
* Colleagues
* Advertisements
* Organisations

After extracting data from “To”, ”From”, ”Subject” and  ”Body” of the emails we applied stemming.
Now various strategies can be used for feature selection now using the words list. It may vary from using complete word counts, counts of phrases, part of speech tag counts.
We firstly used an open source python code to do stemming. This would highly reduce the total word counts obtained after feature extraction and change different forms of words into same form. Then word counts were stored in two different dictionaries corresponding to body and non-body text.
The result of this step gives a sorted list of all tokens appeared in the dataset and along with their count (i.e. number of times of presence in all the email documents). In summary, there are around 7500 emails in all, and almost 30000 tokens.

### Modifying token list
There can be an approach to treat part of speech tags as features and take their counts separately but we opted of removing the obvious and less important part of speech tags such as articles, prepositions, pronouns and all. The natural language toolkit available in python was used to remove these unnecessary words. This resulted in a greatly needed decrease in number of tokens from around 30000 to around 20000. It was so because we also opted to remove foreign words and one or two character occurrences as they increased the list of features way high without providing the desired benefit. Even after this step, There is a whole large number of tokens having only a small number of count, so that we can discard them as they rarely appear in other email documents. On the other hand, there are also some tokens having too many counts, which are not informative in terms of the classification task. Eventually, the list of tokens got reduced to the size of 1209 tokens in a total of 7562 emails. We also added 4 other special token: NUMBER, DOLLAR, HTTP and EMAIL.
Therefore we have a total of 1213 attributes.

### Creating feature vector matrix
The main task of this step is to turn each example into a feature vector and then put them together to form an entire matrix.
* Each email is parsed and firstly its label is identified.
* Then, counts for respective elements in the token list are stored.
* Special words,expressions and characters are replaced by special tokens NUMBER, DOLLAR, HTTP and EMAIL.
* After creating the matrix by including the feature vector of each email we train and test the examples with an 80% split.

### Classification
We classify the emails by using Naive Bayes, SVM and Random forest techniques. SVM deploys one-vs-all method for multiclass classification.

## RESULTS
Results on the seven Enron datasets are reported as the accuracy in the table below.

| USER | No. of EMAILS | No. of Folders | NAIVE BAYES | SVM | RANDOM FOREST |
|-----|-----|-----|-----|-----|-----|
| beck-s | 1971 | 101 | 28.26 | 41.4 | 48.45 |
| farmer-d | 3672 | 25 | 47.79 | 61.98 | 69.66 |
| kaminski-v | 4477 | 41 | 38.44 | 47.78 | 56.42 |
| kitchen-l | 4015 | 47 | 35.12 | 48.97 | 57.36 |
| lokay-m | 2489 | 11 | 61.55 | 65.45 | 76.66 |
| sanders-r | 1188 | 30 | 53.37 | 61.36 | 65.66 |
| williams-w3 | 2769 | 18 | 72.44 | 84.33 | 89.82 |

Accuracies are higher on datasets that have one or two dominant folders. This is actually the case with lokay-m and williams-w3. williams-w3, infact practically consists of two folders only. This highly facilitates the classification process and thus increases the accuracy. Obviously, classification with one most probable class is an easy task, which explains why the accuracies are so high. One might expect the classification performance improve when the training set size increases, but this rarely happens in practice. It can be explained by the observation that email is usually related to other recently received email, rather than to email received long ago. Thus, old email in the training set probably does not affect the classification procedure.

We also generated a combined dataset classified under five commonly used folders as stated in the design before. The results for balanced dataset and just grouped emails are shown separately.

| DATA TYPE | No. of EMAILS | No. of Folders | NAIVE BAYES | SVM | RANDOM FOREST |
|----------|----------|----------|----------|----------|----------|
| Unbalanced | 9853 | 5 | 56.87 | 63.82 | 75.67 |
| Balanced | 7562 | 5 | 60.58 | 67.42 | 79.78 |

The classification results are surprisingly low. They show the complexity of the task of categorizing email, as opposed to regular text classification.

## IMPLEMENTATION
We decided to convert our idea into a working model so we shortlisted the possible tools that we can use.

Possibilities:
* Google App Script
* Gmail Gadgets
* Chrome extension

### What we chose

After reading a lot about different possibilities and their features we decided to use GAS. We rejected the idea of making a chrome extension because it does not provide support Gmail API and so we cannot assign labels to the incoming mails using chrome extension. Also we rejected the idea of using Gmail Gadgets because we found that GAS had more tools that were required to implement our idea.

We faced the following shortcomings in our design when we started implementing it with GAS:
* Until now our work was done in python, but now we had to look for libraries and sources in Javascript as GAS doesn’t support Python.
* We tried to use pyjs to integrate python with Javascript but we found out that it is very tough to use a package under GAS.
* We then tried to run python on local server but again Google does not allow us to send data from app script to a local server .
* Finally we tried to make some cut-offs and make our model in javascript only.

We found out that the libraries available in javascript for implementing machine learning supports only binary classification.

So, we decided to make a prototype of the idea that we had thought that would classify the emails in two categories i.e. personal and work.

We decided to implement SVM and after searching we found a javascript code on github that could be used in our implementation. We wrote the code that will access the user’s Gmail account, scan the already classified emails, train a model using SVM and classify unclassified emails.
Now we decided to implement it as a standalone web app that can be accessed by typing it’s url in the address bar.


## Further Improvements

As we have seen above we need to improve improve accuracy much more. For that we must have good dataset and we can improve different techniques we implement to classify data.
* We can generalise this implementation to any user.
* We can implement the idea to classify the mails into multiple categories , rather than just binary classification.
* Use various sampling and regression methods in addition to increase accuracy.
* Have greater use of natural language processing for easier distinction between categories.