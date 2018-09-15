function addRecord() {
    var recordId = prompt("请输入材料编号", "");
    var loc=location.href;
    var n1=loc.length;
    var n2=loc.indexOf('=');
    var tempName=decodeURI(loc.substr(n2+1,n1-n2));
    if(tempName.indexOf('|')==-1){
        location.href="dataRecord.html?"+'txt='+encodeURI(tempName+'|'+recordId );
    }
    else {
        var temp=tempName.split('|');
        tempName=temp[0];
        location.href="dataRecord.html?"+'txt='+encodeURI(tempName+'|'+recordId );
    }

}
