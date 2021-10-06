import React, { useEffect, useState } from "react";
import userService from "../services/users";
import { useParams } from "react-router-dom";

const IndividualUser = () => {
  const id = useParams().id;
  const [user, setUser] = useState(null);
  useEffect(() => {
    userService.getUser(id).then((response) => {
      console.log(response);
      setUser(response);
    });
  }, [id]);
  return (
    <div>
      {user !== null && (
        <div>
          <h2>{user.name}</h2>
          <h2>added blogs</h2>
          <ul>
            {user.blogs.map((blog) => {
              return <li key={blog.id}>{blog.title}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IndividualUser;
