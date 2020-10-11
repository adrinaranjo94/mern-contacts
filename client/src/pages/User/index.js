import React from "react";

export const UserPage = (props) => {
  return <div>User page : {props.match.params.userId}</div>;
};
