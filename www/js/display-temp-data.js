

 function displayTemplates() {
    var length=window.localStorage.length;
     if(length==0){
         var txt=$("<p align='center'></p>").text("暂时还没有模版与数据哦！")
         $("#mainContent").append(txt);
     }else{
         var templist
         for (var i=0;i<length;i++){
             var temp=$("<li></li>");
             var span=$("<span></span>").text=window.localStorage.key(i);
              temp=temp.append(span);
             templist=$('<li>'+window.localStorage.key(i)+'</li>');
        $("#tempList").append(templist);
         }
         $('ul').listview('refresh');


     }

 }