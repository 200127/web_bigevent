$(function() {



    initArtCateList();

    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(e) {
                console.log(e);
                var htmlStr = template('tpl-table', e)
                $('tbody').html(htmlStr);
            }
        })
    }

    $("#btnAddCate").on("click", function() {
        var user = $("#input-user").val();
        var name = $("#input-name").val();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: {
                name: user,
                alias: name
            },
            success: function(e) {
                if (e.status !== 0) {
                    alert("失败")
                } else {
                    alert("成功");
                    initArtCateList();
                }
            }
        })

    })

})