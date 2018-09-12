function loadTemplates(){
    for(var i=0;i<window.localStorage.length;i++){
        $("#selectTemplate").append("<option value="+window.localStorage.key(i)+">"+window.localStorage.key(i)+"</option>")

    }
}

function deleteChosenTempAndData() {
    var getTemplate = document.getElementById("selectTemplate");
    getTemplate.options.selected =true ;
    var tempName=getTemplate.value;
    if (tempName=='null'){
        alert("请先选择模版");
    }
    else {
        window.localStorage.removeItem(tempName);
        window.indexedDB.deleteDatabase(tempName);
        alert("删除成功");
        $("#selectTemplate").empty();
        loadTemplates();
    }

}