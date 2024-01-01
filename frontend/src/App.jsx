import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css'
import UserLogin from './pages/user/UserLogin';
import AdminLogin from './pages/admin/AdminLogin';
import UserRegister from './pages/user/UserRegister';
import MainPage from './pages/MainPage'
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRegister from './pages/admin/AdminRegister';
import { useState } from 'react';
import { useEffect } from 'react';
import CreateBook from './pages/admin/CreateBook';
import ManageBooks from './pages/admin/ManageBooks';
import EditBook from './pages/admin/EditBook';
import BookDetails from './pages/admin/BookDetails';
import DeleteBook from './pages/admin/DeleteBook';
import UsersList from './pages/admin/UsersList';
import BorrowBooks from './pages/admin/BorrowBooks';

function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleAdminLogin = () => {
    setAdminLoggedIn(true);
    localStorage.setItem('loggedIn', 'true');
  };

  const handleAdminLogout = () => {
    setAdminLoggedIn(false);
    localStorage.removeItem('loggedIn'); // Remove the login status from local storage
  };
  const handleUserLogin = () => {
    setUserLoggedIn(true);
    localStorage.setItem('userLoggedIn', 'true');
  };

  const handleUserLogout = () => {
    setUserLoggedIn(false);
    localStorage.removeItem('userLoggedIn'); // Remove the login status from local storage
    localStorage.removeItem('userAuthtoken')
  };
  useEffect(() => {
    const storedAdminLoggedIn = localStorage.getItem('loggedIn');
    const storedUserLoggedIn = localStorage.getItem('userLoggedIn')
    if (storedUserLoggedIn === 'true') {
      setUserLoggedIn(true);
    }
    if (storedAdminLoggedIn === 'true') {
      setAdminLoggedIn(true);
    }
  }, [])


  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/adminLogin" element={<AdminLogin onlogin={handleAdminLogin} />} />
          <Route exact path="/userRegister" element={<UserRegister />} />
          <Route exact path="/userLogin" element={<UserLogin onlogin={handleUserLogin} />} />
         
          <Route exact path="/newbook" element={<CreateBook />} />
          <Route path='/books/edit/:id' element={<EditBook /> } />
          <Route path='/books/details/:id' element={<BookDetails/> } />
          <Route path='/books/delete/:id' element={<DeleteBook/> } />
          {userLoggedIn ? (
            <Route exact path="/mainPage" element={<MainPage userLogout={handleUserLogout} />} />
          ) : (
            <Route exact path="/mainPage" element={
              <div>
                <h2 style={{ color: 'red', textAlign: 'center', marginTop: '20px', fontSize: '1.5em', fontWeight: 'bold' }}>
                  Access Denied: Please Login to Explore the Books
                </h2>
                <UserLogin onlogin={handleUserLogin} />
              </div>
            } />
          )}
          {adminLoggedIn ? (
            <Route exact path="/adminDashboard" element={<AdminDashboard adminLogout={handleAdminLogout} />} />
          ) : (
            <Route exact path="/adminDashboard" element={
              <div>
                <h2 style={{ color: 'red', textAlign: 'center', marginTop: '20px', fontSize: '1.5em', fontWeight: 'bold' }}>
                  Access Denied: Please Login to Explore the Admin Dashboard
                </h2>
                <AdminLogin onlogin={handleAdminLogin} />
              </div>
            } />
          )}
          {adminLoggedIn ? (
            <Route exact path="/createAdmin" element={<AdminRegister />} />
          ) : (
            <Route exact path="/createAdmin" element={
              <div>
                <h2 style={{ color: 'red', textAlign: 'center', marginTop: '20px', fontSize: '1.5em', fontWeight: 'bold' }}>
                  Access Denied: Please Login to Explore the Admin Dashboard
                </h2>
                <AdminLogin onlogin={handleAdminLogin} />
              </div>
            } />
          )}
          {adminLoggedIn ? (
            <Route exact path="/manageBooks" element={<ManageBooks/>} />
          ) : (
            <Route exact path="/manageBooks" element={
              <div>
                <h2 style={{ color: 'red', textAlign: 'center', marginTop: '20px', fontSize: '1.5em', fontWeight: 'bold' }}>
                  Access Denied: Please Login to Explore the Admin Dashboard
                </h2>
                <AdminLogin onlogin={handleAdminLogin} />
              </div>
            } />
          )}
          {adminLoggedIn ? (
            <Route exact path="/users" element={<UsersList/>} />
          ) : (
            <Route exact path="/users" element={
              <div>
                <h2 style={{ color: 'red', textAlign: 'center', marginTop: '20px', fontSize: '1.5em', fontWeight: 'bold' }}>
                  Access Denied: Please Login to Explore the Admin Dashboard
                </h2>
                <AdminLogin onlogin={handleAdminLogin} />
              </div>
            } />
          )}
          {adminLoggedIn ? (
            <Route exact path="/borrowBooks" element={<BorrowBooks/> } />
          ) : (
            <Route exact path="/borrowBooks" element={
              <div>
                <h2 style={{ color: 'red', textAlign: 'center', marginTop: '20px', fontSize: '1.5em', fontWeight: 'bold' }}>
                  Access Denied: Please Login to Explore the Admin Dashboard
                </h2>
                <AdminLogin onlogin={handleAdminLogin} />
              </div>
            } />
          )}
        </Routes>
      </Router>
    </>
  )
}

export default App
