import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../services/UserService';
import { toast } from 'react-toastify';

function ModelDeleteConfirm({ show, handleClose, data, handleDeleteUserFromModal }) {
    const confirmDelete = async () => {
        let res = await deleteUser(data.id);
        if (res && +res.statusCode === 204) {
            toast.success('Delete user succeed');
            handleClose();
            handleDeleteUserFromModal(data);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Delete a user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    Do you want to delete this user? <br /> Email: <b>{data.email}</b>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={confirmDelete}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModelDeleteConfirm;
