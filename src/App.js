import React, { useEffect, useState } from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import './App.css';
import Home from './component/Home/Home';
import About from './component/About/About';
import Contact from './component/Contact/Contact';
import Cart from './component/Cart/Cart';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import Machine from './component/Machine/Machine';
import Layout from './component/Layout/Layout';
import Categories from './component/Categories/Categories';
import Brands from './component/Brands/Brands';
import NotFound from './component/NotFound/NotFound';
import { Toaster } from 'react-hot-toast';
import jwtDecode from 'jwt-decode';
import ProductDetails from './component/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import BrandDetails from './component/BrandDetails/BrandDetails';
import MachineDetails from './component/MachineDetails/MachineDetails';
import EmptyCart from './component/EmptyCart/EmptyCart';
import Loading from './component/Loading/Loading';
import CategoryDetails from './component/CategoryDetails/CategoryDetails';
import CheckOut from './component/CheckOut/CheckOut';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';
import Addresses from './component/Addresses/Addresses';
import Profile from './component/Profile/Profile';
import Reservation from './component/Reservation/Reservation';
import ChangePassword from './component/ChangePassword/ChangePassword';
const LazyLoading = React.lazy(()=> import("./component/Products/Products"))


function App() {


useEffect(()=>{
  if(localStorage.getItem("userToken")){
    saveUserData()
  }
},[])



const [SetUserData, setSetUserData] = useState(null)

function saveUserData(){
  let enCodedToken = localStorage.getItem("userToken")
  let decodedToken = jwtDecode(enCodedToken)
  setSetUserData(decodedToken)
}


  let routers =createHashRouter([{
    path:"" , element:<Layout SetUserData={SetUserData} setSetUserData={setSetUserData}/> , children:[
    {index:true , element:<Home/>},
    {path:"products" , element:
    <React.Suspense fallback="Loading...">
      <LazyLoading/>
    </React.Suspense>},
    {path:"productDetails/:id" , element:<ProductDetails/>},
    {path:"categories" , element:<Categories/>},
    {path:"categoryDetails/:id" , element:<CategoryDetails/>},
    {path:"brands" , element:<Brands/>},
    {path:"brandsDetails/:id" , element:<BrandDetails/>},
    {path:"about" , element:<About/>},
    {path:"machine" , element:<Machine/>},
    {path:"machineDetails/:id" , element:<MachineDetails/>},
    {path:"contact" , element:<Contact/>},
    {path:"cart" , element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:"checkOut" , element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
    {path:"addresses" , element:<ProtectedRoute><Addresses/></ProtectedRoute>},
    {path:"emptyCart" , element:<ProtectedRoute><EmptyCart/></ProtectedRoute>},
    {path:"profile" , element:<ProtectedRoute><Profile/></ProtectedRoute>},
    {path:"reservation" , element:<ProtectedRoute><Reservation/></ProtectedRoute>},
    {path:"changePassword" , element:<ProtectedRoute><ChangePassword/></ProtectedRoute>},
    {path:"loading" , element:<Loading/>},
    {path:"register" , element:<Register/>},
    {path:"login" , element:<Login saveUserData={saveUserData}/>},
    {path:"*" , element:<NotFound/>},
    ]
  }])


  return <>
<CartContextProvider>
<Toaster/>
  <RouterProvider router={routers}/>
</CartContextProvider>

  </>
}

export default App;
