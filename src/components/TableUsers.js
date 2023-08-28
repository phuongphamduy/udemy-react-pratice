import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchListUser } from '../services/UserService';

function TableUsers() {
    const [listUsers, setListUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        let res = await fetchListUser();

        if (res && res.data && res.data.data) {
            setListUsers(res.data.data);
        }
    };

    return (
        <div>
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
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </div>
    );
}

export default TableUsers;
