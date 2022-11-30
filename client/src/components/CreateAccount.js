import { useState } from "react";
import styled from "styled-components";

const CreateAnAccount =(name)=>{
    const [step1,setStep1]=useState(false);
    const [step2,setStep2]=useState(false);
    const [step3,setStep3]=useState(false);

    const [formState, setFormState] = useState({
        formData: {
            name:name.name,
            skinType: '',
            concerns: [],
            typeOfProducts:[],
        }
    })
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
        .catch((error)=>{
            window.alert(error);
        })
        window.location.reload();
    }
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

    return(
        <Container>
            <h2>Create an Account</h2>
            <Step1>
                <h3>Step 1</h3>
                <p>What is your skin type?</p>
                <InputDiv><input name="skinType"type="radio"value="Oily" onChange={handleInput}  ></input><label>Oily</label> </InputDiv>
                <InputDiv><input name="skinType"type="radio" value="Dry" onChange={handleInput}  ></input><label>Dry</label> </InputDiv>
                <InputDiv><input name="skinType"type="radio"value="Combination" onChange={handleInput}  ></input><label>Combination</label> </InputDiv>
                <InputDiv><input name="skinType"type="radio"value="Normal" onChange={handleInput}  ></input><label>Normal</label> </InputDiv>
            </Step1>
            <Step2>
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
            </Step2>
            <Step3>
                <h3>Step 3</h3>
                <p>What type of products are you interested in?</p>
                <InputDiv><input name="typeOfProducts"type="checkbox"value="Moisturizers" onChange={handleInput}  ></input><label>Moisturizers</label> </InputDiv>
                <InputDiv><input name="typeOfProducts"type="checkbox"value="Cleansers" onChange={handleInput} ></input><label>Cleansers</label> </InputDiv>
                <InputDiv><input name="typeOfProducts"type="checkbox"value="Treatments" onChange={handleInput} ></input><label>Treatments</label> </InputDiv>
                <InputDiv><input name="typeOfProducts"type="checkbox"value="Mask" onChange={handleInput} ></input><label>Mask</label> </InputDiv>
                <InputDiv><input name="typeOfProducts"type="checkbox"value="Eye Care" onChange={handleInput} ></input><label>Eye Care</label> </InputDiv>
                <InputDiv><input name="typeOfProducts"type="checkbox"value="Lip Care" onChange={handleInput} ></input><label>Lip Care</label> </InputDiv>
                <InputDiv><input name="typeOfProducts"type="checkbox"value="Sun Care"onChange={handleInput} ></input><label>Sun Care</label> </InputDiv>
                <InputDiv><input name="typeOfProducts"type="checkbox"value="Redness"onChange={handleInput} ></input><label>Redness</label> </InputDiv>
            </Step3>
            <button onClick={handleSubmit}>Submit</button>
        </Container>
    )
}
const Container =styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const InputDiv =styled.div`
display: flex;
flex-direction: row;
`
const Step1 =styled.div`

`
const Step2 =styled.div`

`
const Step3 =styled.div`

`
export default CreateAnAccount;