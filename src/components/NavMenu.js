import { Container,Navbar,Nav,NavDropdown,FormControl,Button,Form } from 'react-bootstrap';
import {Link, Route, Switch, useHistory } from 'react-router-dom';

function NavMenu(){

  return(
    <Navbar bg="light" expand="lg">
       <Container fluid>
         <Navbar.Brand href="/shoppingMall">Shopping</Navbar.Brand>
         <Navbar.Toggle aria-controls="navbarScroll" />
         <Navbar.Collapse id="navbarScroll">
           <Nav
             className="me-auto my-2 my-lg-0"
             style={{ maxHeight: '100px' }}
             navbarScroll
           >
             <Nav.Link href="/shoppingMall">Home</Nav.Link>
             <Nav.Link  as = {Link} to="/detail/0">Detail</Nav.Link>
             <NavDropdown title="Link" id="navbarScrollingDropdown">
               <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
               <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
               <NavDropdown.Divider />
               <NavDropdown.Item href="#action5">
                 Something else here
               </NavDropdown.Item>
             </NavDropdown>
             <Nav.Link href="#" disabled>
               Link
             </Nav.Link>
           </Nav>
           <Form className="d-flex">
             <FormControl
               type="search"
               placeholder="Search"
               className="me-2"
               aria-label="Search"
             />
             <Button variant="outline-success">Search</Button>
           </Form>
         </Navbar.Collapse>
       </Container>
     </Navbar>
  )

}


export default NavMenu;