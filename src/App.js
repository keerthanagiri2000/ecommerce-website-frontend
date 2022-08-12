import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Navigation} from './components/Navigation';
import { Home } from './pages/Home';
import {Login} from './pages/Login';
import {Signup} from './pages/Signup';
import { useSelector} from 'react-redux';
import { NewProduct } from './pages/NewProduct';
import { ProductPage } from './pages/ProductPage';
import { CategoryScreen } from './pages/CategoryScreen';
import { ScrollTop } from './components/ScrollTop';
import { CartScreen } from './pages/CartScreen';
import { OrdersScreen } from './pages/OrdersScreen';
import { Dashboard } from './pages/Dashboard';
import { EditProduct } from './pages/EditProduct';
import './App.css';

function App() {
  const user = useSelector((state) => state.users);
  

  return (
    <div className="App">
     <BrowserRouter>
       <ScrollTop />
       <Navigation />
       <Routes>
         <Route index element={<Home />} />
         <Route path='*' element={<Home />}/>
         {!user && (
          <>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          </>
         )}
         <Route path='/new-product' element={<NewProduct />} />
         <Route path='/product/:id' element={<ProductPage />} />
         <Route path='/category/:category' element={<CategoryScreen />} />
         {user && (
          <>
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/orders' element={<OrdersScreen />} />
          </>
         )}
         {user && user.isAdmin && (
           <>
             <Route path='/dashboard' element={<Dashboard />} />
             <Route path='/product/:id/edit' element={<EditProduct />} />
           </>
         )}
        
       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
