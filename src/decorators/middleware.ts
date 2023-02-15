import App from '../core/App';
import expressAsyncHandler from 'express-async-handler';

export default function middleware(target: any, fnName: string, descriptor: PropertyDescriptor) {
  App.ins.e.use(expressAsyncHandler(descriptor.value));
}
