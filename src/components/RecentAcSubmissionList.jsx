import React, { useState, useEffect } from "react";
import { fetchProblems } from "../store/UserProfile";
import LoadingSpinner from "./LoadingSpinner";

const RecentAcSubmissionList = ({ username }) => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSubmissions = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const data = await fetchProblems(username);

        if (data) {
          setSubmissions(data);
        } else {
          setError("No submissions data found");
        }
      } catch (error) {
        setError("Error fetching submissions data");
        console.error("Fetch error:", error); // Log detailed error
      }
      setLoading(false);
    };

    if (username) {
      getSubmissions();
    }
  }, [username]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="loading-spinner">Error: {error}</div>;
  if (!submissions || submissions.length === 0)
    return <div className="loading-spinner">No submissions available</div>;

  return (
    <div className="submission">
      <h2>Recent Submissions</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Submission Time</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <td>{submission.title}</td>
              <td>
                {new Date(submission.timestamp * 1000).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentAcSubmissionList;
