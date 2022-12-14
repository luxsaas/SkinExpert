import styled from "styled-components";
import CreateAnAccount from "./CreateAccount";
import FavoriteBin from "./FavoriteBin";
import DislikeBin from "./DislikeBin";
import CurrentRoutine from "./CurrentRoutine";
import {useNavigate} from 'react-router-dom';
const Profile=({users, user})=>{
    const navigate =useNavigate();
    //when edit profile button is click , it navigates user to edit profile page
    const handleClick=()=>{
        navigate("/edit-profile");
    }
    return(
        <MainContainer>
            {(user.name!=undefined)?<div>
                <ProfileDiv>
                    <div>
                        <StyledImg src={user.picture} alt={user.name}></StyledImg>
                    </div>
                    <div>
                        <Name>{user.name}</Name>
                        <p>Skin Type: {users.skinType}</p>
                        <StyledRow>
                            <StyledP>Concerns:</StyledP> 
                            {Object.values(users.concerns).map((concern)=>{return <StyledP>{`${concern},`}</StyledP>})}
                        </StyledRow>
                        <StyledRow>
                            <StyledP>Interested Products: </StyledP> 
                            {Object.values(users.typeOfProducts).map((type)=>{return <StyledP>{`${type},`}</StyledP>})}
                        </StyledRow>
                        <StyledButton onClick={handleClick}>Edit Profile</StyledButton>
                    </div>
                </ProfileDiv>
            <Styledh3>Current Routine</Styledh3>
            <CurrentRoutineDiv>
                <CurrentRoutine/>
            </CurrentRoutineDiv>
            <Container >
                <FavoriteBin />
                <DislikeBin/>
            </Container>
        </div>:<CreateAnAccount/>}
    </MainContainer>
    )
}
const MainContainer=styled.div`
margin-left:50px;
background-color: #edf2fb;
`
const Container =styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
background-color: #edf2fb;

`
const StyledRow=styled.div`
display: flex;
flex-direction: row;
`
const StyledP=styled.p`
margin-right: 5px;
`
const CurrentRoutineDiv =styled.div`
height:250px;
width:1100px;
border:5px solid #abc4ff;
display:flex;
flex-direction:row;
justify-content:start;
align-items:center;

`
const ProfileDiv=styled.div`
display: flex;
flex-direction: row;
padding-top: 10px;
padding-bottom: 30px;
border-bottom: 2px solid #abc4ff;
border-top: 2px solid #abc4ff;
padding-left:60px;
`
const StyledImg=styled.img`
border-radius: 50%;
width: 100px;
height: 100px;
margin-top:60px;
margin-right: 40px;
`
const Name = styled.h2`
`
const Styledh3=styled.h3`
font-family: serif;
`
const StyledButton=styled.button`
margin-left:600px;
height:30px;
width:100px;
border: 3px solid #abc4ff;
border-radius:10px;
font-family: serif;
`
export default Profile;