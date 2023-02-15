import {Router} from "express";
import expressAsyncHandler from "express-async-handler";
import ObjectManager from "../core/ObjectManager";
import {GlobalKey} from "../constants/GlobalKey";
import App from "../core/App";

export default function router(url: string) {
    return function <T extends { new(...args: any[]): object }>(con: T) {
        const router = Router()
        const ins = new con()
        const routerParams = global[GlobalKey.RouterUrlAndCallback]
        if (routerParams) {
            const getRouterParams = routerParams[GlobalKey.Get]
            const postRouterParams = routerParams[GlobalKey.Post]
            for (const key in getRouterParams) {
                router.get(getRouterParams[key].url, expressAsyncHandler(getRouterParams[key].callback.bind(ins)))
            }
            for (const key in postRouterParams) {
                router.post(postRouterParams[key].url, expressAsyncHandler(postRouterParams[key].callback.bind(ins)))
            }
        }
        ObjectManager.getInstance().put(con.name, ins)
        App.ins.e.use(url, router)
        return con
    }
}