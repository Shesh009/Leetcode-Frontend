import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export const fetchData = async (username) => {
  try {
    const response = await fetch(
      `https://leetcode-vxyr.onrender.com/leetcode/profile/?username=${username}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const fetchSkills = async (username) => {
  try {
    const response = await fetch(
      `https://leetcode-vxyr.onrender.com/leetcode/skills/?username=${username}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching skills data:", error);
    return null;
  }
};

export const fetchProblems = async (username) => {
  try {
    const response = await fetch(
      `https://leetcode-vxyr.onrender.com/leetcode/problems/?username=${username}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching skills data:", error);
    return null;
  }
};

export const fetchIDs = async () => {
  try {
    const response = await fetch(
      `https://leetcode-vxyr.onrender.com/leetcode/ids`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching skills data:", error);
    return null;
  }
};

const UserProfile = ({ username }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData(username);
      if (data) {
        setProfile(data);
      } else {
        setError("Failed to fetch data");
      }
    };

    getData();
  }, [username]);

  if (error) return <div>Error: {error}</div>;
  if (!profile) return <LoadingSpinner />;

  return (
    <div>
      <h1>{profile.username}</h1>
      <h1>{profile.profile.ranking}</h1>
      <h1>{profile.profile.realName}</h1>
    </div>
  );
};

export default UserProfile;
