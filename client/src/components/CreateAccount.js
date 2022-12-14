import { useState } from "react";
import {useAuth0} from "@auth0/auth0-react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom"
const CreateAnAccount =()=>{
    const [step1,setStep1]=useState(true);
    const [step2,setStep2]=useState(false);
    const [step3,setStep3]=useState(false);
    const navigate=useNavigate();
    const {user,isAuthenticated, isLoading}=useAuth0(); 
    const [formState, setFormState] = useState({
        formData: {
            name:user.name,
            skinType: '',
            concerns: [],
            typeOfProducts:[],
        }
    })
    //creates an account
    const handleSubmit=()=>{
        fetch("/users",{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formState.formData)
        })
        .then(res=>res.json())
        .then((data)=>{
        })
        // .catch((error)=>{
        //     window.alert(error);
        // })
        navigate("/home");
        window.location.reload();
    }

    //updates form when inputs gets updated
    const handleInput = (e) => {
        const field = e.target.name;
        const val = e.target.value;
        const temp = {...formState}
        if(field=="concerns"|| field=="typeOfProducts"){
            temp.formData[field].push(val);
        }
        else{
        temp.formData[field] = val
        setFormState(temp)
        }
    }
    //Removes step1 and displays step2
    const handleToggle1=()=>{
        setStep1(false);
        setStep2(true);
    }
    //Removes step2 and displays step3
    const handleToggle2=()=>{
        setStep2(false);
        setStep3(true);
    }
    return(
        <Container>
            <StyledDiv>
                
                <h2>Create an Account</h2>
                <Steps style={{display:step1?"block":"none"}}>
                    <h3>Step 1</h3>
                    <p>What is your skin type?</p>
                    <InputDiv><input name="skinType"type="radio"value="Oily" onChange={handleInput}  ></input><label>Oily</label> </InputDiv>
                    <InputDiv><input name="skinType"type="radio" value="Dry" onChange={handleInput}  ></input><label>Dry</label> </InputDiv>
                    <InputDiv><input name="skinType"type="radio"value="Combination" onChange={handleInput}  ></input><label>Combination</label> </InputDiv>
                    <InputDiv><input name="skinType"type="radio"value="Normal" onChange={handleInput}  ></input><label>Normal</label> </InputDiv>
                    <StyledButton onClick={handleToggle1}>Next</StyledButton>
                </Steps>
                <Steps style={{display:step2?"block":"none"}}>
                    <h3>Step 2</h3>
                    <p>What are your skin concerns?</p>
                    <InputDiv><input name="concerns"type="checkbox"value="Acne" onChange={handleInput}  ></input><label>Acne</label> </InputDiv>
                    <InputDiv><input name="concerns"type="checkbox"value="Pores" onChange={handleInput}  ></input><label>Pores</label> </InputDiv>
                    <InputDiv><input name="concerns"type="checkbox"value="Signs of Aging" onChange={handleInput}  ></input><label>Signs of Aging</label> </InputDiv>
                    <InputDiv><input name="concerns"type="checkbox"value="Dark Spots" onChange={handleInput}  ></input><label>Dark Spots</label> </InputDiv>
                    <InputDiv><input name="concerns"type="checkbox"value="Fine Lines and Wrinkles" onChange={handleInput}  ></input><label>Fine Lines and Wrinkles</label> </InputDiv>
                    <InputDiv><input name="concerns"type="checkbox"value="Dullness" onChange={handleInput}  ></input><label>Dullness</label> </InputDiv>
                    <InputDiv><input name="concerns"type="checkbox"value="Dark Circles"onChange={handleInput}  ></input><label>Dark Circles</label> </InputDiv>
                    <InputDiv><input name="concerns"type="checkbox"value="Redness" onChange={handleInput}  ></input><label>Redness</label> </InputDiv>
                    <StyledButton onClick={handleToggle2}>Next</StyledButton>
                </Steps>
                <Steps style={{display:step3?"block":"none"}}>
                    <h3>Step 3</h3>
                    <p>What type of products are you interested in?</p>
                    <InputDiv><input name="typeOfProducts"type="checkbox"value="Moisturizers" onChange={handleInput}  ></input><label>Moisturizers</label> </InputDiv>
                    <InputDiv><input name="typeOfProducts"type="checkbox"value="Cleansers" onChange={handleInput} ></input><label>Cleansers</label> </InputDiv>
                    <InputDiv><input name="typeOfProducts"type="checkbox"value="Treatments" onChange={handleInput} ></input><label>Treatments</label> </InputDiv>
                    <InputDiv><input name="typeOfProducts"type="checkbox"value="Mask" onChange={handleInput} ></input><label>Mask</label> </InputDiv>
                    <InputDiv><input name="typeOfProducts"type="checkbox"value="Eye Care" onChange={handleInput} ></input><label>Eye Care</label> </InputDiv>
                    <InputDiv><input name="typeOfProducts"type="checkbox"value="Lip Care" onChange={handleInput} ></input><label>Lip Care</label> </InputDiv>
                    <InputDiv><input name="typeOfProducts"type="checkbox"value="Sun Care"onChange={handleInput} ></input><label>Sun Care</label> </InputDiv>
                    <StyledButton onClick={handleSubmit}>Create Account</StyledButton>
                </Steps>
            </StyledDiv>
        </Container>
    )
}
const Container =styled.div`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
height:800px;
width:100%;
background-color: #edf2fb;
`
const StyledDiv =styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: -150px;
`
const InputDiv =styled.div`
display: flex;
flex-direction: row;
`
const Steps =styled.div`
border: 3px solid #abc4ff;
width:400px;
height:300px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding-left: 50px;
padding-right: 100px;
padding-top: 20px;
`
const StyledButton=styled.button`
border: 3px solid #abc4ff;
border-radius:10px;
margin-left:380px;
padding:10px;
`
export default CreateAnAccount;