import { useEffect, useState } from "react";
import styled from "styled-components";

const ProductMenuItem=()=>{
    const [items,setItems]=useState(null);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '86c308ee4bmsh483020311c2e30ap175feejsn84950bda0d0f',
                'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
            }
        };
        
        fetch('https://sephora.p.rapidapi.com/products/list?categoryId=cat150006&pageSize=60&currentPage=1', options)
            .then(response => response.json())
            .then(response => setItems(response.products))
            .catch(err => console.error(err));
    }, []);

    console.log(items);
    return(
        <Container>
            {items&&Object.values(items).map((item)=>{
                return (
                    <Item href={`/products/detail/${item.productId}/${item.currentSku.skuId}`}>
                        <ItemDiv>
                            <StyledImg src={item.heroImage}></StyledImg>
                            <StyledTitle>{item.displayName}</StyledTitle>
                            <StyledBrand>{item.brandName}</StyledBrand>
                            <StyledRating>Rating: {item.rating}</StyledRating>
                        </ItemDiv>
                    </Item>
                )
            })
        }
        </Container>
    )
}

const Container =styled.div`
display: grid;
grid-template-columns: auto auto auto ;

`
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

export default ProductMenuItem;

