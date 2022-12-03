import styled from "styled-components";
import {TbLoader} from "react-icons/tb";


//Loading Page 
const LoadingPage=()=>{
    return (
    <Container>
        <StyledDiv><TbLoader size={60}/></StyledDiv>
    </Container>
    )
}
export default LoadingPage;

//--styling
const StyledDiv=styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: #abc4ff;
animation: StyledDiv 2s infinite ease;

@keyframes StyledDiv {
    0%{transform:rotate(0deg);}
    25%{transform:rotate(180deg);}
    50%{transform:rotate(180deg);}
    75%{transform:rotate(180deg);}
    100%{transform:rotate(180deg);}
}
`
const Container=styled.div`
display: flex;
flex-direction: row;
justify-content: center;
height:80vh;
background-color: #edf2fb;
`