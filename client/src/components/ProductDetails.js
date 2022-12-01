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
    console.log(activeUser);
    return(
        <Container>
            <ProductMenu/>
            
            {item&&<StyledDiv>
                <div>{isRecommended?<p>Recommended</p>:null}
                    <img src={item[0].img_src}></img>
                </div>
                <div>
                    <p>{item[0].name}</p>
                    <p>{item[0].brand}</p>
                    <p>{item[0].raw_text}</p>
                    <p>{item[0].hearts}</p>
                    <p>{item[0].skin_concerns}</p>
                    <p>{item[0].skin_type}</p>
                </div>
            </StyledDiv>}
        </Container>
    )
}
const Container =styled.div`
display: flex;
flex-direction: row;
`
const StyledDiv=styled.div`
display: flex;
flex-direction: row;
`
export default ProductDetails;