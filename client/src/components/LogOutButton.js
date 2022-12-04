import {useAuth0} from "@auth0/auth0-react";
import styled from "styled-components";

//log out button
const LogOutButton=()=>{
    const {logout} =useAuth0();
    return(
        <Container>
            <StyledButton onClick={()=>logout({returnTo:window.location.origin})}>Log Out</StyledButton>
        </Container>
    )

}
const Container =styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`
const StyledButton=styled.button`
margin-top:10px;
height:30px;
width:70px;
border: 3px solid #abc4ff;
border-radius:10px;
font-family: serif;
&:active{
    background-color: #abc4ff;
}
`
export default LogOutButton;