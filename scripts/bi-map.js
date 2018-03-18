let map = new Map();

class BiMap{
    constructor(){
        this.kToV = new Map();
        this.vToK = new Map();
    }

    add(key,value){
        this.kToV.set(key,value);
        this.vToK.set(value,key);
    }

    getForward(key){
        return this.kToV.get(key);
    }

    getBackward(value){
        return this.vToK.get(value);
    }
}


class MultiMap{
    constructor(){
        this.map = new Map();
    }

    /**
     * 
     * @param {*} key 
     * @param {*} value 
     */
    put(key,value){
        // if key is a new key, wrap value in a new array
        if(!this.map.has(key)){
            this.map.set(key,[value]);
        }
        // else add value to existing array at key
        else{
            this.map.get(key).push(value);
        }
    }

    get(key){
        return this.map.get(key);
    }

    /**
     * 
     * @param {*} key 
     * @param {*} value 
     */
    removeValueAtKey(key, value){
        if(this.map.has(key)){
            let values = this.map.get(key);
            let index = values.indexOf(value);
            if(index > -1){
                values.splice(index,1);
            }
        }
    }
}

class MultiBiMap{
    constructor(){
        this.kToV = new MultiMap();
    }

    put(key,value){
        this.kToV.put(key,value);
        this.kToV.put(value,key);
    }

    get(key){
        return this.kToV.get(key);
    }



}

module.exports.BiMap = BiMap;
module.exports.MultiMap = MultiMap;
module.exports.MultiBiMap = MultiBiMap;