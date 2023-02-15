export default class ObjectManager {
    private static _ins: ObjectManager
    private objMap: Map<string, { [key: string]: any }>

    private constructor() {
        this.objMap = new Map<string, { [p: string]: any }>()

        ObjectManager._ins = this
    }

    public static getInstance(): ObjectManager {
        return ObjectManager._ins || new ObjectManager()
    }

    public put(key: string, obj: { [key: string]: any }) {
        this.objMap.set(key, obj)
    }

    public get(key: string) {
        return this.objMap.get(key)
    }
}