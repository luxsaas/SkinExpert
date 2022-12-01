import { createContext, useState } from "react";

export const UserContext =createContext();

export const UserProvider =({children})=>{
    const [users,setUsers]=useState();
    const [activeUser,setActiveUser]=useState(null);
    return(
        <UserContext.Provider value={{users,setUsers,activeUser,setActiveUser}}>
            {children}
        </UserContext.Provider>
    )
}