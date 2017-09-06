import DBF from './dbFactory'

export default DBF.context

DBF.create('HidePermission', {
    applyIpWhiteList: {
        url       : '/HidePermission/applyIpWhiteList',
        method    : 'POST'
    },
    mainpage: {
        url       : '/HidePermission/mainpage',
        method    : 'GET'
    },
    signIn: {
        url       : '/HidePermission/signIn',
        method    : 'GET',
    },
    signOut: {
        url       : '/HidePermission/signOut',
        method    : 'DELETE'
    }
});

DBF.create('OperateLog', {
    list: {
        url       : '/OperateLog',
        method    : 'GET'
    }
});
/*管理组*/
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
    /*修改管理员组，权限管理*/
    modify: {
        url       : '/AdminGroup/{id}?',
        method    : 'PUT'
    }
});
/*管理员*/
DBF.create('Admin', {
    Admin: {
        url       : '/Admin',
        method    : 'POST'
    },
    list: {
        url       : '/Admin/list',
        method    : 'GET'
    }
});
