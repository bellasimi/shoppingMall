import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createStore,combineReducers } from 'redux';
import { Provider } from 'react-redux';


let 기본값 = [
{id : 3, title : "애플", quan : 2 },
{id : 4, title : "애플2", quan : 1 },
{id : 5, title : "애플3", quan : 7 },
{
    id : 1,
    title : "아이폰",
    content : "high-end smartphone",
    price : "1,200,000원",
    img : "iphone.jpg",
     quan : 12
  }
];

/*  state가 될 변수 관리:삭제 */
function reducer(state = 기본값, 디스패치){
    let copy = [...state];

    if(디스패치.type === "+"){
        copy[디스패치.idx].quan ++;
        return copy

    }else if( 디스패치.type === "-"){
        if(copy[디스패치.idx].quan !==0){
            copy[디스패치.idx].quan--;
        }

        return copy

    }else if(디스패치.type==="addGoods"){
        //let idExist = copy.some(e => e.id === 디스패치.payload.id);
        let idx = copy.findIndex(e => e.id === 디스패치.payload.id);
        //if(idExist){
        if(idx>=0){
            //let idx = copy.map(e => e.id).indexOf(디스패치.payload.id);
            //copy.findIndex(e => e.id === 디스패치.payload.id);
            copy[idx].quan++;
        }else{
             copy.push(디스패치.payload);
        }
        return copy;

    }else{
        return state
    }
}




/* 매진 임박*/

function reducer2(state = true,디스패치) {
    if(디스패치.type === "off"){
        return false;
    }else if(디스패치.type === "on"){
        return true;
    }else {
        return state;
    }
}

/* createStore() 거치면 변수가 state화 */
let store = createStore(combineReducers({reducer,reducer2}));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename = { process.env.PUBLIC_URL }>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
