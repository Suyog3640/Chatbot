import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { Admin } from './pages/admin';
import { User } from './pages/user';
import { Login } from './pages/login';
import axios from 'axios';

function App() {

  // const handleLogout = () => {
  //   sessionStorage.clear('userId','chatbotId');
  // }

  return (
    <>
      <header>
        <nav className="navbar nav-color navbar-expand-lg nav-bg">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
              </ul>
              <Link to='/' style={{textDecoration: 'none'}}>Logout</Link>
              {/* {sessionStorage.getItem('userId') ? <Link to='/' style={{textDecoration: 'none'}} onClick={handleLogout}>Logout</Link> : <Link to='/' style={{textDecoration: 'none'}}>Login</Link> } */}
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/user' element={<User />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
