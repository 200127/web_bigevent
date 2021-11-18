$(function() {

    initUserInfo();




    // 初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(e) {
                if (e.status !== 0) {
                    return alert("获取用户信息失败！")
                }
                console.log(e.data);
                $("#ids").val(e.data.id);
                $("#username").val(e.data.username);
                $("#nickname").val(e.data.nickname);
                $("#email").val(e.data.email);
            }
        })
    }

    // 重置表单数据
    $("#btnReset").on('click', function(e) {
        e.preventDefault();
        $("#nickname").val("");
        $("#email").val("");
    });

    // 监听表单的提交事件
    $(".layui-form").on("submit", function(e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    alert("修改用户失败!");
                } else {
                    alert("修改用户成功!");
                    // 调用父页面中的方法，重新渲染用户头像和用户
                    // 的信息
                    window.parent.getUserInfo();
                }
            }
        })
    })

})