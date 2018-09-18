
// function loadPhotos() {
//
//     var str=JSON.parse(window.localStorage.getItem('图片'));
//     alert(window.localStorage.getItem('图片'));
//     alert( cordova.file.externalRootDirectory);
//     for (var i = 0; i < $("#showDetails li").length; i++) {
//         var _span = $("#showDetails li").eq(i).find('span');
//         var _button = $("#showDetails li").eq(i).find('button')
//         var _li=$("#showDetails li").eq(i);
//         if(_button.hasClass('takePhoto')){
//             var buttonId=_span.text();
//             var photoName=str[_span.text()];
//             if (photoName!="null"&&photoName.indexOf(".jpg")!=-1){
//                 findPhoto(photoName,_li);
//             }
//         }
//     }
// }
// function findPhoto(photoName,_li) {
//     var dirUri = cordova.file.externalRootDirectory;
//     alert( cordova.file.externalRootDirectory);
//     window.resolveLocalFileSystemURI(dirUri,function (Entry) {
//         Entry.getDirectory("表型采集模版与数据", {
//             create: true,
//         },function (dirEntry) {
//             dirEntry.getDirectory('photos', { create: true }, function (subDirEntry) {
//                 readPhoto(subDirEntry,photoName,_li);
//             }, onErrorGetDir);
//
//         },onErrorGetDir)
//     })
//
// }
//
// function readPhoto(dirEntry,photoName,_li) {
//     dirEntry.getFile(
//         photoName, {
//             create: true,
//             exclusive: false
//         },
//         function (fileEntry) {
//
//
//             displayPhoto(fileEntry,_li);
//
//         }, onErrorReadFile);
// }
//
//
// function displayPhoto(fileEntry,_li) {
//     if (_li.find("img").hasClass('photo')){
//         _li.find("img").attr("src",fileEntry.toURI());
//     }
//     else {
//         var photo=$("<img class='photo' width='40%' height='60px' >") ;
//         photo.attr("src",fileEntry.toURI());
//         _li.append(photo);
//     }
// }
//


// function readPhoto(dirEntry,photoName,buttonId) {
//     dirEntry.getFile(
//         photoName, {
//             create: true,
//             exclusive: false
//         },
//         function (fileEntry) {
//
//             fileEntry.file(function (file) {
//
//                 var reader = new FileReader();
//                 reader.onloadend = function() {
//                     var blob = new Blob([new Uint8Array(this.result)], { type: "image/jpeg" });
//                     displayPhoto(blob,photoLabel);
//
//                 };
//
//                 reader.readAsArrayBuffer(file);
//
//
//             },onErrorReadFile)
//         }, onErrorReadFile);
// }



// function displayPhoto(blob,_li) {
//     if (_li.find("img").hasClass('photo')){
//         _li.find("img").attr("src",window.URL.createObjectURL(blob));
//     }
//     else {
//         var photo=$("<img class='photo' width='40%' height='60px' >") ;
//         photo.attr("src", window.URL.createObjectURL(blob));
//         _li.append(photo);
//     }
//     alert("hello")
//     li.append("<p>haha</p>");
// }

function onErrorReadFile(e) {
    console.log('Failed read file: ' + e.toString());
}


function onErrorGetDir(error){
    console.log("文件夹读取失败！")
}