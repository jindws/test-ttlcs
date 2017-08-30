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
    const option = {
      credentials: 'same-origin',
      mode: 'cors'
    };
    if(method.toUpperCase() !== 'GET'){
      Object.assign(option, {
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/x-www-form-urlencoded"
          },
          method,
          body: os(body)
      })
    }else{
      url += `?${os(body)}`
    }

    return new Promise((resolve, reject) => {
        fetch("/ttl-web-system"+url).then(data => data.json()).then(({code,data,...err}) => {
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
