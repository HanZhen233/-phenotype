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
    var request=window.indexedDB.open(tempName);

    request.onerror=function (ev) {
        console.log('数据库打开报错');
    }
    request.onsuccess=function (ev) {//成功打开数据库
        var db=ev.target.result;
            var dataNames = db.objectStoreNames;//获取数据表名
            var dataName = dataNames[0];

            var ts=db.transaction(dataName,'readwrite');
            var object=ts.objectStore(dataName);
            var detail=object.get(recordId);


            detail.onerror=function (ev2) {
                alert('请填写数据！')
            }
            detail.onsuccess=function (ev2) {
            //数据库操作是新的线程，因此后续操作应该在此基础上继续。
            //     hello(JSON.stringify(detail.result));
                var dataAll=detail.result;//详细数据json
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
            flag=1;
            var dataName=tempName+'-data';
            var keyPath;
            for (var z in temp[0] ){
                keyPath=z;
                break;
            }
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

function fillData(dataAll) {

for(var i=0;i<$("#showDetails li").length;i++){
    var _span=$("#showDetails li").eq(i).find('span');
    var _input=$("#showDetails li").eq(i).find('input');//普通输入文本，日期，数字
    var _select=$("#showDetails li").eq(i).find('select')//枚举类型的
    var _button=$("#showDetails li").eq(i).find('button')
    // $("#showDetails li").eq(i).append(s);
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

        var photoLabel=$("#showDetails li").eq(i);
        var photoName=_span.text();
        var photoPath=dataAll[photoName];



        loadPhoto(photoLabel,photoName,photoPath);
    }

}
}










//加载图片。
function loadPhoto(photoLabel,photoName,photoPath) {


}

function saveRecord() {

}



function deleteRecord() {

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




