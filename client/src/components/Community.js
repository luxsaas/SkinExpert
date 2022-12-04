import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductMenu from "./ProductMenu";
import {useAuth0} from "@auth0/auth0-react";
const Community=()=>{
    const {user,isAuthenticated, isLoading}=useAuth0(); 
    const [posts,setPosts]=useState(null);
    const [formData,setFormData]=useState({name:user.name});
    
    useEffect(() => {
        if(isAuthenticated){
        fetch(`/posts/${user.name}`)
          .then((res) => res.json())
          .then((data) => {
            setPosts(data.data);
          });
        }
      }, []);

    const handleChangeForm=(key,value)=>{
        setFormData({...formData,[key]:value})
        // console.log(key);
    }

    const handleClick=()=>{
            fetch(`/posts`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        })
        .then(res=>res.json())
        .then((data)=>{
        })
        // .catch((error)=>{
        //     window.alert(error);
        // })
    }
    return(
        <Container>
            <ProductMenu/>
            <SubContainer>
                <StyledForm >
                <h1>Community Page</h1>
                <StyledDiv>
                    <StyledImg></StyledImg>
                    <StyledInput onChange={(e)=>{handleChangeForm(e.target.id,e.target.value)}} id="status"
                    placeholder="What's Happening ?"
                    type="text"></StyledInput>
                </StyledDiv>
                <SubmitDiv>
                    <SubmitButton onClick={handleClick} >Send</SubmitButton>
                </SubmitDiv>
                </StyledForm>
                <div>
                {posts&&Object.values(posts).map((post)=>{
                        return(
                            <PostsDiv>
                                <StyledImg src={user.picture}></StyledImg>
                                <StyledP>{post.status}</StyledP>
                            </PostsDiv>
                        )
                    })}
                </div>

            </SubContainer>
        </Container>
    )
}


const Container=styled.div`
display:flex;
flex-direction: row;
background-color: #edf2fb;

`
const StyledP=styled.p`
margin-left:30px;
`
const SubContainer=styled.div`
padding-left:40px;
padding-top:20px;
`
const StyledForm=styled.form`
border: 3px solid #abc4ff;

`
const SubmitButton=styled.button`
border: 3px solid #abc4ff;
border-radius:10px;
color:black;
font-weight: bold;

margin-left:10px;
margin-right:10px;
padding:5px;

`

const SubmitDiv=styled.div`
display:flex;
flex-direction: row;
justify-content: end;
align-items: center;
padding-bottom:5px;
border-bottom:5px solid lightgrey;
`

const StyledInput=styled.input`
width:500px;
height:100px;
margin-top: 10px;
margin-bottom:10px;
margin-right:10px;

border-color:#abc4ff;
`

const StyledDiv=styled.div`
display:flex;
flex-direction: row;


`
const StyledImg=styled.img`
width:40px;
height:40px;
margin-top: 10px;
margin-bottom:10px;
margin-left:10px;
border-radius: 50%;

`
const PostsDiv=styled.div`
display:flex;
flex-direction:row;
align-items:center;
border: 3px solid #abc4ff;
height:150px;
`
export default Community;