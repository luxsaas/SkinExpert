import styled from "styled-components";
import React from "react";
import {useAuth0} from "@auth0/auth0-react"

//Log In Button
const LoginButton=()=>{
    const {loginWithRedirect}=useAuth0();
    return(
        <Container>
            <StyledButton onClick={()=>loginWithRedirect()}>
                Log In
            </StyledButton>
        </Container>
    )
}
const Container=styled.div`
display: flex;
flex-direction: row;
justify-content: center;
`
const StyledButton=styled.button`
font-size: 20px;
border: 4px solid #abc4ff;
border-radius: 20px;
padding: 5px;
font-family: serif;
`
export default LoginButton;