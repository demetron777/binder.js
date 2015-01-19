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
                    this.dataArrLoc[id] = { value: v, name: n};
                    console.log("3 arg");
                }
                else if(arguments.length == 2) {
                    this.dataArrGlob[n] = v;
                    console.log("2 arg");
                }
            },
            addArrValues: function(objVal){
                for (var name in objVal) {
                    this.addValue(name, objVal[name]);
                }
            },
            initData: function(){
                for (var key in this.dataArrGlob) {
                    insertValues(key, this.dataArrGlob[key]);
                }
            },
            insert: insertValues(),
            printData: function(){
                console.log("Global data array: ");
                for (var k in this.dataArrGlob) {
                    console.log( k +" --> "+ this.dataArrGlob[k]);
                }
                console.log("Selective data array: ");
                for (var j in this.dataArrLoc) {
                    console.log( j +" --> "+ this.dataArrLoc[j]);
                }
                return true;
            }
            //sendHTML: function(ajaxReceiver){
            //    
            //} 
        };
        
        function insertValues(name, value) {
            var patternConstructor = "/{{"+name+"}}/";
            var pattern = new RegExp(patternConstructor, "gi");
            var body = document.getElementsByTagName("body")[0];
            var bodyText = body.innerHTML;
            bodyText.replace(pattern, value);
            body.innerHTML = bodyText;
        }
        
        window.Binder = binder;
        window.$B = window.Binder;
    })();
});