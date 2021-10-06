import React, { useEffect, useState } from "react";
import userService from "../services/users";
import { Link } from "react-router-dom";

const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userService.getAll().then((response) => {
      console.log(response);
      setUsers(response);
    });
  }, []);
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th />
            <th>
              <strong>blogs created</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShowUsers;
