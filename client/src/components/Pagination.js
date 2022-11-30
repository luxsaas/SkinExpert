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

`
const StyledLi=styled.li`
list-style: none;
display:inline;
margin-left: 15px;
border: 1px solid blue;
border-radius: 50%;
padding:5px;
`
const StyledNav=styled.nav`
    border: 1px solid blue;
`
const StyledNumber =styled.a`
color:black;
text-decoration: none;
`
export default Pagination;