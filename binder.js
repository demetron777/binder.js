function addEvent(evnt, elem, func) {
   if (elem.addEventListener){  // Normal
      elem.addEventListener(evnt,func,false);
   }else if (elem.attachEvent){ // IE
      elem.attachEvent("on"+evnt, func);
   }else{
      elem[evnt] = func;
   }
}
addEvent("DOMContentLoaded", document, function(event) {
   (function(){
      var binder = {
         data:{
            byDocument:[],
            byBody:[],
            byId:[],
            byClass:[],
         },
         createBind: function(typeEl, nameEl, tagName, value){
            var bindData =  {};
            bindData.nameEl =  nameEl;  // if document or body can be empty string ''
            bindData.tagName = tagName;
            bindData.value = value;
            switch (typeEl) {
               case 'document':
                  this.data.byDocument.push(bindData);
                  break;
               case 'body':
                  this.data.byBody.push(bindData);
                  break;
               case 'class':
                  this.data.byClass.push(bindData);
                  break;
               case 'id':
                  this.data.byId.push(bindData);
                  break;
            }
         },
         //TODO
         //addArrValues: function(objVal){
         //    for (var name in objVal) {
         //        this.addValue(name, objVal[name]);
         //    }
         //},
         initData: function(){ // FINISH HIM!!!
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
         printData: function(){//type){
             //for (var k in this.dataArrByBody) {
             //    console.log( k +" --> "+ this.dataArrByBody[k]);
             //}
             //for (var j in this.dataArrById) {
             //    console.log("#"+j );
             //    var propObj = this.dataArrById[j];
             //    for (var g in propObj) {
             //        console.log("  --> "+g+" : "+propObj[g]);
             //    }
             //}
             //;
             var bindScope = this;
             if (arguments.length > 0 && arguments.length < 2) {
               Print(arguments[0]);
             }else if(arguments.length == 0){
               Print("document");
               Print("body");
               Print("class");
               Print("id");
             }
             
             function Print(type) {
               var binds;
               switch (type) {
                  case "document":
                     binds = bindScope.data.byDocument;
                     console.log("Document");
                     break;
                  case "body":
                     binds = bindScope.data.byBody;
                     console.log("Body");
                     break;
                  case "class":
                     binds = bindScope.data.byClass;
                     console.log("Class");
                     break;
                  case "id":
                     binds = bindScope.data.byId;
                     console.log("Id");
                     break;
               }
               if (binds.length > 0) {
                  for (var k in binds) {
                     console.log("\t"+binds.nameEl+" --> "+binds.tagName+" - "+binds.value);
                  }
               }else if(binds.length == 0){
                  console.log("\t-- no binds -- ");
               }
             }
         }
         //TODO
         //sendHTML: function(ajaxReceiver){
         //    
         //} 
      },
      binding = function(elType, elName, bindName, bindValue) {
         var elmnt, arrElmnts, elmntLikeText, pattern = new RegExp('{{'+bindName+'}}', "gi");
         switch (elType) {
            case 'byDocument':
               elmnt = document.getElementsByTagName("html")[0];
               elmntLikeText = elmnt.innerHTML;
               elmnt.innerHTML = elmntLikeText.replace(pattern, bindValue);
               break;
            case 'byBody':
               elmnt = document.getElementsByTagName("body")[0];
               elmntLikeText = elmnt.innerHTML;
               elmnt.innerHTML = elmntLikeText.replace(pattern, bindValue);
               break;
            case 'byClass':
               arrElmnts = document.getElementsByClassName(elName);
               for(var k = 0; k<arrElmnts.length; k++){
                  elmnt = arrElmnts.item(k);
                  elmntLikeText = elmnt.innerHTML;
                  elmnt.innerHTML = elmntLikeText.replace(pattern, bindValue);
               }
               break;
            case 'byId':
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