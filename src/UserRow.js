function UserRow({ data }) {
    return (
        <tr>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.birthday}</td>
            <td>{data.gender ? 'Nam' : 'Nữ'}</td>
        </tr>
    );
}

export default UserRow;
