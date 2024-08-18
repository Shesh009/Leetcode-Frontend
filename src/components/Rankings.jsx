import React, { useState, useEffect } from "react";
import TableData from "./TableData";
import { fetchData } from "../store/UserProfile";
import LoadingSpinner from "./LoadingSpinner";

const Rankings = ({ loading, setLoading, userIDs }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchAllProfiles = async () => {
      setLoading(true);
      if (userIDs.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const profiles = await Promise.all(
          userIDs.map((userID) => fetchData(userID))
        );

        const validProfiles = profiles.filter((profile) => profile !== null);

        validProfiles.sort((a, b) => {
          const rankingA = a.profile.ranking;
          const rankingB = b.profile.ranking;
          return rankingA - rankingB;
        });

        setScores(validProfiles);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProfiles();
  }, [userIDs, setLoading]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <h1 className="table-heading head">LeetCode Rankings</h1>
      <h6 className="table-heading head1">
        University College of Engineering, Osmania University
      </h6>
      {userIDs.length === 0 ? (
        <div className="nodata">
          <img src="../No data.png" alt="LinkedIn" className="nodata-img"/>
          <h3>No Data</h3>
        </div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Local Rankings</th>
              <th scope="col">Leetcode Rankings</th>
              <th scope="col">Username</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <TableData key={index} score={score} index={index} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Rankings;
