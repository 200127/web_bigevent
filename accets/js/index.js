$(function() {
    // 调用获取用户的基本信息
    getUserInfo();

    $("#btnLogout").on("click", function() {
        // 1、清除本地存储的token
        localStorage.removeItem('token');
        // 2、跳转登录页面
        location.href = '/login.html'
    })


})


// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(e) {
            if (e.status !== 0) {
                console.log("请求失败!");
            } else {
                // 调用渲染用户头像函数
                renderAvatar(e.data);
            }
        },
        // 不论成功还是失败，最终都会调用complete
        // complete: function(res) {
        //     // console.log("执行了complete");
        //     // console.log(e);
        //     // 在complete 回调函数中，可以使用e.responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1、强制清除token
        //         localStorage.removeItem('token');
        //         // 2、强制跳转login页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

// 渲染头像方法
function renderAvatar(user) {
    // 1、获取用户名称

    var name = user.nickname || user.username;
    // 2、设置欢迎文本
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name + "&nbsp;&nbsp;");
    // 3、按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染img头像
        $(".layui-nav-img").attr('src', user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        // 渲染文字头像 
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
}