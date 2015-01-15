(function(w, d){
    var $B = {
        dataArr:{},
        addValue:function(name, value){
            this.dataArr[name] = value;
        },
        addArrValues: function(objVal){
            for (var name in objVal) {
                this.addValue(name, objVal[name]);
            }
        },
        init: function(){
            for (var key in this.dataArr) {
                this.insert(key, this.dataArr[key]);
            }
        },
        insert: insertValues()
    };
    
    function insertValues(name, value) {
        var patternConstructor = "/{{"+name+"}}/";
        var pattern = new RegExp(patternConstructor, "gi");
        var body = d.getElementsByTagName("body")[0];
        //var bodyText = document.getElementsByTagName("body")[0].innerHTML;
        var bodyText = body.innerHTML;
        bodyLikeText.replace(pattern, value);
        body.innerHTML = bodyText;
    }
    
    return $B;
})(window, document);