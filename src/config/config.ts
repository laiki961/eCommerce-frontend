import devConfig from "./devConfig";
import prodConfig from "./prodConfig";

export default function config(){
    if(process.env.NODE_ENV === 'production'){
        return prodConfig;
    }else{
        return devConfig;
    }
}