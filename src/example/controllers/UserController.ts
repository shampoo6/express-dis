import { get, inject, router } from '../../index';

@router('/user')
export default class UserController {
  @inject('TestController')
  testController;

  @inject('TestProvider')
  testProvider;

  @get('/readInject')
  public async readInject(req, res) {
    // console.log(this.testController);
    // console.log(this.testProvider);
    res.json({ testController: this.testController, testProvider: this.testProvider });
  }
}
