import styled from "styled-components";
import {useParams} from 'react-router-dom';
import ProductMenu from './ProductMenu';
import { useState, useEffect } from "react";
import Pagination from "./Pagination";

const ProductFilterPageB=()=>{

    const {skin_concerns} = useParams();
    const [items,setItems]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const [itemsPerPage,setItemsPerPage]=useState(32);

    useEffect(() => {
        fetch(`/products`)
          .then((res) => res.json())
          .then((data) => {
            setItems(data.data);
          });
      }, []);

      const idxOfLastItem=currentPage*itemsPerPage;
      const idxOfFirstItem=idxOfLastItem-itemsPerPage;
      const currentItems=items.slice(idxOfFirstItem,idxOfLastItem);
      let totalItems =0;

      const paginate=(pageNumber)=>setCurrentPage(pageNumber);
    return(
        <Container>
            <ProductMenu/>
            {(currentItems&&items)&&<div>
                <p>{skin_concerns}</p>
            <StyledDiv>
                {Object.values(currentItems).map((item)=>{
                    const concerns=item.skin_concerns;
                    if(concerns.indexOf(skin_concerns)>=0){
                        totalItems++;
                    return (
                        <Item href={`/products/detail/${item.id}`}>
                            <ItemDiv>
                                <StyledImg src={item.img_src}></StyledImg>
                                <StyledTitle>{item.name}</StyledTitle>
                                <StyledBrand>{item.brand}</StyledBrand>
                                <StyledRating>Rating: {item.hearts}</StyledRating>
                            </ItemDiv>
                        </Item>
                    )}
                })}
            </StyledDiv>
            <Pagination itemsPerPage={itemsPerPage} totalItems={totalItems} paginate={paginate} />
            </div>}
        </Container>
    )
}
const Container =styled.div`
display: flex;
flex-direction: row;
`
const StyledDiv=styled.div`
display: grid;
grid-template-columns: auto auto auto auto ;
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
export default ProductFilterPageB;