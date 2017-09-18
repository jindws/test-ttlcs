import DBF from './dbFactory'

// export default DBF.context
export default DBF

/*隐藏权限：登录，上传图片等*/
DBF.create('HidePermission', {
    /*申请ip白名单*/
    applyIpWhiteList: {
        url       : '/HidePermission/applyIpWhiteList',
        method    : 'POST'
    },
    /*修改密码*/
    changePassword: {
        url       : '/HidePermission/changePassword',
        method    : 'PUT'
    },
    /*主页，导航目录*/
    mainpage: {
        url       : '/HidePermission/mainpage',
        method    : 'GET'
    },
    /*修改手机*/
    resetPhone: {
        url       : '/HidePermission/resetPhone',
        method    : 'PUT'
    },
    /*登录*/
    signIn: {
        url       : '/HidePermission/signIn',
        method    : 'GET',
    },
    /*退出*/
    signOut: {
        url       : '/HidePermission/signOut',
        method    : 'DELETE'
    }
});
/*系统管理5：管理员操作日志*/
DBF.create('OperateLog', {
    list: {
        url       : '/OperateLog/list',
        method    : 'GET'
    }
});
/*系统管理1：管理组*/
DBF.create('AdminGroup', {
    /*增加管理组*/
    add: {
        url       : '/AdminGroup',
        method    : 'POST'
    },
    /*管理组列表*/
    list: {
        url       : '/AdminGroup/list',
        method    : 'GET'
    },
    /*删除管理组*/
    deleted: {
        url       : '/AdminGroup/{id}',
        method    : 'DELETE'
    },
    /*修改管理员组，管理员组重命名*/
    modify: {
        url       : '/AdminGroup/{id}',
        method    : 'PUT'
    },
    /*权限列表*/
    manage: {
        url       : '/AdminGroup/manage/{adminGroupId}',
        method    : 'GET'
    },
    /*修改权限*/
    modifyManage: {
        url       : '/AdminGroup/updatePermission/{adminGroupId}',
        method    : 'PUT'
    }
});
/*系统管理2：管理员*/
DBF.create('Admin', {
    /*增加管理员*/
    add: {
        url       : '/Admin',
        method    : 'POST'
    },
    /*子管理员列表*/
    list: {
        url       : '/Admin/list',
        method    : 'GET'
    },
    /*编辑管理员*/
    modify: {
        url       : '/Admin/{id}',
        method    : 'PUT'
    }
});
/*系统管理4：权限管理*/
DBF.create('Permission',{
    /*增加权限*/
    add: {
        url        : '/Permission',
        method     : 'POST'
    },
    /*权限列表*/
    list: {
        url        : '/Permission/list',
        method     : 'GET'
    },
    /*删除权限*/
    deleted: {
        url        : '/Permission/{id}',
        method     : 'DELETE'
    },
    /*修改权限*/
    modify: {
        url        : '/Permission/{id}',
        method     : 'PUT'
    }
});
/*系统管理3： Ip白名单*/
DBF.create('IpWhiteList',{
    /*Ip白名单列表*/
    list: {
        url        : '/IpWhiteList/list',
        method     : 'GET'
    },
    /*增加公共Ip白名单*/
    add: {
        url        : '/IpWhiteList',
        method     : 'POST'
    },
    /*审批白名单申请*/
    approve: {
        url        : '/IpWhiteList/auditing/{id}',
        method     : 'PUT'
    },
    /*删除公共Ip白名单*/
    deleted: {
        url        : '/IpWhiteList/{id}',
        method     : 'DELETE'
    },
    /*修改公共Ip白名单*/
    modify: {
        url        : '/IpWhiteList/{id}',
        method     : 'PUT'
    }
});
/*扩展管理1：定时任务*/
DBF.create('Schedule',{
    /*增加一条定时任务*/
    add: {
        url        : '/Schedule',
        method     : 'POST'
    },
    /*列表*/
    list: {
        url        : '/Schedule/list',
        method     : 'GET'
    },
    /*删除一条定时任务*/
    deleted: {
        url        : '/Schedule/{id}',
        method     : 'DELETE'
    },
    /*修改一条定时任务*/
    modify: {
        url         : '/Schedule/{id}',
        method      : 'PUT'
    }
});
/*系统管理6：系统配置管理*/
DBF.create('SystemConfig',{
    /*增加系统配置*/
    add: {
        url         : '/SystemConfig',
        method      : 'POST'
    },
    /*系统配置列表*/
    list: {
        url         : '/SystemConfig/list',
        method      : 'GET'
    },
    /*删除系统配置*/
    deleted: {
        url         : '/SystemConfig/{id}',
        method      : 'DELETE'
    },
    /*修改系统配置*/
    modify: {
        url         : '/SystemConfig/{id}',
        method      : 'PUT'
    }
});
/*运营管理1：消息模板管理*/
DBF.create('MessageModel',{
    /*增加消息模板*/
    add: {
        url         : '/MessageModel',
        method      : 'POST'
    },
    /*消息模板列表*/
    list: {
        url         : '/MessageModel/list',
        method      : 'GET'
    },
    /*根据用户id短信内容发送短信*/
    sendShortMessagesByContent: {
        url         : '/MessageModel/sendShortMessagesByContent',
        method      : 'POST'
    },
    /*根据用户id模板id发送短信*/
    sendShortMessagesById: {
        url         : '/MessageModel/sendShortMessagesById',
        method      : 'POST'
    },
    /*删除消息模板*/
    deleted: {
        url         : '/MessageModel/{id}',
        method      : 'DELETE'
    },
    /*修改休息模板*/
    modify: {
        url         : '/MessageModel/{id}',
        method      : 'PUT'
    }
});
/*运营管理2：消息管理*/
DBF.create('Message',{
    /*消息详情*/
    detail: {
        url         : '/Message/detail/{id}',
        method      : 'GET'
    },
    /*消息列表*/
    list: {
        url         : '/Message/list',
        method      : 'GET'
    }
});
