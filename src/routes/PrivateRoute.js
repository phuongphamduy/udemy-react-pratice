import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Alert } from 'react-bootstrap';

function PrivateRoute({ children }) {
    const { user } = useContext(UserContext);

    if (user && !user.auth) {
        return (
            <>
                <Alert variant="danger">
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>You don't have permission to access this page</p>
                </Alert>
            </>
        );
    }

    return <>{children}</>;
}

export default PrivateRoute;
