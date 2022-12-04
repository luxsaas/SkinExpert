import styled from "styled-components";
import {useParams} from 'react-router-dom';
import { useState, useEffect,useContext } from "react";
import { UserContext } from "../UserContext";
import SearchBar from "./SearchBar";
import LoadingPage from "./LoadingPage";
const ProductMenuItem=()=>{

    const {skin_concerns} = useParams();
    const [items,setItems]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const [itemsPerPage,setItemsPerPage]=useState(12);
    const {activeUser,setActiveUser} =useContext(UserContext);
//get all items
    useEffect(() => {
        fetch(`/products`)
        .then((res) => res.json())
        .then((data) => {
            setItems(data.data);
        });
    }, []);
    
    //adds item to current routine bin 
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
    return(
        <Container>
            <div>
            {(currentItems&&items)?<div>
                <SearchBar/>
                <Styledh3>Featured Products</Styledh3>
                <p>{skin_concerns}</p>
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
                                <button onClick={()=>addToCurrentRoutine(item)}>Add to Routine</button>
                            </ButtonDiv>
                        </ProductDiv>
                    )
                })}
            </StyledDiv>
            </div>:<LoadingPage/>}</div>
        </Container>
    )
}
const Styledh3=styled.h3`
font-family: serif;
font-weight: bold;
`
const Container =styled.div`
display: flex;
flex-direction: row;
margin: 30px;
background-color: #edf2fb;
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

export default ProductMenuItem;

