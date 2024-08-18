import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingSpinner from "./LoadingSpinner";

const ProblemStats = ({ username }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `https://leetcode-vxyr.onrender.com/leetcode/stats/?username=${username}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        const formattedData = {
          easy: {
            solved:
              result.matchedUser.submitStatsGlobal.acSubmissionNum.find(
                (stat) => stat.difficulty === "Easy"
              )?.count || 0,
            total:
              result.allQuestionsCount.find((q) => q.difficulty === "Easy")
                ?.count || 0,
            label: "Easy",
            color: "#00C1C1",
          },
          medium: {
            solved:
              result.matchedUser.submitStatsGlobal.acSubmissionNum.find(
                (stat) => stat.difficulty === "Medium"
              )?.count || 0,
            total:
              result.allQuestionsCount.find((q) => q.difficulty === "Medium")
                ?.count || 0,
            label: "Medium",
            color: "#FFA500",
          },
          hard: {
            solved:
              result.matchedUser.submitStatsGlobal.acSubmissionNum.find(
                (stat) => stat.difficulty === "Hard"
              )?.count || 0,
            total:
              result.allQuestionsCount.find((q) => q.difficulty === "Hard")
                ?.count || 0,
            label: "Hard",
            color: "#FF4500",
          },
        };
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("No Data Found");
      }
    };

    fetchStats();
  }, [username]);

  if (error) return <div className="loading-spinner">{error}</div>;
  if (!data) return <LoadingSpinner />;

  const totalSolved = Object.values(data).reduce(
    (acc, difficulty) => acc + difficulty.solved,
    0
  );
  const totalProblems = Object.values(data).reduce(
    (acc, difficulty) => acc + difficulty.total,
    0
  );

  return (
    <div className="cards">
      {Object.values(data).map((difficulty, index) => (
        <div
          key={index}
          className="score-card"
          style={{ color: difficulty.color }}
        >
          <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            {difficulty.label}
          </div>
          <div style={{ fontSize: "1.5rem", color: "#fff" }}>
            {difficulty.solved}/{difficulty.total}
          </div>
        </div>
      ))}
      <div className="score-card">
        <div
          style={{ fontWeight: "bold", fontSize: "1.2rem", color: "yellow" }}
        >
          Total Solved
        </div>
        <div style={{ fontSize: "1.5rem", color: "#fff" }}>
          {totalSolved}/{totalProblems}
        </div>
      </div>
    </div>
  );
};

export default ProblemStats;
