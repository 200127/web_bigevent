$(function() {
    window.parent.getUserInfo();

    // 为上传绑定点击事件
    $("#btnChooseImg").on("click", function() {
        $("#file").click();
    })


    // 为文件选择框绑定change事件
    $("#file").on("change", function(e) {
        var filelist = e.target.files;

        if (filelist.length === 1) {
            console.log(filelist);
        } else {
            return alert("请选择图片")
        }

        // 1、拿到用户选择的文件
        var file = e.target.files[0];
        // 2、将文件转化为路径
        var imgURL = URL.createObjectURL(file);
        // 3、重新初始化图片区域
        $("#image").attr('src', imgURL) //重新设置图片路径
    })

    // 为上传绑定点击事件
    $("#btnUploadImg").on("click", function() {
        // 1、拿到头像 
        var dataURL = $("#image").attr('src');
        if (dataURL === null) {
            alert("请选择图片")
        } else {
            // 调用接口，传到服务器
            $.ajax({
                method: 'POST',
                url: '/my/update/avatar',
                data: {
                    avatar: dataURL
                },
                success: function(e) {
                    if (e.status !== 0) {
                        alert("上传失败")
                    } else {
                        console.log(e);
                        alert("更新成功")
                        window.parent.getUserInfo();
                    }

                }
            })

        }

    })

})