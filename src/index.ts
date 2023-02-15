import get from './decorators/get';
import inject from './decorators/inject';
import middleware from './decorators/middleware';
import post from './decorators/post';
import provider from './decorators/provider';
import router from './decorators/router';
import App from './core/App';

export { router, get, post, inject, provider, middleware };

export default App;
