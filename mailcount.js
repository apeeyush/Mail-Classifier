function mail_count() {
  var tr_count = 0;
  var labels = GmailApp.getUserLabels();
  for (var i = 0; i < labels.length; i++) {
    var threads = labels[i].getThreads();
    for (var j = 0; j < threads.length; j++) {
      var messages = threads[j].getMessages();
      for (var k = 0; k < messages.length; k++) {
        tr_count = tr_count +1;
      }
    }
  }
  return tr_count;
}
