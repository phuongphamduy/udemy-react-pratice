import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function ModelAddNew({ show, handleClose }) {
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleSaveUser = () => {
        console.log('<< check state:', name, job);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add new user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Job</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter job"
                                value={job}
                                onChange={(e) => setJob(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveUser}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModelAddNew;
