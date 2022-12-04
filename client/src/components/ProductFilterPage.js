import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import ProductMenu from "./ProductMenu";
import {useParams} from 'react-router-dom';
import Pagination from "./Pagination";
import { UserContext } from "../UserContext";
import {TiThumbsUp, TiThumbsDown} from "react-icons/ti";
import LoadingPage from "./LoadingPage";

const ProductFilterPage=()=>{
    const {category}=useParams();
    const [currentPage,setCurrentPage]=useState(1);
    const [itemsPerPage,setItemsPerPage]=useState(32);
    const [items,setItems]=useState([]);
    const {activeUser,setActiveUser} =useContext(UserContext);
    let key="";
    if(category=='cleanser'){
        key='Cleansers';
    }
    else if(category=='moisturizing-cream-oils-mists'){
        key='Moisturizers';
    }
    else if(category=='facial-treatments'){
        key='Treatments';
    }
    else if(category=='eye-treatment-dark-circle-treatment'){
        key='Eye Care';
    }
    else if(category=='facial-treatment-masks'){
        key='Masks';
    }
    else if(category =='sunscreen-sun-protection'){
        key='Sun Care';
    }
    else if(category=='lip-treatments'){
        key='Lip Care';
    }
    //get items for the specific category
    useEffect(() => {
        fetch(`/product/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
            setItems(data.data);
        });
    }, []);
    //adds product to current routine bin
    const addToCurrentRoutine=(item)=>{
        const formData=item;
        fetch(`/routine/${activeUser}/${item.category}`,{
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
    const idxOfLastItem=currentPage*itemsPerPage;
    const idxOfFirstItem=idxOfLastItem-itemsPerPage;
    const currentItems=items.slice(idxOfFirstItem,idxOfLastItem);
    const paginate=(pageNumber)=>setCurrentPage(pageNumber);

    return(
        <Container>
            <ProductMenu/>
            <SubContainer>
                <Styledh3>{key}</Styledh3>
            <StyledDiv>
                {Object.values(currentItems).map((item)=>{
                    return (
                        <ProductDiv>
                            <Item href={`/products/detail/${item.id}`}>
                                <ItemDiv>
                                    <StyledImg src={item.img_src}></StyledImg>
                                    <StyledTitle>{item.name}</StyledTitle>
                                    <StyledBrand>{item.brand}</StyledBrand>
                                    <StyledRating>Rating: {item.hearts}</StyledRating>
                                </ItemDiv>
                            </Item>
                            <ButtonDiv>
                                {/* <button>{<TiThumbsUp/>}</button> */}
                                <StyledButton onClick={()=>addToCurrentRoutine(item)}>Add to Routine</StyledButton>
                                {/* <button>{<TiThumbsDown/>}</button> */}
                            </ButtonDiv>
                        </ProductDiv>
                    )
                })}
            </StyledDiv>
            <Pagination itemsPerPage={itemsPerPage} totalItems={items.length} paginate={paginate} />
            </SubContainer>
        </Container>
    )
}

const StyledButton=styled.button`
&:active{
    background-color:black
}
`
const Styledh3=styled.h3`
font-family: serif;
font-weight: bold;
`
const Container =styled.div`
display: flex;
flex-direction: row;
background-color: #edf2fb;
`
const SubContainer=styled.div`
margin-left: 20px;
`
const ButtonDiv=styled.div`
display: flex;
flex-direction: row;
justify-content: center;
`
const StyledDiv=styled.div`
display: grid;
grid-template-columns: auto auto auto auto ;
`
const ItemDiv=styled.div`
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
const ProductDiv=styled.div`
display:flex;
flex-direction:column;
justify-content:center;
margin:5px;
border:2px solid #abc4ff;
`

export default ProductFilterPage;