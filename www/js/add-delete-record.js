//添加数据
function addRecord() {
    var recordId = prompt("请输入材料编号","");
    if(recordId=="") {
        navigator.notification.alert('请输入材料编号！',alertDismissed,'','OK');
        // alert("请输入材料编号");
    }else if(recordId==null){

    }else {
        var loc = location.href;
        var n1 = loc.length;
        var n2 = loc.indexOf('=');
        var tempName = decodeURI(loc.substr(n2 + 1, n1 - n2));
        if (tempName.indexOf('|') == -1) {
            location.href = "dataRecord.html?" + 'txt=' + encodeURI(tempName + '|' + recordId);//如果是数据列表跳转
        }
        else {//如果是在数据界面跳转。
            var temp = tempName.split('|');
            tempName = temp[0];
            location.href = "dataRecord.html?" + 'txt=' + encodeURI(tempName + '|' + recordId);
        }
    }


}
//删除数据
function deleteRecord(obj) {
    var recordId=obj.id;
    var loc = location.href;
    var n1 = loc.length;
    var n2 = loc.indexOf('=');
    var tempName = decodeURI(loc.substr(n2 + 1, n1 - n2));
    if (tempName.indexOf('|') != -1) {
        var temp = tempName.split('|');
        tempName = temp[0];//如果不是从数据列表界面而是从数据中删除
    }
    deleteRecordFromDatabase(tempName,recordId)
}
function deleteRecordFromDatabase(tempName,recordId) {
    navigator.notification.confirm(
        '是否删除？',
        function (choice) {
            if(choice==1){
                var request=window.indexedDB.open(tempName);
                var dataName=tempName+"-data";
                request.onerror=function (ev) {
                    console.log('数据库打开报错');
                }
                request.onsuccess=function (ev) {
                    db=ev.target.result;
                    var  ts=db.transaction(dataName,'readwrite');
                    var object=ts.objectStore(dataName);
                    object.delete(recordId);
                    navigator.notification.alert('删除成功',alertDismissed,'','OK');
                    // alert('删除成功！')
                    location.href = "dataList.html?" + 'txt=' + encodeURI(tempName);
                }

            }else{

            }
        },
        '',
        ['确认','取消']
    )



}
//对话框被忽略
function alertDismissed() {
//    不做处理
}


    
