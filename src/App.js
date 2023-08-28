import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import ModelAddNew from './components/ModelAddUser';
import { useState } from 'react';
function App() {
    const [showModelAddUser, setShowModelAddUser] = useState(false);
    return (
        <div className="app-container">
            <Header />
            <Container>
                <div className="my-3 d-flex justify-content-between align-items-center">
                    <span>
                        <b>List Users:</b>
                    </span>
                    <button className="btn btn-success" onClick={() => setShowModelAddUser(true)}>
                        Add user
                    </button>
                </div>
                <TableUsers />
            </Container>
            <ModelAddNew show={showModelAddUser} handleClose={() => setShowModelAddUser(false)} />
        </div>
    );
}

export default App;
