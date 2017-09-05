import os from 'object-serialize'

export default new class {
    constructor() {
        this.map = new Map();
    }
    create(name, methods) {
        return this.context[name] = new this.DB(methods);
    }
    set(key, value) {
        this.map.set(key, value);
    }
    get(key) {
        return this.map.get(key);
    }
    context() {
        this.link = data => this.context.Data = data;
    }
    DB(methods) {
        for (let method in methods) {
            const config = methods[method];
            this[method] = query => new Request(config, query, method);
        }
    }
}

function Request(config,body) {

    let {url,method = ''} = config;

    const needReply = url.indexOf('{');
    if(needReply !== -1){
        url = url.substring(0,needReply)+body[url.substring(needReply+1,url.length-1)]
    }

    const option = {
      // credentials: 'same-origin',
      credentials: 'include',
      mode:'cors',
      method,
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    if(method.toUpperCase() !== 'GET'){
      Object.assign(option, {
          body: os(body)
      })
    }else{
      url += `?${os(body)}`
    }

    return new Promise((resolve, reject) => {
        const Head = __PRO__?'/ttl-web-system':'/ttl-web-systemttl-web-system';//__PRO__===true 表示线上环境
        fetch(Head+url,option).then(data => data.json()).then(({code,data,...err}) => {
            if (code == 0) {
                /*成功*/
                resolve(data)
            } else {
                /*错误信息*/
                reject({
                  code,data,...err
                })
            }
        }).catch(()=>reject({
          errorMsg:'请求失败',
        }))
    })
}
