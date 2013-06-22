/**
 * Retrieves all inbox labels.
 */
function processInbox() {
  var list_words = ['merchant', 'risk', 'govern', 'school', 'wednesday', 'direct', 'street', 'follow', 'even', 'conduct', 'net', 'ever', 'told', 'specialist', 'here', 'credit', 'unit', 'asset', 'relat', 'notic', 'phone', 'mr', 'climat', 'want', 'ena', 'end', 'travel', 'how', 'answer', 'law', 'third', 'order', 'oper', 'feedback', 'offici', 'japan', 'better', 'offic', 'then', 'oblig', 'saturday', 're', 'system', 'agre', 'provid', 'project', 'matter', 'seem', 'webmod', 'don', 'doe', 'dow', 'involv', 'report', 'earn', 'respond', 'result', 'respons', 'best', 'atul', 'ira', 'accord', 'protect', 'howev', 'countri', 'had', 'prc', 'revenu', 'much', 'interest', 'arena', 'life', 'regul', 'catch', 'alleg', 'east', 'servic', 'im', 'sever', 'receiv', 'suggest', 'complet', 'rail', 'hand', 'kid', 'client', 'protocol', 'just', 'spread', 'intermod', 'right', 'old', 'deal', 'intern', 'transmiss', 'corp', 'support', 'avail', 'way', 'head', 'form', 'offer', 'forc', 'back', 'true', 'analyst', 'request', 'prayer', 'floor', 'communic', 'jone', 'notif', 'weekend', 'decid', 'environment', 'decis', 'did', 'p', 'guy', 'cost', 'appear', 'address', 'wait', 'love', 'wholesal', 'visit', 'live', 'today', 'peopl', 'heard', 'critic', 'agenc', 'write', 'date', 'quot', 'inform', 'talk', 'refund', 'approv', 'equip', 'still', 'group', 'thank', 'window', 'mail', 'financi', 'nation', 'now', 'discuss', 'term', 'breach', 'quarter', 'profit', 'underwrit', 'california', 'care', 'thing', 'place', 'first', 'origin', 'onc', 'long', 'happi', 'open', 'given', 'citi', 'friend', 'hug', 'copi', 'logist', 'serv', 'were', 'posit', 'pre', 'say', 'note', 'take', 'sure', 'abus', 'america', 'sale', 'senior', 'insur', 'onli', 'requir', 'where', 'seal', 'concern', 'review', 'enough', 'import', 'come', 'mani', 'emiss', 'supervisor', 'west', 'mark', 'case', 'worri', 'develop', 'etc', 'pay', 'same', 'trip', 'document', 'director', 'model', 'summer', 'execut', 'money', 'speed', 'rose', 'littl', 'mom', 'world', 'deduct', 'tva', 'legal', 'act', 'industri', 'outlook', 'area', 'lot', 'regard', 'e', 'possibl', 'general', 'file', 'again', 'reduc', 'invest', 'u', 'month', 'abil', 'settlement', 'airfar', 'thursday', 'program', 'setalvad', 'fax', 'global', 'premium', 'util', 'veri', 'list', 'adjust', 'rate', 'abl', 'brief', 'delet', 'public', 'strong', 'valu', 'prior', 'action', 'famili', 'select', 'site', 'hous', 'learn', 'share', 'court', 'associ', 'author', 'help', 'soon', 'paper', 'team', 'senat', 'good', 'return', 'hard', 'realli', 'expect', 'event', 'friday', 'base', 'believ', 'ask', 'basi', 'success', 'notifi', 'feel', 'done', 'differ', 'option', 'part', 'off', 'i', 'also', 'build', 'distribut', 'most', 'plan', 'give', 'session', 'find', 'access', 'set', 'see', 'someth', 'particip', 'won', 'various', 'experi', 'appreci', 'mailbox', 'annual', 'whole', 'load', 'schedul', 'church', 'communiti', 'due', 'fund', 'educ', 'look', 'budget', 'fun', 'everyon', 'readi', 'person', 'hispan', 'promot', 'chairman', 'complaint', 'march', 'bid', 'd', 'sampl', 'affili', 'pep', 'machin', 'run', 'agreement', 'step', 'truck', 'real', 'chang', 'question', 'custom', 'includ', 'forward', 'line', 'up', 'clear', 'm', 'doesn', 'repres', 'nice', 'ago', 'send', 'sent', 'volum', 'tri', 'kansa', 'natur', 'compar', 'kyoto', 'let', 'great', 'opinion', 'employe', 'use', 'next', 'start', 'central', 'meet', 'control', 'process', 'tax', 'physic', 'alloc', 'issu', 'chief', 'allow', 'move', 'll', 'dad', 'strateg', 'day', 'anyth', 'out', 'discharg', 'manipul', 'york', 'spill', 'keep', 'presid', 'such', 'capac', 'messag', 'attach', 'final', 'juli', 'haven', 'ben', 'function', 'reserv', 'contact', 'linda', 'who', 'texa', 'fuel', 'contribut', 'increas', 'organ', 'stuff', 'view', 'email', 'job', 'disput', 'addit', 'committe', 'wonder', 'walk', 'copier', 'cent', 'electr', 'immedi', 'naphtha', 'togeth', 'present', 'purchas', 'incom', 'parti', 'member', 'largest', 'probabl', 'effect', 'well', 'thought', 'rocket', 'percent', 'web', 'realiz', 'desk', 'loss', 'like', 'corpor', 'suppli', 'home', 'transport', 'feder', 'leav', 'leader', 'own', 'owa', 'pictur', 'deliveri', 'north', 'made', 'wish', 'record', 'problem', 'detail', 'book', 'monday', 'june', 'stay', 'rule'];                 //list of all words to form feature vector
  var tr_count = mail_count();                                         //Total mail count
  var i_mails = 0;                                                     //No. of mails processed
  var tr_label = new Array(tr_count);                                  //Declaring the array to store labels of training data
  
  var tr_data = new Array(tr_count);                                   //Declaring a 2-D array of training data
  for (var i = 0; i < tr_count; i++) {
    tr_data[i] = new Array(list_words.length);
    for(var j=0;j<list_words.length;j++){
      tr_data[i][j]=0;
    }
  }
  
  var labels = GmailApp.getUserLabels();
  for (var i = 0; i < labels.length; i++) {                            //Running the loop for each label
    var threads = labels[i].getThreads();
    for (var j = 0; j < threads.length; j++) {                         //Running the loop for each thread
      var messages = threads[j].getMessages();
      for (var k = 0; k < messages.length; k++) {                      //Running the loop for each message
        var subj = messages[k].getSubject();
        subj = subj.concat(' ');
        var body = messages[k].getBody();
        var mail = subj.concat(body);
        mail = mail.toLowerCase();
        parser(mail, list_words, tr_data, i_mails);
        if(labels[i].getName()=='Personal')
          tr_label[i_mails]=1;
        else
          tr_label[i_mails]=-1;
        i_mails = i_mails+1;
      }
    }
  }
  //doc.appendParagraph(tr_label);
  leng_tr_data=tr_data.length;
  /*
  for(var i=0;i<leng_tr_data;i++)
    doc.appendParagraph(tr_data[i]);
  */
  svm = new svmjs.SVM();
  svm.train(tr_data, tr_label);
  //var testlabels = svm.predict(tr_data);
  //doc.appendParagraph(testlabels);
  
  var threads = GmailApp.getInboxThreads();
  var num = 0;
  var testdata = new Array(1);
  testdata[0] = new Array();
  var label = new Array();
  for (var i = 0; i < threads.length; i++) {
    for(var j=0;j<list_words.length;j++){
      testdata[0][j]=0;
    }
    var found = 0;
    mail_labels = threads[i].getLabels();
    for(var j=0;j<mail_labels.length;j++){
      if(mail_labels[j].getName()=="Personal" || mail_labels[j].getName()=="Work"){
        found=1;
      }
    }
    if(!found){
      var messages = threads[i].getMessages()[0];
      var subj = messages.getSubject();
      subj = subj.concat(' ');
      var body = messages.getBody();
      var mail = subj.concat(body);
      mail = mail.toLowerCase();
      parser(mail, list_words, testdata, num);
      var testlabels = svm.predict(testdata);
      //doc.appendParagraph(testlabels);
      if(testlabels[0] == 1){
        var label = GmailApp.getUserLabelByName("Personal");
        threads[i].addLabel(label);
      }
      else{
        var label = GmailApp.getUserLabelByName("Work");
        threads[i].addLabel(label);
      }
    }
  }
  
}
