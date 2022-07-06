$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从 layui 中获取 form 对象
    let form = layui.form
    let layer = layui.layer
        // 通过 form.verify() 函数自定义校验规则
    form.verify({
            // 自定义了一个叫做 pwd 校验规则
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            // 校验两次密码是否一致的规则
            repwd: function(value) {
                // 通过形参拿到的是确认密码框中的内容
                // 还需要拿到密码框中的内容
                // 然后进行一次等于的判断
                // 如果判断失败,则return一个提示消息即可
                let pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一致！'
                }
            }
        })
        // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
            e.preventDefault()
            let data = {
                    username: $('#form_reg [name=username]').val(),
                    password: $('#form_reg [name=password]').val(),
                }
                // 手动发起ajax的post请求
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) { //判断服务器响应过来的状态
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
                $('#link_login').click()
            })
        })
        // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
            // 手动发起ajax请求
        $.ajax({
            url: '/api/login', //因为设置了baseAPI，因此不需要写根路径
            method: 'POST',
            data: $(this).serialize(), // 快速获取表单数据
            success: function(res) {
                if (res.status !== 0) { //判断服务器响应过来的状态
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // console.log(res.token)  token可以用于身份验证，将其设为请求头才能获取权限
                localStorage.setItem('token', res.token) //将token值存储到本地存储中
                    //检查->Application->Storage可以看到本地存储的值
                location.href = '/index.html' // 跳转到后台页面
            }
        })
    })
})