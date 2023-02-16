import { GlobalKey } from '../constants/GlobalKey';

export default function get(url: string) {
  return (target: { [key: string]: any }, fnName: string, descriptor: PropertyDescriptor) => {
    const callback = descriptor.value;
    global[GlobalKey.RouterUrlAndCallback][GlobalKey.Get][fnName] = { url, callback };
  };
}
