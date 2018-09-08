function exportTempAndData() {
    var getTemplate = document.getElementById("selectTemplate1");
    getTemplate.options.selected =true ;
    var tempName=getTemplate.value;

    if (tempName=="null"){
        alert('请先选择对用的模版名称');
        return 0;
    }

    exportData(tempName);
}

//导出数据
function exportData(tempName) {
    var request =window.indexedDB.open(tempName);
    var flag=0;
    request.onerror=function (ev) {
        alert('打开错误！')
    }
    request.onsuccess=function (ev) {
        var db=ev.target.result;
        if(flag==1){
            alert('该模版没有数据！')
        }
        else{
            var dataNames = db.objectStoreNames;//获取数据表名
            var dataName = dataNames[0];
            var  ts=db.transaction(dataName,'readwrite');
            var object=ts.objectStore(dataName);
            var re=object.openCursor();
            var i=0;
            var dataList=new Array();
            re.onerror=function (ev2) { alert('打开数据库出错！') }
            re.onsuccess=function (ev2) {
                var cursor=ev2.target.result;
                if (cursor){
                   dataList[i]=cursor.value;
                   i++;
                   cursor.continue();
                }
                else {
                    dataToFile(dataList,tempName,dataName);
                    console.log('遍历数据完成！')
                }
            }

        }

    }
    request.onupgradeneeded=function (ev) {
        flag=1;
    }
}






function dataToFile(dataList,tempName,dataName) {

    // alert(JSON.stringify(dataList));

    var sheet0=XLSX.utils.json_to_sheet(dataList);
    var wopts = { bookType:'xlsx', bookSST:false, type:'binary' };
    var  wb = { SheetNames: ['Sheet0'], Sheets: {}, Props: {} };
    wb.Sheets['Sheet0'] = sheet0;//通过json_to_sheet转成单页(Sheet)数据
    var wbout = XLSX.write(wb,wopts);

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    /* the saveAs call downloads a file on the local machine */
    saveAs(new Blob([s2ab(wbout)],{type:""}),tempName,dataName+".xlsx");

}


//写入到文件
function saveAs(obj,tempName,fileName) {//当然可以自定义简单的下载文件实现方式
    // var tmpa = document.createElement("a");
    // tmpa.download = fileName || "下载";
    // tmpa.href = URL.createObjectURL(obj); //绑定a标签
    // tmpa.click(); //模拟点击实现下载
    // setTimeout(function () { //延时释放
    //     URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
    // }, 100);

    var dirUri = cordova.file.externalRootDirectory;

    window.resolveLocalFileSystemURI(dirUri,function (Entry) {
        Entry.getDirectory("表型采集模版与数据", {
            create: true,
        },function (dirEntry) {
            dirEntry.getDirectory('data', { create: true }, function (subDirEntry) {
                savefile(subDirEntry,obj,fileName);
            }, onErrorCreateFile);

        },onErrorGetDir)

    })
    // window.indexedDB.deleteDatabase(tempName);
    // window.localStorage.removeItem(tempName);

}




function savefile(dirEntry,fileData, fileName){
    dirEntry.getFile(
        fileName, {
            create: true,
            exclusive: false
        },
        function (fileEntry) {
            writeFile(fileEntry, fileData);

        }, onErrorCreateFile);
}

function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {
        fileWriter.onwriteend = function () {

        };
        fileWriter.onwrite=function () {

            alert('导出成功！')
        }
        fileWriter.onerror = function (e) {
            console.log('Failed file write: ' + e.toString());
        };
        fileWriter.write(dataObj);

    });
}



function onErrorCreateFile(e) {
    console.log('Failed create file: ' + e.toString());
};

function onErrorGetDir(error){
    console.log("文件夹创建失败！")
}

