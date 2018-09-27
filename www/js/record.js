function dealData() { //加载数据
var temp=new Array();
    temp=getTempNameAndRecordId();
    var tempName=temp[0];
    var recordId=temp[1];
    getRecord(tempName,recordId);


}
//通过页面获得模版与数据名称
function getTempNameAndRecordId() {
    var loc=location.href;
    var n1=loc.length;
    var n2=loc.indexOf('=');
    var tempName=decodeURI(loc.substr(n2+1,n1-n2));
    var temp=tempName.split('|')
    return temp;
}




function getRecord(tempName,recordId) {
    var temp=JSON.parse(window.localStorage.getItem(tempName));//模版数据json。
    //创建模版
    fillTemplate(temp);

    var flag=0;
    window.localStorage.removeItem('图片');//图片要涉及到文件读写，数据库事务操作开了线程无法，为解决冲突
    var request=window.indexedDB.open(tempName);
    request.onerror=function (ev) {
        console.log('数据库打开报错');
    }
    request.onsuccess=function (ev) {//成功打开数据库
        var db=ev.target.result;
            var dataNames = db.objectStoreNames;//获取数据表名
            var dataName = dataNames[0];
            var ts=db.transaction(dataName,'readonly');
            var object=ts.objectStore(dataName);
            var detail=object.get(recordId);


            detail.onerror=function (ev2) {
                navigator.notification.alert('请填写数据！',alertDismissed,'','OK');
                // alert('请填写数据！')
            }
            detail.onsuccess=function (ev2) {
            //数据库操作是新的线程，因此后续操作应该在此基础上继续。
            //     hello(JSON.stringify(detail.result));
               var  dataAll =detail.result;//详细数据json
            //    填充数据
                if (dataAll==null){
                    var _input=$("#showDetails li").eq(0).find('input');
                    _input.val(recordId);
                }
                else {
                    fillData(dataAll);
                }

            }

        }
        request.onupgradeneeded=function (ev) {
            var  db=ev.target.result;
            var dataName=tempName+'-data';
            var keyPath;
            for (var z in temp[0] ){
                keyPath=temp[0][z];
                break;
            }

            if (db.objectStoreNames.contains(dataName)) {
                db.deleteObjectStore(dataName);
                var store = db.createObjectStore(dataName, {keyPath: keyPath});
            }
            else {
                var store=db.createObjectStore(dataName,{keyPath:keyPath});
            }
        }


}

function fillData(dataAll) {

for(var i=0;i<$("#showDetails li").length;i++){
    var _span=$("#showDetails li").eq(i).find('span');
    var _input=$("#showDetails li").eq(i).find('input');//普通输入文本，日期，数字
    var _select=$("#showDetails li").eq(i).find('select')//枚举类型的
    // var _button=$("#showDetails li").eq(i).find('button')

    if (_input.hasClass('_input')){
            _input.val(dataAll[_span.text()]);
    }
    else if (_select.hasClass('_select')){//下拉选择菜单类型
        var options=_select.find('option');
        for (var j=0;j<options.length;j++)
            if ($(options[j]).val()==dataAll[_span.text()]){
                $(options[j]).attr("selected",true);
            }
    }
   else{
        var _li=$("#showDetails li").eq(i);
        var photoURI=dataAll[_span.text()];
        if (photoURI!="null"&&photoURI.indexOf(".jpg")!=-1) {

            var photo=$("<img class='photo' width='40%' height='70px' value='' >") ;
            photo.val(photoURI);
            photo.attr("src",photoURI);
            _li.append(photo);

        }
        // if (photoName!="null"&&photoName.indexOf(".jpg")!=-1) {
        //     loadPhoto(photoLabel, photoName);
        //     if( window.localStorage.getItem('图片')==null){
        //         var str={};
        //         str[_span.text()]=photoName;
        //         window.localStorage.setItem('图片',JSON.stringify(str));
        //     }
        //     else {
        //         var str= window.localStorage.getItem('图片');
        //         str=JSON.parse(str);
        //         str[_span.text()]=photoName;
        //         window.localStorage.setItem('图片',JSON.stringify(str));
        //     }

        // }

    }

}
}









//加载图片。
// function loadPhoto(photoLabel,photoName) {
//     var dirUri = cordova.file.externalRootDirectory;
//     alert( cordova.file.externalRootDirectory);
//     window.resolveLocalFileSystemURI(dirUri,function (Entry) {
//         Entry.getDirectory("表型采集模版与数据", {
//             create: true,
//         },function (dirEntry) {
//             dirEntry.getDirectory('photos', { create: true }, function (subDirEntry) {
//                 readPhoto(subDirEntry,photoLabel,photoName);
//             }, onErrorGetDir);
//
//         },onErrorGetDir)
//     })
//
// }
// function readPhoto(dirEntry,photoLabel,photoName) {
//     dirEntry.getFile(
//         photoName, {
//             create: true,
//             exclusive: false
//         },
//         function (fileEntry) {
//
//             fileEntry.file(function (file) {
//
//                 var reader = new FileReader();
//                 reader.onloadend = function() {
//                     var blob = new Blob([new Uint8Array(this.result)], { type: "image/jpeg" });
//                     displayPhoto(blob,photoLabel);
//
//                 };
//
//                 reader.readAsArrayBuffer(file);
//
//
//             },onErrorReadFile)
//         }, onErrorReadFile);
// }
// function displayPhoto(blob,_li) {
//     // if (_li.find("img").hasClass('photo')){
//     //     _li.find("img").attr("src",window.URL.createObjectURL(blob));
//     // }
//     // else {
//     //     var photo=$("<img class='photo' width='40%' height='60px' >") ;
//     //     photo.attr("src", window.URL.createObjectURL(blob));
//     //     _li.append(photo);
//     // }
//     alert("hello")
//     li.append("<p>haha</p>");
// }

function onErrorReadFile(e) {
    console.log('Failed read file: ' + e.toString());
}


function onErrorGetDir(error){
    console.log("文件夹读取失败！")
}






//保存数据
function saveRecord() {

    var temp=getTempNameAndRecordId();
    var tempName=temp[0];
    // var recordId=temp[1];

    var dataAll={};
        for(var i=0;i<$("#showDetails li").length;i++){
        var _span=$("#showDetails li").eq(i).find('span');
        var _input=$("#showDetails li").eq(i).find('input');//普通输入文本，日期，数字
        var _select=$("#showDetails li").eq(i).find('select')//枚举类型的
        var _img=$("#showDetails li").eq(i).find('img');

        if (_input.hasClass('_input')){

            dataAll[_span.text()]=_input.val();

        }

        else if (_select.hasClass('_select')){//下拉选择菜单类型=
            // _select.options.selected =true ;

            dataAll[_span.text()]=_select.val();

        }
        else {
            if(_img.hasClass('photo')){
                // dataAll[_span.text()]=tempName+"-"+recordId+"-"+_span.text()+".jpg";
                dataAll[_span.text()]=_img.val();
            }
            else{
                dataAll[_span.text()]="null";
            }
        }
    }
    saveToDatabase(tempName,dataAll);
}
function saveToDatabase(tempName,dataAll) {
    var temp=JSON.parse(window.localStorage.getItem(tempName))
    var dataName=tempName+"-data";
    var keyPath;
    for (var z in temp[0] ){
        keyPath=z;
        break;
    }
    var request=window.indexedDB.open(tempName);
    request.onerror=function (ev) {
        console.log('数据库打开报错');
    }
    request.onsuccess=function (ev) {
        var db=ev.target.result;
        var  ts=db.transaction(dataName,'readwrite');
        var object=ts.objectStore(dataName);
                object.put(dataAll);
        navigator.notification.alert('保存成功！',alertDismissed,'','OK');
                // alert('保存成功！')
    }
    request.onupgradeneeded=function (ev) {
        var db=ev.target.result;
        if (db.objectStoreNames.contains(dataName)) {
            db.deleteObjectStore(dataName);
            var store = db.createObjectStore(dataName, {keyPath: keyPath});
        }
        else {
            var store=db.createObjectStore(dataName,{keyPath:keyPath});
        }
    }
}


function cancelEdit() {
    var loc=location.href;
    var n1=loc.length;
    var n2=loc.indexOf('=');
    var str=decodeURI(loc.substr(n2+1,n1-n2));
    var temp_dataKey=str.split('|');
    var tempName=temp_dataKey[0];
//    返回数据列表界面
    location.href="dataList.html?"+"txt="+encodeURI(tempName);
}

//跳转上下条
function previousAndNext(isNext) {
    var temp_dataKey=getTempNameAndRecordId();
    var tempName=temp_dataKey[0];
    var dataKey=temp_dataKey[1];
    var dataName=tempName+"-data";
    var request=window.indexedDB.open(tempName);
    request.onerror=function (ev) {  };
    request.onsuccess=function (ev) {
        var  db=ev.target.result;
        var  ts=db.transaction(dataName,'readonly');
        var object=ts.objectStore(dataName);
        var range;
        var re;
        if(isNext){
            range=IDBKeyRange.lowerBound(dataKey,true);//从低到高，不包含
            re=object.openCursor(range);//正序
        }else{
            range=IDBKeyRange.upperBound(dataKey,true);//从高到底，不包含
            re=object.openCursor(range,"prev");//倒序
        }
        re.onerror=function (ev2) {
            navigator.notification.alert('没有数据了！',alertDismissed,'','OK');
            // alert('没有数据');
        }
        re.onsuccess=function (ev2) {
            var cursor=ev2.target.result;
            if (cursor){
                location.href = "dataRecord.html?" + 'txt=' + encodeURI(tempName + '|' + cursor.primaryKey);
            }else {
                navigator.notification.alert('没有数据了！',alertDismissed,'','OK');
                // alert('没有数据了');
            }

        }




    }
    
}

