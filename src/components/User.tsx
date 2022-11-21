import React from "react";
import { useParams } from "react-router-dom";
import { users } from "../db";

const User = () => {
  const { userId } = useParams();
  return (
    <div>
      User with it {userId} is namede: {users[Number(userId) - 1].name}
    </div>
  );
};

export default User;
