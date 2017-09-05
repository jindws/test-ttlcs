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

DBF.create('AdminGroup', {
    AdminGroup: {
        url       : '/AdminGroup',
        method    : 'POST'
    },
    list: {
        url       : '/AdminGroup/list',
        method    : 'GET'
    },
    deleted: {
        url       : '/AdminGroup/{id}',
        method    : 'DELETE'
    }
});
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
