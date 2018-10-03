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