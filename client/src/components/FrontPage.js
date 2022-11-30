import styled from "styled-components";
import LoginButton from "./LoginButton";
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom"
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
                <h1>SkinExpert</h1>
                <LoginButton/>
            </div>)}
        </Container>
    )
}
const Container =styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 30vh;
`
export default FrontPage;