import { useEffect,useState } from "react";
import styled from "styled-components";
import {useParams} from 'react-router-dom';
const ConcernFilter=({item})=>{
    const [descrip,setDescrip]=useState([]);
    const {concern}=useParams();

    useEffect(()=>{
        
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '86c308ee4bmsh483020311c2e30ap175feejsn84950bda0d0f',
                'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
            }
        };
        
        fetch(`https://sephora.p.rapidapi.com/products/detail?productId=${item.productId}&preferedSku=${item.currentSku.skuId}`, options)
            .then(response => response.json())
            .then(response =>{
                const filter= (response.shortDescription).split("Skincare Concerns:</b> ");
                const filter2=filter[1].split("<br><br><b>Highlighted Ingredients:");
                const array=filter2[0].split(" ");
                setDescrip(array);
            })
            .catch(err => console.error(err));
    },[])

    return(
        <div>
            {(descrip)&&<Item href={`/products/detail/${item.productId}/${item.currentSku.skuId}`}>
                {(descrip).includes(`${concern},`||(descrip).includes(`${concern}`))&&<ItemDiv>
                    <StyledImg src={item.heroImage}></StyledImg>
                    <StyledTitle>{item.displayName}</StyledTitle>
                    <StyledBrand>{item.brandName}</StyledBrand>
                    <StyledRating>Rating: {item.rating}</StyledRating>
                </ItemDiv>}
            </Item>}
        </div>
    )
}
const ItemDiv=styled.div`
border:1px solid black;
width: 200px;
height:200px;
display:flex;
flex-direction: column;
align-items: center;
padding:10px;
color:black;
`
const StyledImg=styled.img`
width:100px;
height:100px;
`
const StyledTitle=styled.p`

text-align: center;
margin-bottom:0;
padding:0;
`
const StyledBrand=styled.p`
font-weight: bold;
margin:0;
padding:0;
`
const StyledRating =styled.p`
margin:0;
padding:0;
`
const Item=styled.a`
text-decoration: none;
`
export default ConcernFilter;