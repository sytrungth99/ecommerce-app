import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { reducer } from './reducer';
const middleware = [thunk];
if(process.env.NODE_ENV!=='production'){
    middleware.push(createLogger());
}
export const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)