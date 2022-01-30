import '../css/main.scss';
import React, { useState,useContext, useEffect,lazy,Suspense,memo } from 'react';
import { Container,FormControl,Button,Form } from 'react-bootstrap';
import data from '../data/data.js';
import {Link, Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';
import { leftCon } from '../App'


function Device(props) {

    let left = useContext(leftCon);
    let history = useHistory();
    console.log(history)
    return(
            <div className="col-md-4" onClick = {()=> { history.push("/detail/"+props.shoes[props.idx].id)}}>
               <p/>
               <img src= {
                    props.shoes[props.idx].img === undefined
                    ? null
                    : require('../img/' + props.shoes[props.idx].img)

               }></img>
               <h2>{props.shoes[props.idx].title}</h2>
               <p>{props.shoes[props.idx].price}</p>
               <p>재고: {left[props.idx]}개</p>
            </div>
    );
}

export default Device