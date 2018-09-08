


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
                var dataAll=detail.result;//详细数据json
                var temp=JSON.parse(window.localStorage.getItem(tempName));//模版数据json。
                // alert(JSON.stringify(detail.result));
                
                // for (var i in dataAll){
                //     alert(i+":  "+dataAll[i]);
                //     break;
                //
                // }
                fillTemplate(temp)
            }
        }

}
function fillTemplate(temp) {
    var item;
    var _name;
    var _type;
    var _list;

   for (var i=0;i<temp.length;i++)
   {
       item=temp[i];
       _name=item["性状名称"];
       _type=item["数据类型"];
      _list=item["枚举实例"];

      break;
   }

}

function createLabels(_name,_type_){
    
}
function fillData() {

}