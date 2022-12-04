import {BrowserRouter,Routes,Route} from "react-router-dom";
import FrontPage from "./components/FrontPage";
import Homepage from "./components/Homepage";
import ProductPage from "./components/ProductPage";
import ProductFilterPage from "./components/ProductFilterPage";
import ProductFilterPageB from "./components/ProductFilterPageB";
import ProductDetails from "./components/ProductDetails";
import Community from "./components/Community";
import Brands from "./components/Brands";
import ProductFilterBrand from "./components/ProductFilterBrand";
import { UserContext } from "./UserContext";
import { useEffect,useContext } from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend';
import EditProfile from "./components/EditProfile";
import {useAuth0} from "@auth0/auth0-react";
import CreateAnAccount from "./components/CreateAccount";
const App=()=> {
  const {user,isAuthenticated, isLoading}=useAuth0(); 
  const {users,setUsers, activeUser,setActiveUser}=useContext(UserContext);
  useEffect(() => {
    if(isAuthenticated){
    fetch(`/users/${user.name}`)
    .then((res) => res.json())
    .then((data) => {
        setActiveUser(data.data[0].name);
        setUsers(data.data[0]);
    })
  }
}, [isAuthenticated])
  return (
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <Routes forceRefresh>
          <Route path="/" element={<FrontPage/>}/>
          <Route path="/home" element={<Homepage/>}/>
          <Route path="/products" element={<ProductPage/>}/>
          <Route path="/products/type/:category" element={<ProductFilterPage/>}/>
          <Route path="/products/concern/:skin_concerns" element={<ProductFilterPageB/>}/>
          <Route path="/products/detail/:id" element={<ProductDetails/>}/>
          <Route path="/community" element={<Community/>}/>
          <Route path="/brands" element={<Brands/>}/>
          <Route path="/brands/:brand" element={<ProductFilterBrand/>}/>
          <Route path="/edit-profile" element={<EditProfile/>}/>
          <Route path="/createAccount" element={<CreateAnAccount/>}/>
        </Routes>
      </DndProvider>
      
    </BrowserRouter>
  )
}

export default App;
