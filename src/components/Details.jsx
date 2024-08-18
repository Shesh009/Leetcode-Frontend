import React, { useState, useEffect } from "react";
import { fetchData } from "../store/UserProfile";
import LoadingSpinner from "./LoadingSpinner";

const Details = ({ username }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchData(username);
      if (data) {
        setProfile(data);
      } else {
        setError("No profile Found");
      }
      setLoading(false);
    };

    if (username) {
      getData();
    }
  }, [username]);

  if (loading) return <LoadingSpinner/>;
  if (error) return <div className="loading-spinner">{error}</div>;
  if (!profile) return <div className="loading-spinner">No profile data available</div>;

  return (
    <div className="detail-card">
      <img
        src={profile.profile.userAvatar}
        className="card-img-top profile-image"
        alt="User Avatar"
      />
      <div className="card-body">
        <h5 className="card-title">Name : {profile.profile.realName}</h5>
        <h5 className="card-title">
          Username :{" "}
          <a href={`https://leetcode.com/u/${profile.username}/`}>
            {profile.username}
          </a>
        </h5>
        <h5 className="card-text">Rank: {profile.profile.ranking}</h5>
        <div className="icons">
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
            <img src="../Github.png" alt="GitHub" className="github" />
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="../linkedin.png" alt="LinkedIn" className="linkedin" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Details;
