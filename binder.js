(function(w){
    var B = {
        dataArr:[
            
        ],
        addValue:function(name, data){
            
        },
        addArrValues: function(){
            
        },
        
    };
    
    function insertValues(name, value) {
        var patternConstructor = "/{{"+name+"}}/";
        var pattern = new RegExp(patternConstructor, "gi");
        var body = document.getElementsByTagName("body")[0];
        //var bodyText = document.getElementsByTagName("body")[0].innerHTML;
        var bodyText = body.innerHTML;
        bodyLikeText.replace(pattern, value);
        body.innerHTML = bodyText;
    }
    
    
    return B;
})(windows);