import ObjectManager from '../core/ObjectManager';

export default function provider<T extends new (...args: any[]) => object>(con: T) {
  const ins = new con();
  ObjectManager.getInstance().put(con.name, ins);
  return con;
}
