function loadTemplates(){
    for(var i=0;i<window.localStorage.length;i++){
        var _option=$("<option value="+window.localStorage.key(i)+">"+window.localStorage.key(i)+"-data"+"</option>");
      ;
        $("#selectTemplate").append(_option);

    }
}

function deleteChosenTempAndData() {
    var getTemplate = document.getElementById("selectTemplate");
    getTemplate.options.selected =true ;
    var tempName=getTemplate.value;
    if (tempName=='null'){
        alert("请先选择数据");
    }
    else {
        // window.localStorage.removeItem(tempName);
        window.indexedDB.deleteDatabase(tempName);
        alert("删除成功");
        $("#selectTemplate").empty();
        location.href="setting.html"
    }
}



/*清除所有数据*/
function clearAll() {
    var yes=confirm("确定是否清除全部数据（数据库中模版、数据以及本地储存中的图片）？")
    if (yes){
        var tempName;
        for(var i=0;i<window.localStorage.length;i++){
            tempName=window.localStorage.key(i);
            window.localStorage.removeItem(tempName);
            window.indexedDB.deleteDatabase(tempName);
        }
        clearPhotos();//删除照片
    }
    else{

    }
}

function clearPhotos() {
    var dirUri = cordova.file.externalRootDirectory;
    window.resolveLocalFileSystemURI(dirUri,function (Entry) {
        Entry.getDirectory("表型采集模版与数据", {
        },function (dirEntry) {
            dirEntry.getDirectory('photos', {}, function (subDirEntry) {
                subDirEntry.removeRecursively(success,fail);
            }, onErrorGetDir);

        },onErrorGetDir)
    })
}
function onErrorGetDir(error){
    console.log("文件夹打开失败！")
}
function success(ev) {
    alert("清除成功！")
}
function fail(ev) {
    alert("清除失败！")
}