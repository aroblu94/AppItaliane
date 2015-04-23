window.onload = init();

function init(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET','./apps.json',true);
  xhr.onload = function(){
    var cats = JSON.parse(xhr.responseText).categories;
    
    for(i=0;i<cats.length;i++){
      var sec = document.createElement("section");
      sec.id = cats[i].name;
      var title = document.createElement("h2");
      title.innerHTML = cats[i].name;
      sec.appendChild(title);
      document.getElementById("left").appendChild(sec);
      
      cats[i].apps.sort(dynamicSort('name'));
      
      for(j=0;j<cats[i].apps.length;j++){
        var item = document.createElement("li");
        if(cats[i].apps[j].author != "")
          item.innerHTML = "<a target=\'_blank\' href=\""+cats[i].apps[j].href+"\">"+cats[i].apps[j].name+"</a> "+cats[i].apps[j].description+" by "+cats[i].apps[j].author;
        else
          item.innerHTML = "<a target=\'_blank\' href=\""+cats[i].apps[j].href+"\">"+cats[i].apps[j].name+"</a> "+cats[i].apps[j].description;
        sec.appendChild(item);
      }
    }
    
  };
  xhr.send();
}


function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
