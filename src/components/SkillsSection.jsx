import React, { useState, useEffect } from "react";
import { fetchSkills } from "../store/UserProfile";
import LoadingSpinner from "./LoadingSpinner";

const SkillsSection = ({ username }) => {
  const [skillsData, setSkillsData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSkillsData = async () => {
      setLoading(true);
      try {
        const data = await fetchSkills(username); // Pass username as string
        if (data && data.matchedUser) {
          setSkillsData(data.matchedUser.tagProblemCounts);
        } else {
          setError("No data Found");
        }
      } catch (error) {
        console.error("Fetch Skills Error:", error);
        setError("Failed to fetch skills data");
      }
      setLoading(false);
    };

    if (username) {
      getSkillsData();
    }
  }, [username]);

  if (loading) return <LoadingSpinner/>;
  if (error) return <div className="loading-spinner">{error}</div>;
  if (!skillsData) return <div className="loading-spinner">No skills data available</div>;

  const advanced = skillsData.advanced || [];
  const intermediate = skillsData.intermediate || [];
  const fundamental = skillsData.fundamental || [];

  return (
    <div className="skills-section">
      <h2>Skills</h2>
      <div className="skills-category">
        <h3>Advanced</h3>
        <div className="skills-list">
          {advanced.map((skill) => (
            <SkillTag key={skill.tagSlug} skill={skill} />
          ))}
        </div>
      </div>
      <div className="skills-category">
        <h3>Intermediate</h3>
        <div className="skills-list">
          {intermediate.map((skill) => (
            <SkillTag key={skill.tagSlug} skill={skill} />
          ))}
        </div>
      </div>
      <div className="skills-category">
        <h3>Fundamental</h3>
        <div className="skills-list">
          {fundamental.map((skill) => (
            <SkillTag key={skill.tagSlug} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
};

const SkillTag = ({ skill }) => {
  return (
    <span className="skill-tag">
      {skill.tagName}{" "}
      <span className="skill-count">x{skill.problemsSolved}</span>
    </span>
  );
};

export default SkillsSection;
