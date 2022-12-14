import { NavLink } from "react-router-dom";
import styled from "styled-components";
import React, {useState, useEffect, } from 'react'
import { useNavigate } from "react-router-dom";


const SearchBar =()=>{
    const [loaded, setLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [isSearchContainerOpen, setIsSearchContainerOpen] = useState(false);
    const [input, setInput] = useState('');
    const navigate = useNavigate();
//get item information
useEffect(() => {
    if(!loaded){
        const itemsArr = []
        fetch('/products')
        .then(res => res.json())
        .then(data => {
            data.data.forEach((item) => {
                const result = {
                    name: item.name,
                    id:item.id
                }
                itemsArr.push(result)
            });
        }).then(()=>{
            setItems(itemsArr)
            setLoaded(true)
        })
    }
},[])    
//search container opens if there are outputs to the search query
useEffect(() => {
    if(input.length !== 0){
        setIsSearchContainerOpen(true)
    }else{
        setIsSearchContainerOpen(false)
    }
}, [input])
//checking matches from the search query and seting it as input
const checkMatch = (e) =>  {
    setInput(e.target.value)
}
//if item is clicked in search container, it goes to the product detail page
const handleClick = (id) => {
    navigate(`/products/detail/${id}`)
    setInput('')
}

return (
<Wrapper>
    <div>
    <Input 
    value={input} 
    onChange={checkMatch}
    placeholder="Search..." 
    />
    </div>
    { isSearchContainerOpen
    ?
    <SearchContainer>
        <ContainerDiv>
            {items.length !== 0
            ?
            Object.values(items).map((item) => {
                if((item.name).toLowerCase().includes(input.toLocaleLowerCase())){
                return <SearchItem onClick={()=> {handleClick(item.id)}}>
                    {item.name}
                </SearchItem>
                }
            })
            :
            <SearchItem disabled >no items...</SearchItem>
            }
        </ContainerDiv>
    </SearchContainer>
    :
    <></>
    }
    

</Wrapper>
)
}

//----- STYLING -----

const ContainerDiv = styled.div`
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
overflow-y: scroll;
width: 100%;
`

const SearchItem = styled.button`
display: inline-block;
height: 50px;
min-height: 50px;
width: 100%;
border-radius: 5px;
color: black;
background-color: inherit;
overflow-wrap: break-word;

&:hover{
    background-color: #abc4ff;
    color: white;
}

`
const SearchContainer = styled.div`
max-height: 300px;
width: 100%;
background-color: white;
position: absolute;
border-radius: 5px;
overflow: hidden;
z-index: 100;
overflow-y: scroll;

`
const Input = styled.input`
color: black;
padding: 1rem;
font-size: 16px;
width: 15rem;
border: 1px solid black;
width: 56rem;

border-radius: 10px;


&:focus {
outline: none;
border-radius: 10px;
background: rgba(0,0,0,0.05);
}
&::placeholder {
    color: gray;
}
`
const Wrapper = styled.div`
position: relative;

button{
    border-radius: 3px;
    padding: 5px 5px;
    border-style: none;
    cursor: pointer;
}
`

export default SearchBar;