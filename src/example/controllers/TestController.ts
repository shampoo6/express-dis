import { get, middleware, post, router } from '../../index';

@router('/test')
export default class TestController {
  now = new Date();

  @middleware
  public async m1(req, res, next) {
    // console.log('middleware1');
    next();
  }

  @get('/t')
  public async t(req, res) {
    res.json({ msg: 'ok t' });
  }

  @middleware
  public async m2(req, res, next) {
    // console.log('middleware2');
    next();
  }

  @get('/f')
  public async f(req, res) {
    res.json({ msg: 'ok f' });
  }

  @post('/upload')
  public async upload(req, res) {
    // console.log(req.files);
    res.json(req.files);
  }
}
