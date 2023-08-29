import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { putUpdateUser } from '../services/UserService';
import { toast } from 'react-toastify';

function ModelEditUser({ show, handleClose, data, handleEditUserFromModal }) {
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    useEffect(() => {
        if (show) {
            setName(data.first_name);
        }
    }, [data]);

    const handleUpdate = async () => {
        let res = await putUpdateUser(name, job);
        if (res && res.updatedAt) {
            handleEditUserFromModal({ first_name: name, id: data.id });
            handleClose();
            toast.success('update users succeed');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit a user</Modal.Title>
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
                <Button variant="primary" onClick={handleUpdate}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModelEditUser;
