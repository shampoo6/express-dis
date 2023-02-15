import {GlobalKey} from "../constants/GlobalKey";

export default function post(url: string) {
    return function (target: { [key: string]: any }, fnName: string, descriptor: PropertyDescriptor) {
        const callback = descriptor.value
        global[GlobalKey.RouterUrlAndCallback][GlobalKey.Post][fnName] = {url, callback}
    }
}