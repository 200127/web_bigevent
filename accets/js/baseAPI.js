// 每次调用$.get 或$.post 或$.ajax的时候会先调用这个函数
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

    // 统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    };

    // 全局统一挂载complete毁掉函数
    options.complete = function(res) {
        // console.log("执行了complete");
        // console.log(e);
        // 在complete 回调函数中，可以使用e.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败啊') {
            // 1、强制清除token
            localStorage.removeItem('token');
            // 2、强制跳转login页面
            location.href = '/login.html'
        }
    }

})