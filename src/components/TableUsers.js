import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchListUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModelAddNew from './ModelAddUser';
import ModelEditUser from './ModelEditUser';

function TableUsers() {
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [showModelAddUser, setShowModelAddUser] = useState(false);
    const [showModelEditUser, setShowEditUser] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [dataUserEdit, setDataUserEdit] = useState({});
    useEffect(() => {
        getUsers(1);
    }, []);

    const getUsers = async (page) => {
        let res = await fetchListUser(page);

        if (res && res.data) {
            setListUsers(res.data);
            setTotalUsers(res.total);
            setTotalPages(res.total_pages);
        }
    };

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    };

    const AddListUser = (user) => {
        setListUsers([user, ...listUsers]);
    };

    const handleUpdateUser = (user) => {
        setShowEditUser(true);
        setDataUserEdit(user);
    };

    return (
        <div>
            <div className="my-3 d-flex justify-content-between align-items-center">
                <span>
                    <b>List Users:</b>
                </span>
                <button className="btn btn-success" onClick={() => setShowModelAddUser(true)}>
                    Add user
                </button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers &&
                        listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`item: ${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <button className="btn btn-warning me-3" onClick={() => handleUpdateUser(item)}>
                                            Update
                                        </button>
                                        <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
            <ModelAddNew
                show={showModelAddUser}
                handleClose={() => setShowModelAddUser(false)}
                AddListUser={AddListUser}
            />
            <ModelEditUser show={showModelEditUser} handleClose={() => setShowEditUser(false)} data={dataUserEdit} />
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
        </div>
    );
}

export default TableUsers;
