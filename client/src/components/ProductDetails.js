import {useParams} from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import ProductMenu from './ProductMenu';
import styled from "styled-components"
import { UserContext } from '../UserContext';

const ProductDetails=()=>{
    const {id}=useParams();
    const [item,setItem]=useState(null);
    const [recommended,setRecommended]=useState(false);
    const [user,setUser]=useState();
    const {activeUser,setActiveUser}=useContext(UserContext);
    const[description,setDescription]=useState(null);
    useEffect(() => {
        fetch(`/users/${activeUser}`)
        .then((res) => res.json())
        .then((data) => {
            setUser(data.data[0]);
        })
        
    }, [])
    useEffect(() => {
        fetch(`/product/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setItem(data.data);
            const split=(data.data[0].raw_text).split("Skin Type");
          setDescription(split[0]);
          });

      }, []);

    const isRecommended=()=>{
        let flag2=false;
        let key=null;
        let flag=Object.values(user.concerns).map((concern)=>{
            if(((item[0].skin_concerns).indexOf(concern)>=0)&&
            ((item[0].skin_type).indexOf(user.skinType)>=0)){
                return true
            }
            else{return false}
        })
            if(item[0].category=='cleanser'){
                key='Cleansers';
            }
            else if(item[0].category=='moisturizing-cream-oils-mists'){
                key='Moisturizers';
            }
            else if(item[0].category=='facial-treatments'){
                key='Treatments';
            }
            else if(item[0].category=='eye-treatment-dark-circle-treatment'){
                key='Eye Care';
            }
            else if(item[0].category=='facial-treatment-masks'){
                key='Mask';
            }
            else if(item[0].category =='sunscreen-sun-protection'){
                key='Sun Care';
            }
            else if(item[0].category=='lip-treatments'){
                key='Lip Care';
            }
            if((user.typeOfProducts).indexOf(key)>=0){
                flag2=true;
            }
        if(flag&&flag2){
            return true
        }else{
            return false
        }
    }

    return(
        <Container>
            <ProductMenu/>
            
            {(item&&description)&&<StyledDiv>
                <StyledSubDiv>
                    <img src={item[0].img_src}></img>
                </StyledSubDiv>
                <div>
                    <Title>{item[0].name}</Title>
                    <Brand>{item[0].brand}</Brand>
                    <p>{description}</p>
                    <p>Skin Concerns: {item[0].skin_concerns}</p>
                    <p>Skin Types: {item[0].skin_type}</p>
                    {isRecommended?<RecommendedH2>Recommended by SkinExpert</RecommendedH2>:null}
                </div>
            </StyledDiv>}
        </Container>
    )
}
const Container =styled.div`
display: flex;
flex-direction: row;
background-color: #edf2fb;
`
const StyledSubDiv=styled.div`
margin-right: 20px;
`
const StyledDiv=styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`
const RecommendedH2 =styled.h2`
color:#8093f1;
`
const Title=styled.h3`
`
const Brand=styled.h4`
`
export default ProductDetails;