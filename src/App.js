import './App.css';
import LoginPage from './components/login/loginPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Category from './components/Category/category';
import Product from './components/product/product';
import Addcategory from './components/Category/addcategory';
import AddProduct from './components/product/addproduct';
import ForgotPass from './components/Forgotpass/forgotpass';
import LogoutModal from './components/logoutPop/logoutModal';
import Register from './components/login/createuser';

function App() {
  return (
    <div className="App">

     
     <Router>
    
      <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/logout" element={<LogoutModal />}></Route>
      <Route path="/register" element={<Register />}></Route>


      <Route path="/home" element={<Home />}></Route>

      <Route path="/category" element={<Category />}></Route>
      <Route path="/addcategory" element={<Addcategory />}></Route>

      <Route path="/product" element={<Product/>}></Route>
      <Route path="/addproduct" element={<AddProduct />}></Route>

      <Route path='/forgot-password' element={<ForgotPass />}></Route>


      </Routes>
     </Router>
     
    </div>
  );
}

export default App;
