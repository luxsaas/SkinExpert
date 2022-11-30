import {BrowserRouter,Routes,Route} from "react-router-dom";
import FrontPage from "./components/FrontPage";
import Homepage from "./components/Homepage";
import SignIn from "./components/SignIn";
import ProductPage from "./components/ProductPage";
import ProductFilterPage from "./components/ProductFilterPage";
import ProductFilterPageB from "./components/ProductFilterPageB";
import ProductDetails from "./components/ProductDetails";
import Community from "./components/Community";
import Brands from "./components/Brands";
import ProductFilterBrand from "./components/ProductFilterBrand";
import { UserContext } from "./UserContext";
import { useState } from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend';
const App=()=> {
  const [activeUser,setActiveUser]=useState(null);
  return (
    <BrowserRouter>
     
    <UserContext.Provider value={{activeUser,setActiveUser}}>
      <DndProvider backend={HTML5Backend}>
        <Routes>
          <Route path="/" element={<FrontPage/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/home" element={<Homepage/>}/>
          <Route path="/products" element={<ProductPage/>}/>
          <Route path="/products/type/:category" element={<ProductFilterPage/>}/>
          <Route path="/products/concern/:skin_concerns" element={<ProductFilterPageB/>}/>
          <Route path="/products/detail/:id" element={<ProductDetails/>}/>
          <Route path="/community" element={<Community/>}/>
          <Route path="/brands" element={<Brands/>}/>
          <Route path="/brands/:brand" element={<ProductFilterBrand/>}/>
        </Routes>
      </DndProvider>
    </UserContext.Provider>
      
    </BrowserRouter>
  )
}

export default App;
