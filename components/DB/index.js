import DBF from './dbFactory'

export default DBF.context


DBF.create('Test', {
    list: {
        url       : '/api/test/list',
        method    :'POST',
    },
});
