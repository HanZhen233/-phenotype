
'use strict'
document.write("<script src='js/jquery-1.11.3.min.js'></script>");

$.mobile.pushStateEnabled = false;


var to_data_list = $('#template_list [data-role=listview] a');
to_data_list.click(function (e) {
    var template_title = $(this).find('[name=template_name]');
    
    $('#data_list [data-role=listview]').html(`<li><a href="#data_detail" class="ui-btn ui-btn-icon-right ui-icon-carat-r">${template_title.text()}第一个实验
    <p>实际上是调用数据库中与点击的模板名相同的表，获取里面的所有数据，解析并表示出来</p></a></li>
    `);
    $("#data_list [data-role=listview] a").click(function (e) {
        $("#data_detail [data-role=listview]").html(`
        <p>从表中 获取某一行的数据 将其解析之后 表现在页面上</p>
        `);
    });

});




// $("#template_panel").trigger("updatelayout");//每当面板中有发生 更新内容时 用这个触发

