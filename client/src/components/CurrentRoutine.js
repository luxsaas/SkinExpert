import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import Product from "./Product";
const CurrentRoutine=()=>{
    const [routine,setRoutine]=useState();
    const[refresh,setRefresh]=useState(1);
    const {activeUser,setActiveUser}=useContext(UserContext);
    useEffect(() => {
        fetch(`/routine/${activeUser}`)
        .then((res) => res.json())
        .then((data) => {
            setRoutine(data.data[0]);
        })
    }, [refresh])
    
    return(
        <Container>
            {routine?.Cleanser&&
                <Product item={routine.Cleanser} id="Cleanser" refresh={refresh} setRefresh={setRefresh}/>
                }
            {routine?.Moisturizer&&
                <Product item={routine.Moisturizer} id="Moisturizer" refresh={refresh} setRefresh={setRefresh}/>
                }
            {routine?.SunScreen&&
                <Product item={routine.SunScreen} id="Sun Screen" refresh={refresh} setRefresh={setRefresh}/>
                    }
            {routine?.Treatment&&
                <Product item={routine.Treatment} id="Treatment" refresh={refresh} setRefresh={setRefresh}/>
                    }
            {routine?.Mask&&
                <Product item={routine.Mask} id="Mask" refresh={refresh} setRefresh={setRefresh}/>
                    }
            {routine?.EyeCare&&
                <Product item={routine.EyeCare} id="Eye Care" refresh={refresh} setRefresh={setRefresh}/>
                    }
            {routine?.LipCare&&
                <Product item={routine.LipCare} id="Lip Care" refresh={refresh} setRefresh={setRefresh}/>
                    }
        </Container>
    )
}
const Container=styled.div`
display: flex;
flex-direction: row;
background-color: #edf2fb;
`
export default CurrentRoutine;