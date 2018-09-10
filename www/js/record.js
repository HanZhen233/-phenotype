


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
                //创建模版
                fillTemplate(temp);

            //    填充数据
                fillData(dataAll);

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

       createLabels(item,_name,_type,_list);

   }
    $('#showDetails').listview('refresh');


}

function createLabels(_item,_name,_type,_list){
    var  _li=$('<li></li>');
    var _span=$('<span>'+_name+'</span>');
    var _nobr=$('<nobr> : </nobr>');

   var _input;
    switch (_type){
        case '整数':
        case 'Small Whole Number':
            _input=$('<input type="number" placeholder="请输入" align="right">');
            break;
        case '文字':
            _input=$('<input type="text" placeholder="请输入" >');
            break;
        case '图片':
            _input=$('<img  class="camera" src="img/camera.png" ></img>');
            break;
        case '枚举':
            _input=$('<select > <option value="null">请选择</option></select>');
            var _listAll=new Array();
            if(_list.indexOf('，')!=-1)
        {
            _listAll = _list.split('，');//中文逗号字符
        }else if (_list.indexOf(',')!=-1){
                _listAll = _list.split('，');//英文逗号字符
            }
            else{
                _listAll = _list.split('、');//中文顿号字符
            }
            for(var i=0 ;i<_listAll.length;i++){
                _input.append("<option value="+_listAll[i]+'>'+_listAll[i]+'</option>');
            }
            break;
        case '带2位小数点的正数':
            _input=$('<input type="number" step="0.01" placeholder="请输入" >');
            break;
        case '日期':
            _input=$('<input type="date" placeholder="请输入"  >');
                break;
    }
    _li.append(_span);
    _li.append(_nobr);
    _li.append(_input);

    $("#showDetails").append(_li);
}
function fillData(dataAll) {

for(var i=0;i<$("#showDetails li").length;i++){
    var _span=$("#showDetails li").eq(i).find('span');
    var _input=$("#showDetails li").eq(i).find('input');
    var _select=$("#showDetails li").eq(i).find('select')
    if (_input!=null){
        _input.val(dataAll[_span.text()]);

    }
    if (_select!=null){

        var options=_select.find('option');
        for (var j=0;j<options.length;j++)
            if ($(options[j]).val()==dataAll[_span.text()]){
                $(options[j]).attr("selected",true);
            }



    }


}

}

function saveRecord() {

}

function deleteRecord() {

}

function cancelEdit() {

}

//拍照相关代码
$(document).ready(function () {
    $(".camera").click(function () {

    //    拍照的相关代码
    })
});
