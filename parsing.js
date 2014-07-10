
function parser(msg, wlist, tr_data, rownum) {
  var index;
  var currlist = msg.split(/\b\W+/).filter(function(e) { return e; });
  for(var i=0; i<wlist.length; i++){
    while(index=currlist.indexOf(wlist[i]),index!=-1){
      tr_data[rownum][i+1]=tr_data[rownum][i+1]+1;
      currlist.splice(index,1);
    }
  }

}

/*function parsing(msg, wlist, tr_data, rownum) {
  var index;
  var currlist = msg.split(/\b\W+/).filter(function(e) { return e; });
  for(var i=0; i<wlist.length; i++){
    for(var j=0; j<currlist.length; j++){
      if(currlist[j] == wlist[i])
        tr_data[rownum][i] = tr_data[rownum][i+1] + 1;
    }
  }

}*/
