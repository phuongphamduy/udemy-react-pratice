import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModelDeleteConfirm({ show, handleClose, data }) {
    const confirmDelete = () => {};

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
