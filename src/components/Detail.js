import React, { useState,useEffect,useContext } from 'react';
import { useHistory,useParams } from 'react-router-dom';
import styled,{ css } from 'styled-components';
import '../css/Detail.scss';
import { axios } from 'axios';
import { leftCon } from '../App.js';
import { CSSTransition } from 'react-transition-group';
import { Container,Navbar,Nav,NavDropdown,FormControl,Button,Form,CardGroup,Card} from 'react-bootstrap';
import { connect,useSelector,useDispatch } from 'react-redux';

let 새박스 = styled.h4`
    font-size: 30px;
    padding: 20px;
    ${ (props) => props.변화 && css`font-size: 100px;
        color: ${ (props) => props.색상 }
    `}

`;

let TabBox = styled.div`
    height: 400px;


`


function Detail(props){
    let dispatch = useDispatch();
    let goods = useSelector((state)=> state.reducer);
    let { id } = useParams();
    let history = useHistory();
    //let [alert,setAlert] = useState(document.querySelector('.my-alert2'));
    let [alert,setAlert] = useState(true);

    let seenArr = JSON.parse(localStorage.getItem('seen'));

    /*시작할 떄 한번 실행 */
    useEffect(()=>{

        if( seenArr === null){
            seenArr = [];
        }

        seenArr.push(id);
        seenArr = new Set(seenArr);
        seenArr = [...seenArr];

        localStorage.setItem('seen',JSON.stringify(seenArr));

    },[]);


    useEffect(()=>{
        let 타이머 = setTimeout(()=>{setAlert(false)},2000);
        return ()=>{clearTimeout(타이머)}
    },[alert]);

        /*return function 함수명(){
            //컴포넌트가 사라질 때 코드 실행 (언마운트시)
        }
         이거 아냐 위처럼 플래그 만들기로 껐다 켰다 해야됨
            let 타이머 =
            setTimeout(()=>{
               alert.setAttribute('style','visibility: hidden')
            },200)*/

    let [content,setContent] = useState("");
    let leftArr = [...props.left];
    let left = useContext(leftCon);
    let [tab,setTab] = useState(0);
    let [yesTab,setYesTab] = useState(false);

/*<input onChange={(e)=>{setContent(e.target.value)}}/>*/
    const order = ()=>{
         if(leftArr[id]>0){
             leftArr[id] -= 1;
             props.setLeft(leftArr);
          }
    }
    return(
        <div className="container">
              <새박스 색상 = 'red' 변화 = 'on' className="black">Detail</새박스>
              { alert===true
                    ? <div className="my-alert2" value="야호">
                        <p>재고가 얼마 남지 않았습니다!!</p>
                      </div>
                    : null
              }


              <div className="row">
                <div className="col-md-6">
                    <img src={require("../img/"+props.shoes[id].img)} width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                  <h4 className="pt-5">{props.shoes[id].title}</h4>
                  <p>{props.shoes[id].content}</p>
                  <p>{props.shoes[id].price}</p>
                  <p>재고: {left[id]}개</p>
                  <Left left={props.left} id={id}/>
                  <button className="btn btn-danger" onClick={order}>주문하기</button>
                  <button className="btn btn-danger" onClick={()=>{
                      dispatch({ type:"addGoods", payload: props.shoes[id] })
                      history.push("/cart")}
                  }>장바구니</button>
                  <button className="btn btn-danger" onClick={()=>{history.goBack()}}>주문취소</button>
                  <button className="btn btn-danger" onClick={()=>{history.push("/anywhere")}}>아무거나</button>
                </div>
              </div>

              <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                  <Nav.Link eventKey="link-0" onClick={()=>{setYesTab(false); setTab(0); }}>Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-1" onClick={()=>{setYesTab(false); setTab(1);}}>Option 2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-2" onClick={()=>{setYesTab(false); setTab(2);}}>Option 3</Nav.Link>
                </Nav.Item>
              </Nav>

               <CSSTransition in={yesTab} classNames="yesTab" timeout={500}>
                    <TabCont tab={tab} setYesTab={setYesTab}/>
               </CSSTransition>

                <p>최근 본 상품</p>
               <CardGroup>
                   { seenArr != null
                      ? seenArr.map((each,idx)=>{ return (
                        <Card key= {idx} onClick= {()=>{ history.push("/detail/"+each)}}>
                           <Card.Img variant="top" src= { require("../img/"+props.shoes[each].img)} />
                           <Card.Body>
                             <Card.Title>{props.shoes[each].title}</Card.Title>
                             <Card.Text>
                                {props.shoes[each].content}
                             </Card.Text>
                           </Card.Body>
                           <Card.Footer>
                             <small className="text-muted">
                                <button className="btn btn-danger" onClick={()=> {
                                   seenArr = seenArr.filter(e=> e !== each);
                                   localStorage.setItem('seen',JSON.stringify(seenArr));
                                }}>삭제</button>
                             </small>
                           </Card.Footer>
                         </Card>
                        )})
                      : null
                   }
               </CardGroup>


        </div>
    )

}

    function Left(props) {
        return (
            <p>재고 : {props.left[props.id]}개</p>

        )
    }

    function TabCont(props) {

        let [tabDiv,setTabDiv] = useState(
            { 0 : <TabBox>0탭의 내용입니다.</TabBox>,
              1 : <TabBox>1탭의 내용입니다.</TabBox>,
              2 : <TabBox>2탭의 내용입니다.</TabBox>
            }
        );

        useEffect(()=>{
            props.setYesTab(true);
        });

        return(
            <div>
                {
                    tabDiv[props.tab]
                }
            </div>
        )




/*        if(props.tab===0){
           return <div>0탭의 내용입니다.</div>
        }else if(props.tab===1){
           return <div>1탭의 내용입니다.</div>
        }else if(props.tab===2){
           return <div>2탭의 내용입니다.</div>
        }*/
    }//tabContent 종료료

/*   function detailRedux(state) {
        return{
            goods : state.reducer
        }
    }*/

//export default connect(detailRedux)(Detail);
export default Detail;
