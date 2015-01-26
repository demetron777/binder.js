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
            dataArrGlob:{},
            dataArrLoc:{},
            addValue:function(n, v, id){
                if (arguments.length == 3) {
                    if(this.dataArrLoc[id] == undefined){
                        this.dataArrLoc[id] = {};
                    }
                    this.dataArrLoc[id][n] = v;
                }
                else if(arguments.length == 2) {
                    this.dataArrGlob[n] = v;
                }
            },
            addArrValues: function(objVal){
                for (var name in objVal) {
                    this.addValue(name, objVal[name]);
                }
            },
            initData: function(){
                for (var keyGlob in this.dataArrGlob) {
                    insertValuesGlob(keyGlob, this.dataArrGlob[keyGlob]);
                }
                //TODO part for localized function
                for (var idLoc in this.dataArrLoc) {
                     dataObj = this.dataArrLoc[idLoc];
                     for(var nameLoc in dataObj){
                        insertValuesLoc(idLoc, nameLoc, dataObj[nameLoc]);
                     }
                }
            },
            printData: function(){
                for (var k in this.dataArrGlob) {
                    console.log( k +" --> "+ this.dataArrGlob[k]);
                }
                for (var j in this.dataArrLoc) {
                    console.log("#"+j );
                    var propObj = this.dataArrLoc[j];
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
        //TODO function localized replace "insertValuesLoc"
        function insertValuesLoc(id, name, value) {
            var pattern = new RegExp('{{'+name+'}}', "gi");
            var local = document.getElementById(id);
            var locText = local.innerHTML;
            locText = locText.replace(pattern, value);
            local.innerHTML = locText;
            return true;
        }
        function insertValuesGlob(name, value) {
            var pattern = new RegExp('{{'+name+'}}', "gi");
            var body = document.getElementsByTagName("body")[0];
            var bodyText = body.innerHTML;
            bodyText = bodyText.replace(pattern, value);
            body.innerHTML = bodyText;
            return true;
        }
        
        window.Binder = binder;
        window.$B = window.Binder;
    })();
});