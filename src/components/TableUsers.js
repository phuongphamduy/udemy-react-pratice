import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchListUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModelAddNew from './ModelAddUser';
import ModelEditUser from './ModelEditUser';
import _, { debounce } from 'lodash';
import ModelDeleteConfirm from './ModelDeleteConfirm';
import './TableUser.scss';
import { CSVLink } from 'react-csv';

function TableUsers() {
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [showModelAddUser, setShowModelAddUser] = useState(false);

    const [showModelEditUser, setShowEditUser] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const [showModelConfirmDelete, setShowModelConfirmDelete] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [sortBy, setSortBy] = useState('asc');
    const [sortField, setSortField] = useState('id');
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

    const handleSort = (by, field) => {
        setSortBy(by);
        setSortField(field);

        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = _.orderBy(cloneListUsers, [field], [by]);
        setListUsers(cloneListUsers);
    };

    const handleSearch = debounce((e) => {
        let term = e.target.value;
        console.log(term);
        if (term) {
            let cloneListUsers = _.cloneDeep(listUsers);
            cloneListUsers = cloneListUsers.filter((item) => item.email.includes(term));
            setListUsers(cloneListUsers);
        } else {
            getUsers(1);
        }
    }, 2000);

    const csvData = [
        ['firstname', 'lastname', 'email'],
        ['Ahmed', 'Tomi', 'ah@smthing.co.com'],
        ['Raed', 'Labes', 'rl@smthing.co.com'],
        ['Yezzi', 'Min l3b', 'ymin@cocococo.com'],
    ];

    return (
        <div>
            <div className="my-3 d-flex justify-content-between align-items-center">
                <span>
                    <b>List Users:</b>
                </span>
                <div>
                    <label htmlFor="inputFile" className="btn btn-warning">
                        <i class="fa-solid fa-file-import"></i> Import
                    </label>
                    <input type="file" hidden id="inputFile" />
                    <CSVLink filename={'users.csv'} className="btn btn-primary mx-2" data={csvData}>
                        <i class="fa-solid fa-file-export"></i> Export
                    </CSVLink>

                    <button className="btn btn-success" onClick={() => setShowModelAddUser(true)}>
                        <i class="fa-solid fa-circle-plus"></i> Add user
                    </button>
                </div>
            </div>
            <div className="col-4 my-3">
                <input placeholder="search by email" className="form-control" onChange={(e) => handleSearch(e)} />
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <div className="sort-header">
                                <span>Id</span>
                                <span>
                                    <i onClick={() => handleSort('asc', 'id')} className="fa-solid fa-arrow-up-z-a"></i>
                                    <i
                                        onClick={() => handleSort('desc', 'id')}
                                        className="fa-solid fa-arrow-down-z-a"
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>
                            <div className="sort-header">
                                <span>Email</span>
                                <span>
                                    <i
                                        onClick={() => handleSort('asc', 'email')}
                                        className="fa-solid fa-arrow-up-z-a"
                                    ></i>
                                    <i
                                        onClick={() => handleSort('desc', 'email')}
                                        className="fa-solid fa-arrow-down-z-a"
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>
                            <div className="sort-header">
                                <span>First name</span>
                                <span>
                                    <i
                                        onClick={() => handleSort('asc', 'first_name')}
                                        className="fa-solid fa-arrow-up-z-a"
                                    ></i>
                                    <i
                                        onClick={() => handleSort('desc', 'first_name')}
                                        className="fa-solid fa-arrow-down-z-a"
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>
                            <div className="sort-header">
                                <span>Last name</span>
                                <span>
                                    <i
                                        onClick={() => handleSort('asc', 'last_name')}
                                        className="fa-solid fa-arrow-up-z-a"
                                    ></i>
                                    <i
                                        onClick={() => handleSort('desc', 'last_name')}
                                        className="fa-solid fa-arrow-down-z-a"
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>Action</th>
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
