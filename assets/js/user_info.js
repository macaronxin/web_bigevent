$(function() { //jQuery的入口函数
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间!'
            }
        }
    })
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) { //成功的回调函数
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败!')
                }
                console.log(res)
                    // 调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置表单的数据
    $('#btnReset').on('click', function(e) {
            e.preventDefault(); //阻止表单的默认重置行为，防止表单被完全清空
            initUserInfo() //重新获取一遍用户信息，填写表单
        })
        // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功')
                window.parent.getUserInfo() //调用父页面的方法，将子页面中的信息渲染到父页面
            }
        })
    })
})