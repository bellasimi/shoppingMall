import '../css/main.scss';
import React, { useState,useContext, useEffect,lazy,Suspense,memo } from 'react';
import { Container,FormControl,Button,Form } from 'react-bootstrap';
import data from '../data/data.js';
import {Link, Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';
import Device from './Device'
import Loading from './Loading'


function Main(props){

    return(
      <div>
                 <header>
                   <h1> SHOPPING</h1>
                   <p>
                     GET IT! BUT IT!
                   </p>
                   <p>
                   </p>
                 </header>

                 <div className="container">
                     <div className="row">
                         {
                             props.shoes.map((each,idx) => {
                                 return(
                                         <Device each={each} shoes={props.shoes} idx={idx} key={idx} />
                                 )
                             })

                         }

                     </div>
                 </div>

                 { props.loading==true
                     ? <Loading/>
                     : null
                 }
                  <button className="btn btn-danger" onClick={()=>{
                     props.setLoading(true);
                     axios.get('https://codingapple1.github.io/shop/data2.json')
                     .then((result)=>{
                        props.setLoading(false);
                        props.shoesArr.push(...result.data);
                        console.log(props.shoesArr);

                      props.setShoes( props.shoesArr);
                     })
                     .catch(()=>{
                        props.setLoading(false);
                     alert("실패")});

                  }}>더보기</button>
            </div>
    )
}

export default Main