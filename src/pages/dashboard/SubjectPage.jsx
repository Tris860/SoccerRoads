// src/pages/dashboard/SubjectPage.jsx
import React from "react";

const SubjectPage = ({ title }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>
        This is placeholder content for <strong>{title}</strong>. Put your
        lessons, videos, or questions here.
      </p>
    </div>
  );
};

export default SubjectPage;