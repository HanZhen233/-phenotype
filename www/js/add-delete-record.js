//添加数据
function addRecord() {
    var recordId = prompt("请输入材料编号", "");
    var loc=location.href;
    var n1=loc.length;
    var n2=loc.indexOf('=');
    var tempName=decodeURI(loc.substr(n2+1,n1-n2));
    if(tempName.indexOf('|')==-1){
        location.href="dataRecord.html?"+'txt='+encodeURI(tempName+'|'+recordId );//如果是数据列表跳转
    }
    else {//如果是在数据界面跳转。
        var temp=tempName.split('|');
        tempName=temp[0];
        location.href="dataRecord.html?"+'txt='+encodeURI(tempName+'|'+recordId );
    }
}
//删除数据
function deleteRecord() {

}
