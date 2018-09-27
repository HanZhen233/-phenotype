function loadTemplates(){
    for(var i=0;i<window.localStorage.length;i++){
        var _option=$("<option value="+window.localStorage.key(i)+">"+window.localStorage.key(i)+"-data"+"</option>");
      ;
        $("#selectTemplate").append(_option);

    }
}
//对话框被忽略
function alertDismissed() {
//    不做处理
}


function deleteChosenTempAndData() {
    var getTemplate = document.getElementById("selectTemplate");
    getTemplate.options.selected =true ;
    var tempName=getTemplate.value;
    if (tempName=='null'){
        navigator.notification.alert('请先选择数据！',alertDismissed,'','OK');
        // alert("请先选择数据");
    }
    else {
        // window.localStorage.removeItem(tempName);
        window.indexedDB.deleteDatabase(tempName);
        navigator.notification.alert('删除成功！',alertDismissed,'','OK');
        // alert("删除成功");
        $("#selectTemplate").empty();
        location.href="setting.html"
    }
}



/*清除所有数据*/
function clearAll() {
    navigator.notification.confirm(
        '确定是否清除全部数据（数据库中模版、数据以及本地储存中的图片）？',
        onConfirm,
        '',
        ['确认','取消']
    )

    // var yes=confirm("确定是否清除全部数据（数据库中模版、数据以及本地储存中的图片）？")
}
function onConfirm(choice) {
    if (choice==1){
        var tempName;
        for(var i=0;i<window.localStorage.length;i++){
            tempName=window.localStorage.key(i);
            window.localStorage.removeItem(tempName);
            window.indexedDB.deleteDatabase(tempName);
        }
        clearPhotos();//删除照片
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

    navigator.notification.alert('清楚成功',alertDismissed,'','OK');
    // alert("清除成功！")
}
function fail(ev) {
    alert("清除失败！")
}