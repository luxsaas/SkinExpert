import styled from "styled-components";
import LoginButton from "./LoginButton";
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom"
import face from "./face.png"
const FrontPage =()=>{
    const {user,isAuthenticated, isLoading}=useAuth0();
    const navigate =useNavigate();
    // if(isLoading){
    //     return<div>Loading...</div>;
    // }
    return(
        <Container>
            {(isAuthenticated&&!isLoading)?(navigate("/home"))
            :(<StyledDiv>
                <SubDiv>
                    <Title>SkinExpert</Title>
                    <SubTitle>A way to track your skincare routine</SubTitle>
                    <LoginButton/>
                </SubDiv>
                <StyledImg src={face}></StyledImg>
            </StyledDiv>)}
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
padding-left: 150px;

`
const Title= styled.h1`
font-size: 100px;
font-family: serif;
color: #abc4ff;
margin: 0;
`
const SubTitle=styled.p`
font-size: 20px;
color: #757bc8;
`
const StyledDiv=styled.div`
display: flex;
flex-direction: row;
`
const StyledImg=styled.img`
margin-left: -100px;

`
const SubDiv=styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding-top: 50px;
`
export default FrontPage;