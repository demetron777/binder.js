function addEvent(evnt, elem, func) {
   if (elem.addEventListener)  // Normal
      elem.addEventListener(evnt,func,false);
   else if (elem.attachEvent) { // IE
      elem.attachEvent("on"+evnt, func);
   }
   else {
      elem[evnt] = func;
   }
}
addEvent("DOMContentLoaded", document, function(event) {
    (function(){
        var binder = {
            data:{
               byDocument:{},
               byBody:{},
               byId:{},
               byClass:{},
            }
            addValue:function(n, v, id){
                if (arguments.length == 3) {
                    if(this.data.byId[id] == undefined){
                        this.data.byId[id] = {};
                    }
                    this.data.byId[id][n] = v;
                }
                else if(arguments.length == 2) {
                    this.data.byBody[n] = v;
                }
            },
            addArrValues: function(objVal){
                for (var name in objVal) {
                    this.addValue(name, objVal[name]);
                }
            },
            initData: function(){
                for (var keyGlob in this.dataArrByBody) {
                    insertValuesGlob(keyGlob, this.dataArrByBody[keyGlob]);
                }
                //TODO part for localized function
                for (var idLoc in this.dataArrById) {
                     dataObj = this.dataArrById[idLoc];
                     for(var nameLoc in dataObj){
                        insertValuesLoc(idLoc, nameLoc, dataObj[nameLoc]);
                     }
                }
            },
            printData: function(){
                for (var k in this.dataArrByBody) {
                    console.log( k +" --> "+ this.dataArrByBody[k]);
                }
                for (var j in this.dataArrById) {
                    console.log("#"+j );
                    var propObj = this.dataArrById[j];
                    for (var g in propObj) {
                        console.log("  --> "+g+" : "+propObj[g]);
                    }
                }
            }
            //TODO
            //sendHTML: function(ajaxReceiver){
            //    
            //} 
        };
        //function insertValuesLoc(id, name, value) {
        //    var pattern = new RegExp('{{'+name+'}}', "gi");
        //    var local = document.getElementById(id);
        //    var locText = local.innerHTML;
        //    locText = locText.replace(pattern, value);
        //    local.innerHTML = locText;
        //    return true;
        //}
        //function insertValuesGlob(name, value) {
        //    var pattern = new RegExp('{{'+name+'}}', "gi");
        //    var body = document.getElementsByTagName("body")[0];
        //    var bodyText = body.innerHTML;
        //    bodyText = bodyText.replace(pattern, value);
        //    body.innerHTML = bodyText;
        //    return true;
        //}
        //Universal function
        function binding(elType, elName, bindName, bindValue) {
            var elmnt, arrElmnts, elmntLikeText, pattern = new RegExp('{{'+bindName+'}}', "gi");
            switch (elType) {
               case 'document':
                  elmnt = document.getElementsByTagName("html")[0];
                  elmntLikeText = elmnt.innerHTML;
                  elmnt.innerHTML = elmntLikeText.replace(pattern, bindValue);
                  break;
               case 'body':
                  elmnt = document.getElementsByTagName("body")[0];
                  elmntLikeText = elmnt.innerHTML;
                  elmnt.innerHTML = elmntLikeText.replace(pattern, bindValue);
                  break;
               case 'class':
                  arrElmnts = document.getElementsByClassName(elName);
                  for(var k = 0; k<arrElmnts.length; k++){
                     elmnt = arrElmnts.item(k);
                     elmntLikeText = elmnt.innerHTML;
                     elmnt.innerHTML = elmntLikeText.replace(pattern, bindValue);
                  }
                  break;
               case 'id':
                  elmnt = document.getElementById(elName);
                  elmntLikeText = elmnt.innerHTML;
                  elmnt.innerHTML = elmntLikeText.replace(pattern, bindValue);
                  break;
            }
            return true;
        }
        
        window.Binder = binder;
        window.$B = window.Binder;
    })();
});