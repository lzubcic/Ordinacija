import { useEffect, useState } from "react";
import { userService } from "../../../services/user.service";
import EditUser from "./EditUser";
import { Modal } from "react-bootstrap";

const Users = () => {
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const fetchedUsers = await userService.getAllUsers();
    const users = await fetchedUsers;

    setUsers(users);
  };

  const userToEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const onSave = async () => {
    setShowModal(false);
    await fetchUsers();
  };

  const onDelete = async (user) => {
    await userService.deleteUser(user.id);
    await fetchUsers();
  };

  return (
    <table className="container my-4 table table-bordered">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Username</th>
          <th scope="col">First name</th>
          <th scope="col">Last name</th>
          <th scope="col">Authorities</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user.id}>
            <th scope="row">{user.id}</th>
            <td>{user.username}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user?.authorities}</td>
            <td>
              <button
                className="btn btn-warning mx-3"
                onClick={() => userToEdit(user)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  window.confirm(
                    "Are you sure you want to delete " + user.username + "?"
                  ) && onDelete(user);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditUser user={selectedUser} onSave={onSave} />
        </Modal.Body>
      </Modal>
    </table>
  );
};

export default Users;
