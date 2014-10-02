(function(){
    var history = [],
    lastIns = 0;
    $(".console").on("click", function(){
        $("#inputC").focus();
    });
    $("#inputC").on("keyup",function(ev){
        var textField = $(this),
        keyCode = ev.keyCode;
        if(keyCode == 13){
            var code = textField.val();
            if(textField.val().replace(/\s/g,'')){
                textField.val("");
                newLine("> "+code);
                evaluarCodigo(code);
                history.push(code);
                lastIns = history.length;
            }  
        }
        if(keyCode == 38){
            if(lastIns>0){
                lastIns--;
            }
            textField.val(history[lastIns]);
        }
        if(keyCode == 40){
            if(lastIns< history.length-1){
                lastIns++;
            }
            textField.val(history[lastIns]);
        }
    });
    function evaluarCodigo(code){
        var res = [];
        try{
            res=eval.call(window, code);
            if(res== undefined){
                res = "undefined";
            }
            if(typeof(res)=="object"){
                res = "object  "+JSON.stringify(res);
            }
            
        }catch(e){

            res=e.message?e.message:e;
        }
        newLine(res,"italic");
    }
    function newLine(text, type){
        var divOut = $("<div>").text(text);
        if(type){
            divOut.css({fontStyle:type});
        }
        $("#output").append(divOut);
        bajaScroll();
    }

    function bajaScroll() {
            var elem = document.getElementById('output');
            //  alert(elem.value);
            elem.scrollTop = elem.scrollHeight;
    }
}).call(this);

