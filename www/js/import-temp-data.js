var wb;//读取完成的数据
var rABS = false; //是否将文件读取为二进制字符串
var str={};
var ke;
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
        var n,t;
        var i=0;
       for(z in sheet0) {
           i++;
           if (i<20){
           if(sheet0[z].v=="性状名称")
              n=z[0];
           if(sheet0[z].v=="数据类型")
               t=z[0];

       }
    };

        for(z in sheet0) {
        if (z[0]==n&&sheet0[z].v!="性状名称"&&sheet0[z].v!="数据类型")
            ke=sheet0[z].v ;
        if(z[0]==t&&sheet0[z].v!="性状名称"&&sheet0[z].v!="数据类型")
            str[ke]=sheet0[z].v;
        }
         localStorage.setItem(obj.files[0].name,JSON.stringify(str));
        alert("模版导入成功！");
    }
    reader.readAsBinaryString(f);

}

function showTemplates(){
    for (var i=0;i<window.localStorage.length;i++){
        document.getElementById("showTemplates").append(window.localStorage.key(i)+"<br>");
    }
}