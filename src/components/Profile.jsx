import React from "react";
import { useParams } from "react-router-dom";
import ProblemStats from "./ProblemStats";
import SkillsSection from "./SkillsSection";
import MainProfile from "./MainProfile";
import Details from "./Details";

const Profile = () => {
  const { username } = useParams();
  return (
    <div className="profile-page">
      <div className="div1">
        <Details username={username} />
        <SkillsSection username={username} />
      </div>
      <MainProfile username={username} />
    </div>
  );
};

export default Profile;
