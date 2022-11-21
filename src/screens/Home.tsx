import React from "react";
import { Link } from "react-router-dom";
import { users } from "../db";

const Home = () => {
  return (
    <div>
      <ul>
        {users.map((item) => (
          <li key={item.id}>
            <Link to={`/users/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
