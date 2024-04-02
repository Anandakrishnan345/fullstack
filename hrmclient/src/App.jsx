import React, { useState, useEffect } from 'react';
// import Final from './components/Final'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
// import Adduser from './components/Adduser'
// import Login from './components/Login'
// import LandRouting from './components/LandRouting'
// import Land_nav from './components/Land_nav'
// import Land_footer from './components/Land_footer'

import Final from './components/Final';
import Login from './components/Login';
import Adduser from'./components/Adduser';
import AdminOnline from './components/AdminOnline';
import Getuser from './components/Getuser';
import ViewUser from './components/ViewUser';
import UpdateUser from './components/UpdateUser';
import DeleteUser from './components/DeleteUser';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';
import User from './components/User';
import ChangePassword from './components/ChangePassword';
import NotFound from './components/Notfound';



function App() {
  

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<Final />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/adduser" exact element={<Adduser/>} />
         
        
          <Route path='/admin/:id' exact element={<AdminOnline/>}/>
          <Route path="/getuser" exact element={<Getuser/>}/>
          <Route path='/viewuser/:id' exact element={<ViewUser/>}/>
          <Route path='/Update/:id' exact element={<UpdateUser/>}/>
          <Route path='/delete/:id' exact element={<DeleteUser/>}/>
          <Route path='/forgotpassword' exact element={<ForgotPassword/>}/>
          <Route path='/reset-password' exact element={<ResetPassword/>}/>
          <Route path='/employee/:id' exact element={<User/>}/>
          <Route path='/employee/:id/changepassword' exact element={<ChangePassword/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


