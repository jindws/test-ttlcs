import DBF from './dbFactory'

export default DBF.context


DBF.create('Test', {
    list: {
        url       : '/api/test/list',
        method    :'delete',
    },
});


DBF.create('HidePermission', {
    applyIpWhiteList: {
        url       : 'HidePermission/applyIpWhiteList',
        method    : 'POST'
    },
    mainpage: {
        url       : 'HidePermission/mainpage',
        method    : 'GET'
    },
    signIn: {
        url       : 'HidePermission/signIn',
        method    : 'GET'
    },
    signOn: {
        url       : 'HidePermission/signOn',
        method    : 'DELETE'
    }
});

DBF.create('OperateLog', {
    list: {
        url       : 'OperateLog',
        method    : 'GET'
    }
});