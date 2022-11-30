import styled from "styled-components";

const SignIn = ()=>{
    return(
        <Container>
            <p>Username: </p><input></input>
            <p>Password: </p><input></input>
        </Container>
    )
}

const Container =styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 30vh;
`
export default SignIn;