import styled from "styled-components";
const Pagination =({itemsPerPage,totalItems,paginate})=>{
    const pageNumbers=[];
    for(let i=1;i<=Math.ceil(totalItems/itemsPerPage);i++){
        pageNumbers.push(i);
    }

    return(
        <StyledNav>
            <StyledUl>
                {pageNumbers.map((number)=>{
                    return(
                <StyledLi key={number}>
                    <StyledNumber onClick={()=>paginate(number)} href="#">
                    {number}
                    </StyledNumber>
                </StyledLi>
                    )
                })}
            </StyledUl>
        </StyledNav>
    )
}

const StyledUl=styled.ul`
display: flex;
flex-direction: row;
justify-content: center;

`
const StyledLi=styled.li`
list-style: none;
display:inline;
margin-left: 15px;
border: 3px solid #abc4ff;
padding:5px;
border-radius: 50%;
&:hover{
background-color: #abc4ff ;
}
`
const StyledNav=styled.nav`
    /* border:2px solid #abc4ff;
    border-radius: 10px; */
`
const StyledNumber =styled.a`
color:black;
text-decoration: none;
`
export default Pagination;