import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

//css
import './App.css';

//Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import Dashboard from './pages/Dashboard';

//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

//Context
import { AuthProvider } from './context/AuthContext';

//Hooks
import { useEffect, useState } from 'react';
import { useAuthentication } from './hooks/useAuthentication';
import { onAuthStateChanged } from 'firebase/auth';


function App() {
  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    } )

  }, [auth, user])

  if(loadingUser){
    return <p>Caregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route 
                path='/login' 
                element={!user ? <Login /> : <Navigate to='/' />} 
              />
              <Route 
                path='/register' 
                element={!user ? <Register />  : <Navigate to='/' />} 
              />
              <Route 
                path='/posts/create' 
                element={user ? <CreatePost /> : <Navigate to='/login' />} 
              />
              <Route 
                path='/dashboard' 
                element={user ? <Dashboard /> : <Navigate to='/login' />} 
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
