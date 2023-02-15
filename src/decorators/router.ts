import {Router} from 'express';
import expressAsyncHandler from 'express-async-handler';
import ObjectManager from '../core/ObjectManager';
import {GlobalKey} from '../constants/GlobalKey';
import App from '../core/App';

export default function router(url: string) {
    return <T extends new (...args: any[]) => object>(con: T) => {
        const _router = Router();
        const ins = new con();
        const routerParams = global[GlobalKey.RouterUrlAndCallback];
        if (routerParams) {
            const getRouterParams = routerParams[GlobalKey.Get];
            const postRouterParams = routerParams[GlobalKey.Post];
            for (const key in getRouterParams) {
                if (getRouterParams[key])
                    _router.get(getRouterParams[key].url, expressAsyncHandler(getRouterParams[key].callback.bind(ins)));
            }
            for (const key in postRouterParams) {
                if (postRouterParams[key])
                    _router.post(postRouterParams[key].url, expressAsyncHandler(postRouterParams[key].callback.bind(ins)));
            }
        }
        ObjectManager.getInstance().put(con.name, ins);
        App.ins.e.use(url, _router);
        return con;
    };
}
