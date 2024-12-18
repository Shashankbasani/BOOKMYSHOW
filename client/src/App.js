import logo from './logo.svg';
import './App.css';
import Login from './pages/login/login';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Register from './pages/regiester/register';
import HomePage from './Homepage/home';
import ProtectedRoute from './components/protectedRoute';
import Admin from './pages/Admin';
import Profile from './pages/profile/profile';
import Singlepage from './pages/singlepage/singlepage';
import BookShow from './pages/bookShow/BookShow';

function App() {
  return (
    <BrowserRouter>
    <Routes>

    <Route path="/" element={ 
      <ProtectedRoute>
      <HomePage />
      </ProtectedRoute>
      }/>

       <Route path="/admin" element={ 
      <ProtectedRoute>
      <Admin />
      </ProtectedRoute>
      }/>

      <Route path="/profile" element={ 
      <ProtectedRoute>
      <Profile />
      </ProtectedRoute>
      }/>


      
      {/* <Route path="/profile" element={ 
      <ProtectedRoute>
      <Profile />
      </ProtectedRoute>
      }/> */}

      <Route path="/movie/:id" element={ 
      <ProtectedRoute>
      <Singlepage />
      </ProtectedRoute>
      }/>

      <Route path="/login" element={ <Login />}/>
      <Route path="/register" element={ <Register />}/>
      <Route path="/bookshow/:id" element={ <BookShow />}/>

    </Routes>
   
    </BrowserRouter>
    
  );
}

export default App;
