$(function() {

    // 定义一个查询的参数对象，将来请求数据的时候，需要将请求参数对线
    // 提交到服务器
    var q = {
        pagenum: 1, //页码值.默认为请求一页数据
        pagesize: 2, //每页显示几条数据，默认两条
        cate_id: '', //文章分类的id
        state: '' //文章的状态，可选值有：已发布、草稿
    }

    // 定义一个美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date);

        var y = dt.getFullYear();
        var m = dt.getMonth();
        var d = dt.getDate();

        var hh = dt.getHours();
        var mm = dt.getMinutes();
        var ss = dt.getSeconds();

        return y + "年" + m + "月" + d + "日" + hh + ":" + mm + ":" + ss + ":"
    }

    inittable();
    // 获取文章列表数据的方法
    function inittable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    alert("获取失败");
                    console.log(res);
                } else {
                    console.log("获取成功");
                    console.log(res);
                    // 使用模板引擎渲染页面
                    var htmlStr = template('tpl-table', res)
                    $("tbody").html(htmlStr);
                }
            }
        })
    }

})