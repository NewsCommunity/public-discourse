import React, { Component } from "react";
import { Link } from "react-router-dom";

const DiscourseCard = (props) => {
  const { discourseUrl, discourseTitle, discourseDescription } = props;
  return (
    <div className="discourse-card">
      <Link to={discourseUrl}>{discourseTitle}</Link>
      <p>{discourseDescription}</p>
    </div>
  );
};

export default DiscourseCard;
