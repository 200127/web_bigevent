$(function() {

    $(".layui-form").on("submit", function(e) {
        var old = $("#old").val();
        var pnew = $("#new").val();
        console.log(old);

        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/my/updatepwd',
            data: {
                old,
                pnew
            },
            success: function(res) {
                if (res.status !== 0) {
                    console.log(res);
                    alert("更新失败！")
                } else {
                    console.log(res);
                    alert("更新成功");
                }
                $(".layui-form")[0].reset();
            }
        })
    })


})