import os from 'object-serialize'

export default new class {
    constructor() {
        this.map = new Map();
    }
    create(name, methods) {
        return this.context[name] = this.DB(methods);
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
        return this;
    }
}

function Request(config,body) {

    let {url,method = ''} = config;
    const option = {
      credentials: 'same-origin',
    };
    if(method.toUpperCase() !== 'Get'){
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

    var _url = "https://www.tongtongli.com/ttl-web-system";
    return new Promise((resolve, reject) => {
        fetch(_url + url).then(data => data.json()).then(({success,data,...err}) => {
            if (success) {
                resolve(data)
            } else {
                reject({
                  success,data,...err
                })
            }
        }).catch(()=>reject({
          errorMsg:'请求失败',
        }))
    })
}
