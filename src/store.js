const STORE_KEY = 'user';
export default {
    fetch(){
        return JSON.parse(window.localStorage.getItem(STORE_KEY || '[]'));
        // return JSON.parse(localStorage[STORE_KEY])
    },
    save(items){
        window.localStorage.setItem(STORE_KEY,JSON.stringify(items));
        // localStorage[STORE_KEY] = JSON.stringify(items);
    }
}
