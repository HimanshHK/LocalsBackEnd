import React from 'react';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignInAdmin from './components/SignInAdmin';

import { SellerItems,Registered,SupportAdmin,Home, SingleProduct, Cart, Checkout, Error, About, Products, PrivateRoute, AuthWrapper,Dashboard,Profile,Orders,Support ,Admin,ProfileAdmin} from './pages';
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <div>
       <Router>
        
        <Navbar />
          <Sidebar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/registered'>
            <Registered />
          </Route>
          <Route exact path='/items'>
            <SellerItems />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/cart'>
            <Cart />
          </Route>
          <Route exact path='/products'>
            <Products />
          </Route>
          <Route exact path='/addproduct'>
            <AddProduct/>
          </Route>
          <Route exact path='/login'>
            <SignIn/>
          </Route>
          <Route exact path='/signin'>
            <SignUp/>
          </Route>
          <Route exact path='/profile'>
            <Profile/>
          </Route>
          <Route exact path='/profileAdmin'>
            <ProfileAdmin/>
          </Route>
          <Route exact path='/orders'>
            <Orders/>
          </Route>
          <Route exact path='/support'>
            <Support/>
          </Route>
          <Route exact path='/supportAdmin'>
            <SupportAdmin/>
          </Route>
          <Route exact path='/admin'>
            <Admin/>
            </Route>
            <Route exact path='/signadmin'>
            <SignInAdmin/>
            </Route>
          <Route exact path='/products/:id' children={<SingleProduct />} />
          <Route exact path='/dashboard'><Dashboard/></Route>
          
          <Route path='*'>
            <Error />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
