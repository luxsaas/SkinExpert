import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductMenu from "./ProductMenu";

const Community=()=>{
    const [posts,setPosts]=useState(null);
    const [formData,setFormData]=useState({});
    
    useEffect(() => {
        fetch("/posts")
          .then((res) => res.json())
          .then((data) => {
            console.log(data.data);
          });
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
        .catch((error)=>{
            window.alert(error);
        })
    }
    return(
        <Container>
            <ProductMenu/>
            <div>
                <StyledForm >
                <h1>Community Page</h1>
                <StyledDiv>
                    <StyledImg></StyledImg>
                    <StyledInput onChange={(e)=>{handleChangeForm(e.target.id,e.target.value)}} id="status"
                    placeholder="What's Happening ?"
                    type="text"></StyledInput>
                </StyledDiv>
                <SubmitDiv>
                    <StyledP></StyledP>
                    <SubmitButton onClick={handleClick} >Send</SubmitButton>
                </SubmitDiv>
                </StyledForm>
                <StyledDiv>
                {posts&&Object.values(posts).map((post)=>{
                        return(
                            <div>
                                <p>{post.status}</p>
                            </div>
                        )
                    })}
                </StyledDiv>

            </div>
        </Container>
    )
}
const Container=styled.div`
display:flex;
flex-direction: row;
`
const StyledP=styled.p`

`
const StyledForm=styled.form`
border:1px solid black;
`
const SubmitButton=styled.button`
border-radius:10px;
background-color: aliceblue;
color:black;
font-weight: bold;
border-color: blue;
height:20px;
margin-left:10px;
margin-right:10px;

&:disabled{
    background-color: aliceblue;
    border-color: blue;
}
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

border-color:black;
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
export default Community;