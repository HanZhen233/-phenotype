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
//根据模版加载元素标签
function createLabels(_item,_name,_type,_list) {
    var _li = $('<li></li>');
    var _span = $('<span>' + _name + '</span>');
    var _nobr = $('<nobr> : </nobr>');

    var _input;
    switch (_type) {
        case '整数':
        case 'Small Whole Number':
            _input = $('<input  type="number" class="_input" placeholder="请输入" align="right" align="right"  onkeypress="if(event.keyCode==13) focusNextInput(this);">');
            break;
        case '文字':
            _input = $('<input type="text" class="_input" placeholder="请输入" onkeypress="if(event.keyCode==13) focusNextInput(this);">');
            break;
        case '带2位小数点的正数':
            _input = $('<input type="number" step="0.01" class="_input" placeholder="请输入" onkeypress="if(event.keyCode==13) focusNextInput(this);" >');
            break;
        case '日期':
            _input = $('<input  type="date" class="_input"  value="" onchange="focusNextInput(this)">');
            break;
        case '图片':
            //<img  class="camera" src="img/camera.png" >
            _input = $("<button id='' class='takePhoto' onclick='takePhoto(this)'>拍照</button> ");
            _input.attr("id", _name);
            break;
        case '枚举':
            _input = $('<select class="_select"  onchange="focusNextInput(this)" }"> <option value="null">请选择</option></select>');
            var _listAll = new Array();
            if (_list.indexOf('，') != -1) {
                _listAll = _list.split('，');//中文逗号字符
            } else if (_list.indexOf(',') != -1) {
                _listAll = _list.split('，');//英文逗号字符
            }
            else {
                _listAll = _list.split('、');//中文顿号字符
            }
            for (var i = 0; i < _listAll.length; i++) {
                _input.append("<option value=" + _listAll[i] + '>' + _listAll[i] + '</option>');
            }
            break;
    }
    _li.append(_span);
    _li.append(_nobr);
    _li.append(_input);

    $("#showDetails").append(_li);
}


function focusNextInput(thisInput){
    // var _type;
    // if($(thisInput).hasClass('_input')){
    //     _type="input"
    // } else if($(thisInput).hasClass('_select')) {
    //     _type="select"
    // }
    // else{
    //     _type="button"
    // }
    var _li=$(thisInput).parent();
    var _nextLi;

    for(var i=0;i<$("#showDetails li").length;i++) {
        if (i==$("#showDetails li").length-1){
            break;
        //    尝试失去焦点
        }
        else if (_li.is($("#showDetails li").eq(i))) {

                _nextLi = $("#showDetails li").eq(i + 1);

                var _input = _nextLi.find('input');//普通输入文本，日期，数字
                var _select = _nextLi.find('select')//枚举类型的
                var _button = _nextLi.find('button');
                if (_input.hasClass('_input')) {

                    _input.focus();
                } else if (_select.hasClass('_select')) {
                    _select.focus();
                }
                else {
                    _button.focus();

                }
                break;
            }

    }




        // var inputs = document.getElementsByTagName(_type);
        // for (var i = 0; i < inputs.length; i++) {
        //     // 如果是最后一个，则焦点回到第一个
        //     if (i == (inputs.length - 1)) {
        //         // inputs[0].focus();
        //         break;
        //     } else if (thisInput == inputs[i]) {
        //         inputs[i + 1].focus();
        //         break;
        //     }
        // }

}