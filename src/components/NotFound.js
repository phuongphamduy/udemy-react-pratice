import { Alert } from 'react-bootstrap';

function NotFound() {
    return (
        <>
            <Alert variant="danger">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>Not found page</p>
            </Alert>
        </>
    );
}

export default NotFound;
