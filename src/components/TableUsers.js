import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchListUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModelAddNew from './ModelAddUser';
import ModelEditUser from './ModelEditUser';
import _ from 'lodash';
import ModelDeleteConfirm from './ModelDeleteConfirm';

function TableUsers() {
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [showModelAddUser, setShowModelAddUser] = useState(false);

    const [showModelEditUser, setShowEditUser] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const [showModelConfirmDelete, setShowModelConfirmDelete] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({});
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

    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        let index = listUsers.findIndex((item) => item.id === user.id);
        cloneListUsers[index].first_name = user.first_name;
        setListUsers(cloneListUsers);
    };

    const handleDeleteConfirm = (user) => {
        setShowModelConfirmDelete(true);
        setDataUserDelete(user);
    };

    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        let index = listUsers.findIndex((item) => item.id === user.id);
        cloneListUsers.splice(index, 1);
        setListUsers(cloneListUsers);
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
                                        <button className="btn btn-danger" onClick={() => handleDeleteConfirm(item)}>
                                            Delete
                                        </button>
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
            <ModelEditUser
                show={showModelEditUser}
                handleClose={() => setShowEditUser(false)}
                data={dataUserEdit}
                handleEditUserFromModal={handleEditUserFromModal}
            />
            <ModelDeleteConfirm
                show={showModelConfirmDelete}
                handleClose={() => setShowModelConfirmDelete(false)}
                data={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />
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
