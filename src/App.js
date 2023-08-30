import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TableUsers from './components/TableUsers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import Login from './components/Login';
function App() {
    return (
        <>
            <div className="app-container">
                <BrowserRouter>
                    <Header />
                    <Container>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/users" element={<TableUsers />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </Container>
                </BrowserRouter>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
