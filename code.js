/*
function doGet(e) {
  var app = UiApp.createApplication();

  var button = app.createButton('Click Me');
  app.add(button);

  var label = app.createLabel('The button was clicked.')
                 .setId('statusLabel')
                 .setVisible(false);
  app.add(label);

  var handler = app.createServerHandler('Classify');
  button.addClickHandler(handler);

  return app;
}
*/

function doGet(e) {
  var app = UiApp.createApplication();
  app.add(app.loadComponent("MyGui"));
  return app;
}


function Classify (e)
{
  //var doc = DocumentApp.create('test123');
  var emailAddress = Session.getActiveUser().getEmail();
  //var data = [[0,0], [0,1], [1,0], [1,1],[1,2],[10,5],[10,10],[10,15]];
  //var labels = [-1, 1, 1, -1, 1, 1, 1, 1];
  //svm = new svmjs.SVM();
  //svm.train(data, labels); // C is a parameter to SVM
  //var tesdata = [[0,1],[2,4],[0,0],[10,10]];
  //var teslabels = svm.predict(tesdata);
  //doc.appendParagraph(teslabels);
  //var url = doc.getUrl();
  processInbox();
  //doc.appendParagraph("Done");
  //doc.saveAndClose();
};

