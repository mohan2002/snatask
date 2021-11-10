import './App.css';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import Homepage from './Pages/Homepage';
import AuthProvider from './AuthPart/Context';

function App() {
  return (
    <div className="App">
      
        <Router>
          <AuthProvider>
          <Routes>
            <Route exact path="/" element={<LoginPage/>} />
            <Route path="/home" element={<Homepage/>}/>
          </Routes>
          </AuthProvider>
        </Router>
      
    </div>
  );
}

export default App;
