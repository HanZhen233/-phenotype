


function dealData() {
var temp=new Array();
    temp=getTempNameAndRecordId();
    var tempName=temp[0];
    var recordId=temp[1];
    getRecord(tempName,recordId);

}

function getTempNameAndRecordId() {
    var loc=location.href;
    var n1=loc.length;
    var n2=loc.indexOf('=');
    var tempName=decodeURI(loc.substr(n2+1,n1-n2));
    var temp=tempName.split('|')
    return temp;
}


function getRecord(tempName,recordId) {
    var request=window.indexedDB.open(tempName);

    request.onerror=function (ev) {
        console.log('数据库打开报错');
    }
    request.onsuccess=function (ev) {
        var db=ev.target.result;
            var dataNames = db.objectStoreNames;//获取数据表名
            var dataName = dataNames[0];
            var ts=db.transaction(dataName,'readwrite');
            var object=ts.objectStore(dataName);
            var detail=object.get(recordId);
            detail.onerror=function (ev2) {
                alert('错误！')
            }
            detail.onsuccess=function (ev2) {
            //数据库操作是新的线程，因此后续操作应该在此基础上继续。
            //     hello(JSON.stringify(detail.result));
                alert(window.localStorage.getItem(tempName));
                alert(JSON.stringify(detail.result));



            }
        }

}
