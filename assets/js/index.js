$(function() {
        // 调用getUserInfo获取用户基本信息
        getUserInfo()
        let layer = layui.layer
            // 点击按钮,实现退出功能
        $('#btnLogout').on('click', function() {
            // 提示用户是否确认退出
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                //do something
                // 1.清空本地存储中的token
                localStorage.removeItem('token')
                    // 2.重新跳转到登录页面
                location.href = '/login.html'
                    // 关闭confirm询问框
                layer.close(index);
            });
        })
    })
    // 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) { //成功时调用sucess,失败时调用err
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data) //渲染用户的头像
        },
        // 不论成功还是失败,最终都会调用complete回调函数
        // complete: function(res) {
        //     // // console.log('执行了complete回调函数')
        //     // // console.log(res)
        //     //     // 在complete回调函数中, 可以使用res.responseJSON服务器响应回来的数据
        //     // if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //     //     // 1.强制清空本地存储中的token
        //     //     localStorage.removeItem('token')
        //     //         // 2.重新跳转到登录页面
        //     //     location.href = '/login.html'
        //     // }
        // }
    })
}
// 渲染用户的头像
function renderAvatar(user) {
    let name = user.nickname || user.username //获取用户的名称
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name) //设置欢迎的文本
        // 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片图像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}