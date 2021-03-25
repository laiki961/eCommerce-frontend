import React from 'react';

export default class LocalStorageUtil{
    static setValue(key: string, value: any){
        localStorage.setItem(key, JSON.stringify(value)); //converts a JavaScript object or value to a JSON string
    }

    static getValue(key: string){
        const value = localStorage.getItem(key); //if getItem(key) == null, it will return "undefined"
        
        if(value && value !=='undefined'){
            return JSON.parse(value); //convert from string to object
        }

        return undefined;
    }


}