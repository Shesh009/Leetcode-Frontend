import React from "react";
import { Link, useNavigate } from "react-router-dom";

const TableData = ({ score, index }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/profile/${score.username}`);
  };
  return (
    <tr>
      <th>{index + 1}</th>
      <th scope="row">{score.profile.ranking}</th>
      <td>
        <Link to={`/profile/${score.username}`} onClick={handleClick}>
          {score.username}
        </Link>
      </td>
      <td>{score.profile.realName}</td>
    </tr>
  );
};

export default TableData;