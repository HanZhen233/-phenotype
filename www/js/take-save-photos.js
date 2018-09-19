
function takePhoto(obj) {

    var cameraOption= {
        quality : 80,
        destinationType : Camera.DestinationType.DATA_URL,//数据的格式（是文件地址还是编码）
        sourceType : Camera.PictureSourceType.CAMERA,//获取图片的由来
        allowEdit : true,//选择图片前允许简单编辑
        encodingType : Camera.EncodingType.JPEG,
        // targetWdith : 100,//压缩图片
        // targetHeight : 100,
        popoverOptions : CameraPopoverOptions,//仅仅ios可用
        saveToPhotoAlbum : false
    };
    navigator.camera.getPicture(function(data){onCameraSuccess(data,obj)}, onCameraError, cameraOption);
}

function onCameraSuccess(imageURI,obj){


    var temp=getTempNameAndRecordId();
    var tempName=temp[0];
    var recordId=temp[1];
    var _li=$(obj).parent();
    if (_li.find("img").hasClass('photo')){
        _li.find("img").attr("src","data:image/jpeg;base64," + imageURI);
    }
    else {
        var photo=$("<img class='photo' width='40%' height='70px' value='' >") ;
        photo.attr("src","data:image/jpeg;base64," + imageURI);
        photo.val(cordova.file.externalRootDirectory.toString()+'表型采集模版与数据/photos/'+tempName+"-"+recordId+"-"+obj.id+".jpg")
        ;
        $(obj).after(photo);
    }

    var byteString=atob(imageURI);
    var ia = new Uint8Array(byteString.length);
    for(var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var imgData=new Blob([ia], {type: "image/jpeg"});

    saveAs(imgData,tempName+"-"+recordId+"-"+obj.id+".jpg");
}
function onCameraError(message) {
    alert('Failed because: ' + message);
}




function saveAs(obj,fileName) {//当然可以自定义简单的下载文件实现方式

    var dirUri = cordova.file.externalRootDirectory;


    window.resolveLocalFileSystemURI(dirUri,function (Entry) {
        Entry.getDirectory("表型采集模版与数据", {
            create: true,
        },function (dirEntry) {
            dirEntry.getDirectory('photos', { create: true }, function (subDirEntry) {
                savefile(subDirEntry,obj,fileName);
            }, onErrorGetDir);

        },onErrorGetDir)
    })
}




function savefile(dirEntry,fileData, fileName){
    dirEntry.getFile(
        fileName, {
            create: true,
            exclusive: false
        },
        function (fileEntry) {
            writeFile(fileEntry, fileData);

        }, onErrorCreateFile);
}

function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {
        fileWriter.onwriteend = function () {
        // alert(fileEntry.toURI());
        };
        fileWriter.onwrite=function () {

            // alert('！')
        }
        fileWriter.onerror = function (e) {
            console.log('Failed file write: ' + e.toString());
        };
        fileWriter.write(dataObj);

    });
}



function onErrorCreateFile(e) {
    console.log('Failed create file: ' + e.toString());
};

function onErrorGetDir(error){
    console.log("文件夹创建失败！")
}

