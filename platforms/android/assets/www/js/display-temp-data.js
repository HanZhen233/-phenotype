
 function displayTemplates() {
    var length=window.localStorage.length;
     if(length==0){
         var txt=$("<p align='center'></p>").text("暂时还没有模版与数据哦！")
         $("#mainContent").append(txt);
     }else{
         var templist
         for (var i=0;i<length;i++){
             // var temp=$("<li></li>");
             // var span=$("<span></span>").text=window.localStorage.key(i);
             //  temp=temp.append(span);
             // templist=$('<li>'+window.localStorage.key(i)+'</li>');
             // templist=templist.append();
             var  li=$('<li></li>');
             var  a=$('<a  onclick=toDataList(this)'+'>'
                 +window.localStorage.key(i)+'</a>');
             li.append(a);
        $("#tempList").append(li);
         }
         $('ul').listview('refresh');
     }
 }
function toDataList(obj) {
    location.href="dataList.html?"+"txt="+encodeURI(obj.text);
}


function displayDataList() {
    var loc=location.href;
    var n1=loc.length;
    var n2=loc.indexOf('=');
    var tempName=decodeURI(loc.substr(n2+1,n1-n2));//获取模版名字
    var request=window.indexedDB.open(tempName);
    request.onerror=function (ev) {
        console.log('数据库打开报错');
    }
    request.onsuccess=function (ev) {
        indexedDB.deleteDatabase(tempName);
        db=ev.target.result;
        if (db.objectStoreNames.length==0){
            $("#mainPage").append('<p align="center">什么数据都没有哦！</p>');
        }
        else {


            var dataNames = db.objectStoreNames;//获取数据表名
            var dataName = dataNames[0];

            var  ts=db.transaction(dataName);
            var object=ts.objectStore(dataName);
            var re=object.openCursor();

            re.onsuccess=function (ev2) {
            var cursor=ev2.target.result;
            if(cursor){
                var  li=$('<li></li>');
                var  a=$('<a>'
                    +cursor.primaryKey+'</a>');
                li.append(a);
                $('#dataList').append(li);
                cursor.continue();
            }else {

                $('ul').listview('refresh');
            }

            }
            re.onerror=function (ev2) {
                alert('打开数据库出错！');
            }




        }

    }





}