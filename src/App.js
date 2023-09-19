import './App.scss';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const {currentUser} = useContext(AuthContext);

  //DONT USE PROTECTED ROUTE, CAUSES USEEFFECT TO RERENDER AND RESETS USESTATE
  //Use a ternary operator instead
  // const ProtectedRoute = ({children}) => {
  //   if(!currentUser){
  //     return <Navigate to="/login"/>;
  //   }

  //   return (children)
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={
            // <ProtectedRoute>
             (currentUser) ? <Home /> : <Navigate to="/login"/>
            // </ProtectedRoute>
            }/>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
