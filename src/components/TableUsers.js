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
import Papa from 'papaparse';
import { toast } from 'react-toastify';

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

    const [exportResult, setExportResult] = useState([]);
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
    }, 500);

    const handleExportResult = (event, done) => {
        let result = [];
        result.push(['Id', 'Email', 'First name', 'Last name']);
        listUsers.map((item, index) => {
            let arr = [];
            let values = Object.values(item);
            for (let i = 0; i < values.length - 1; i++) {
                arr[i] = values[i];
            }
            result.push(arr);
        });
        setExportResult(result);
        done(true);
    };

    const handleImportFile = (e) => {
        if (e.target && e.target.files[0]) {
            let file = e.target.files[0];
            if (file.type !== 'text/csv') {
                toast.error('Only accept csv file');
                return;
            }

            Papa.parse(file, {
                complete: function (results) {
                    let rawCsv = results.data;
                    if (rawCsv.length > 0) {
                        if (
                            rawCsv[0][0] !== 'email' ||
                            rawCsv[0][1] !== 'first_name' ||
                            rawCsv[0][2] !== 'last_name' ||
                            rawCsv[0].length !== 3
                        ) {
                            toast.error('Wrong format header');
                        } else {
                            let result = [];

                            rawCsv.map((item, index) => {
                                if (index > 0 && item.length === 3) {
                                    let obj = {};
                                    obj.email = item[0];
                                    obj.first_name = item[1];
                                    obj.last_name = item[2];
                                    result.push(obj);
                                }
                            });
                            setListUsers(result);
                            console.log('finished:', results.data);
                        }
                    } else {
                        toast.error('Don hanve data in files');
                    }
                },
            });
        }
    };

    return (
        <div>
            <div className="my-3 d-sm-flex justify-content-between align-items-center">
                <span>
                    <b>List Users:</b>
                </span>
                <div className="d-flex">
                    <label htmlFor="inputFile" className="btn btn-warning">
                        <i className="fa-solid fa-file-import"></i> Import
                    </label>
                    <input type="file" hidden id="inputFile" onChange={handleImportFile} />
                    <CSVLink
                        filename={'users.csv'}
                        className="btn btn-primary mx-2"
                        data={exportResult}
                        asyncOnClick={true}
                        onClick={handleExportResult}
                    >
                        <i className="fa-solid fa-file-export"></i> Export
                    </CSVLink>

                    <button className="btn btn-success" onClick={() => setShowModelAddUser(true)}>
                        <i className="fa-solid fa-circle-plus"></i> Add user
                    </button>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 my-3">
                <input placeholder="search by email" className="form-control" onChange={(e) => handleSearch(e)} />
            </div>
            <div className="customize-table">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                <div className="sort-header">
                                    <span>Id</span>
                                    <span>
                                        <i
                                            onClick={() => handleSort('asc', 'id')}
                                            className="fa-solid fa-arrow-up-z-a"
                                        ></i>
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
                                        <td className="d-flex btns-group">
                                            <button
                                                className="btn btn-warning me-2"
                                                onClick={() => handleUpdateUser(item)}
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDeleteConfirm(item)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </div>
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
