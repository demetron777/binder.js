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
                for (var key in this.dataArrGlob) {
                    insertValues(key, this.dataArrGlob[key]);
                }
                //TODO part for localized function
            },
            printData: function(){
                for (var k in this.dataArrGlob) {
                    console.log( k +" --> "+ this.dataArrGlob[k]);
                }
                for (var j in this.dataArrLoc) {
                    console.log( j +" --> "+ this.dataArrLoc[j]);
                }
                return true;
            }
            //TODO
            //sendHTML: function(ajaxReceiver){
            //    
            //} 
        };
        //TODO function localized replace "insertValuesLoc"
        
        function insertValues(name, value) {
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