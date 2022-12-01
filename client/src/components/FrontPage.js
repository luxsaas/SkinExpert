import styled from "styled-components";
import LoginButton from "./LoginButton";
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom"
import GlobalStyles from "./GlobalStyles";
const FrontPage =()=>{
    const {user,isAuthenticated, isLoading}=useAuth0();
    const navigate =useNavigate();
    if(isLoading){
        return<div>Loading...</div>;
    }
    return(
        <Container>
            {isAuthenticated?(navigate("/home"))
            :(<div>
                <Title>SkinExpert</Title>
                <LoginButton/>
            </div>)}
        </Container>
    )
}
const Container =styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #edf2fb;
height: 100vh;

`

const Title= styled.h1`
font-size: 100px;
font-family: serif;
color: #abc4ff;
`
export default FrontPage;