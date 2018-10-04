var wb;//读取完成的数据
var str={};

function importTemplate(obj) {//导入
    if(!obj.files) {
        return;
    }
// alert(obj.files[0].name);
    var f = obj.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        var data = e.target.result;
            wb = XLSX.read(data, {
                type: 'binary'
            });

        //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        //wb.Sheets[Sheet名]获取第一个Sheet的数据
        // XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])

        var sheet0=wb.Sheets[wb.SheetNames[0]];
    //     var n,t;
    //     var i=0;
    //    for(z in sheet0) {
    //        i++;
    //        if (i<20){
    //        if(sheet0[z].v=="性状名称")
    //           n=z[0];
    //        if(sheet0[z].v=="数据类型")
    //            t=z[0];
    //
    //    }
    // };
    //
    //     for(z in sheet0) {
    //     if (z[0]==n&&sheet0[z].v!="性状名称"&&sheet0[z].v!="数据类型")
    //         ke=sheet0[z].v ;
    //     if(z[0]==t&&sheet0[z].v!="性状名称"&&sheet0[z].v!="数据类型")
    //         str[ke]=sheet0[z].v;
    //     }

        str=XLSX.utils.sheet_to_json(sheet0);

        var templates=new Array();
        var str1=obj.files[0].name;
        templates=str1.split(".");
        if (window.localStorage.getItem(templates[0])!=null){

        }

         localStorage.setItem(templates[0],JSON.stringify(str));

        navigator.notification.alert('模版导入成功！',alertDismissed,'','OK');
        // alert("模版导入成功！");
        $("#selectTemplate").empty();
        $("#selectTemplate1").empty();
        loadTemplates();
    }
    reader.readAsBinaryString(f);

}

//对话框被忽略
function alertDismissed() {
//    不做处理
}



//加载模版名称供选择
function loadTemplates(){
    for(var i=0;i<window.localStorage.length;i++){
        $("#selectTemplate").append("<option value="+window.localStorage.key(i)+">"+window.localStorage.key(i)+"</option>")
        var _option=$("<option value="+window.localStorage.key(i)+">"+window.localStorage.key(i)+"-data"+"</option>");
        $("#selectTemplate1").append(_option);
    }
}
// 导入数据
function importData(obj) {
    var getTemplate = document.getElementById("selectTemplate");
    getTemplate.options.selected =true ;
     var tempName=getTemplate.value;
     // var dataName=obj.files[0].name;
     // var temp=new Array();
     // temp=dataName.split('.');
     var dataName=tempName+'-data';

   if(tempName=="null") {
       navigator.notification.alert('请重新选择模版',alertDismissed,'','OK');
      location.href="dataTransmission.html";
   }

//    导入数据
    if (!obj.files) {
        return;
    }
    var f = obj.files[0];

    var reader= new FileReader();

    reader.onload = function (e) {

        var data = e.target.result;
        wb = XLSX.read(data, {
            type: 'binary'
        });
        //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        //wb.Sheets[Sheet名]获取第一个Sheet的数据
        // XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
        // document.getElementById("showData").innerHTML = JSON.stringify( XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) );
        // var dataAll = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

       // for (var i=0;i<dataAll.length;i++){
       //     for (var key in dataAll[i]) {
       //         alert(dataAll[i][key]);
       //     }
       //     break;
       //     }
       //
       //  var sheet0=wb.Sheets[wb.SheetNames[0]];
       //
       //  var z;
       //  for (z in sheet0){
       //      if(z[1]=='2')
       //      break;
       //  }
        //使用webSQL实现
        // var database=window.openDatabase("database",'1.0',"data demo",1024*1024*300);
        // database.transaction(function (tx) {
        //
        //     createTable(tx,wb,tempName);
        // },error,success);
        // for (z in sheet0){
        //     document.getElementById("showData").append(sheet0[z].v+" ");
        // }
     //使用indexedDB实现
        createDatabases(wb,tempName,dataName);
        // 储存模版与数据的关系
      // var r=window.localStorage.getItem('');


    };
    reader.readAsBinaryString(f);
}








//采用indexedDB
function createDatabases(wb,tempName,dataName) {
    var sheet0=wb.Sheets[wb.SheetNames[0]];
    var keyPath=sheet0['A1'].v;
    var dataAll=XLSX.utils.sheet_to_json(sheet0);
    var db;
    var flag=0;
    var request=window.indexedDB.open(tempName);
    request.onerror=function (ev) {
        console.log('数据库打开报错');
    }
    request.onsuccess=function (ev) {
        // alert('已清除该模版的数据库，请重新导入');
        // indexedDB.deleteDatabase(tempName);

        // var name=db.objectStoreNames;
        // alert(name[0]);
        // if (flag==0){
        //     alert('该模版原数据库被删除请重新导入');
        //     window.indexedDB.deleteDatabase(tempName);
        // }

        db=ev.target.result;
        var  ts=db.transaction(dataName,'readwrite');
        var object=ts.objectStore(dataName);
        for(var i=0;i<dataAll.length;i++){
            object.put(dataAll[i]);
        }
        navigator.notification.alert('导入成功',alertDismissed,'','OK');
        // alert('导入成功！')
    }

    request.onupgradeneeded=function (ev) {
        flag=1;
        db=ev.target.result;
        if (db.objectStoreNames.contains(dataName)) {
            db.deleteObjectStore(dataName);
            store = db.createObjectStore(dataName, {keyPath: keyPath});
        }
        else {
            store=db.createObjectStore(dataName,{keyPath:keyPath});
        }
    }


}

