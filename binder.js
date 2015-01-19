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
        init: function(){
            for (var key in this.dataArrGlob) {
                this.insert(key, this.dataArrGlob[key]);
            }
        },
        insert: insertValues(),
        //sendHTML: function(ajaxReceiver){
        //    
        //} 
    };
    
    function insertValues(name, value) {
        var patternConstructor = "/{{"+name+"}}/";
        var pattern = new RegExp(patternConstructor, "gi");
        var body = document.getElementsByTagName("body")[0];
        var bodyText = body.innerHTML;
        bodyLikeText.replace(pattern, value);
        body.innerHTML = bodyText;
    }
    
    window.Binder = binder;
    window.$B = window.Binder;
})(); 