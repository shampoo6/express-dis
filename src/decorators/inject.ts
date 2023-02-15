import ObjectManager from '../core/ObjectManager';
import {GlobalKey} from '../constants/GlobalKey';

export default function inject(className: string) {
    return (target: any, propName: string) => {
        const key = `${target.constructor.name}.${propName}`;
        global[GlobalKey.InjectMap].set(key, () => {
            ObjectManager.getInstance().get(target.constructor.name)[propName] = ObjectManager.getInstance().get(className);
        });
    };
}
