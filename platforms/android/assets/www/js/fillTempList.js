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
            _input = $('<input  type="number" class="_input" placeholder="请输入" align="right">');
            break;
        case '文字':
            _input = $('<input type="text" class="_input" placeholder="请输入" >');
            break;
        case '带2位小数点的正数':
            _input = $('<input type="number" step="0.01" class="_input" placeholder="请输入" >');
            break;
        case '日期':
            _input = $('<input  type="date" class="_input"  value="">');
            break;
        case '图片':
            //<img  class="camera" src="img/camera.png" >
            _input = $("<button id='' onclick='takePhoto(this)'>拍照</button>");
            _input.attr("id", _name);
            break;
        case '枚举':
            _input = $('<select class="_select"> <option value="null">请选择</option></select>');
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