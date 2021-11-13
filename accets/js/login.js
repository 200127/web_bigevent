$(function() {
    // 登录注册切换
    $("#link_reg").on('click', function() {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    $("#link_login").on('click', function() {
        $(".reg-box").hide();
        $(".login-box").show();
    })

    // 定义开关变量
    var flagUser = false;
    var flagPwd = false;
    var flagCpwd = false;
    // 找到所在标签元素
    var $loginName = $('#exampleInputUsername1');
    var $loginPass = $('#exampleInputPassword1');

    var $user_name = $("#exampleInputUsername2")
    var $pwd = $('#exampleInputPassword2');
    var $cpwd = $('#exampleInputPassword3');
    // 1.如果失去焦点，则进行检查判断用户名是否合法
    // 登录校验
    $("#dengLu").on('click', function() {
        // 封装函数 调用函数
        fnCheckUsername();
        fnCheckPassword();
    });
    // 注册校验
    $("#ZhuCe").on('click', function() {
        // 封装函数 调用函数
        fnCheckUser();
        fnCheckPwd();
        fnCheckCpwd();

    });
    // login name password
    function fnCheckUsername() {
        // 获取用户输入的数据
        //用户名
        var vals = $loginName.val().trim();
        if (vals == '') {
            alert("账号不能为空");
            flagUser = false
            return
        }
    }
    // 密码
    function fnCheckPassword() {
        // 获取密码框输入的数据
        var vals = $loginPass.val()
            // 密码正则匹配表达式
        var rePass = /^[\w!-@#$%^&*]{6,20}$/
            // 如果输入框为空，则提示不能为空并return
        if (vals == '') {
            alert('密码不能为空')
            flagPwd = false
            return
        }
        // 正则验证密码输入是否合法
        if (rePass.test(vals)) {
            // 如果匹配成功，则隐藏span标签
            $pwd.next().hide()
            flagPwd = true
        } else {
            // 如果匹配失败，则显示span标签，替换提示信息
            alert('密码是6到20位字母、数字，还可包含@!#$%^&*-字符')
            flagPwd = false
        }
    }
    // reg name password
    function fnCheckUser() {
        // 获取用户输入的数据
        //用户名
        var vals = $user_name.val().trim();
        if (vals == '') {
            alert("账号不能为空");
            flagUser = false
            return
        }
    }
    // 密码
    function fnCheckPwd() {
        // 获取密码框输入的数据
        var vals = $pwd.val()
            // 密码正则匹配表达式
        var rePass = /^[\w!-@#$%^&*]{6,20}$/
            // 如果输入框为空，则提示不能为空并return
        if (vals == '') {
            alert('密码不能为空')
            flagPwd = false
            return
        }
        // 正则验证密码输入是否合法
        if (rePass.test(vals)) {
            // 如果匹配成功，则隐藏span标签
            $pwd.next().hide()
            flagPwd = true
        } else {
            // 如果匹配失败，则显示span标签，替换提示信息
            alert('密码是6到20位字母、数字，还可包含@!#$%^&*-字符')
            flagPwd = false
        }
    }

    // 再次密码
    function fnCheckCpwd() {
        // 获取重复密码框输入的数据
        var vals = $pwd.val()
        var cvals = $cpwd.val()
        if (cvals == '') {
            alert('重复密码框不能为空')
            flagCpwd = false
            return
        }
        if (vals == cvals) {
            $cpwd.next().hide()
            flagCpwd = true
        } else {
            alert('两次密码输入不一致，请重新输入')
            flagCpwd = false
            return
        }
    }

    // 监听注册表单的提交事件
    $("#form_reg").on('submit', function(e) {
        e.preventDefault();
        $.post('/api/reguser', {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password1]").val(),
                password: $("#form_reg [name=password2]").val(),
            },
            function(res) {
                if (res.status !== 0) {
                    return alert("注册失败" + res.message);
                }
                alert("注册成功");
                $("#link_login").click();
            })
    })

    // 监听登录表单的提交事件
    $("#form_login").on('submit', function(e) {
        // 阻止默认提交行为
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return alert("登录失败");
                }
                alert("登录成功");
                // 将登录成功的token字符串保存到本地存储
                localStorage.setItem('token', res.token);

                // 跳转后台主页
                location.href = '/index.html'
            }
        })

    })
})