/*esling-disable*/
import logo from './logo.svg';
import './css/App.css';
import './css/main.scss';
import React, { useState,useContext, useEffect,lazy,Suspense,memo } from 'react';
import { Container,FormControl,Button,Form } from 'react-bootstrap';
/*원조 부트스트랩 용량이 더 크다. - link html에 넣어주기*/
import data from './data/data.js';
import {Link, Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';
import NavMenu from './components/NavMenu'
import Main from './components/Main'
import Cart from './components/Cart';
//import Detail from './Detail';
let Detail = lazy(()=> import('./components/Detail') )


let leftCon = React.createContext();

export { leftCon };

function App() {

    let [shoes,setShoes] = useState(data);
    let shoesArr = [...shoes];
    let [loading,setLoading] = useState(false);
    let [left,setLeft] = useState([10,11,12]);

  return (
   <div className="App">

    <NavMenu/>
    <Switch>
         <Route exact path="/">
            <leftCon.Provider value={left}>
                <Main shoes={shoes} setLoading={setLoading} setShoes={setShoes} shoesArr={shoesArr} loading={loading}/>
            </leftCon.Provider>
         </Route>

         <Route path="/detail/:id" >
            <leftCon.Provider value={left}>
               <Suspense fallback={<div>로딩중입니다.</div>}>
                <Detail shoes = {shoes} left={left} setLeft={setLeft}/>
               </Suspense>
            </leftCon.Provider>
         </Route>

         <Route path="/abc" component={Modal}></Route>
         <Route path="/cart">
            <Cart/>
         </Route>
         <Route path="/:id">
            <div>아무거나 Link로 적으면 이페이지를 보여줌</div>
         </Route>
     </Switch>


   </div>
  );
}




function Modal(){

    return(
        <div>
            <p>ABC페이지</p>
        </div>
    );

}





export default App;
