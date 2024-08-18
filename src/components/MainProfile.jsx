import ProblemStats from "./ProblemStats";
import RecentAcSubmissionList from  "./RecentAcSubmissionList";
const MainProfile = ({ username }) => {
  return (
    <>
      <div className="div2">
        <ProblemStats username={username} />
         <RecentAcSubmissionList username={username}/>
      </div>
    </>
  );
};

export default MainProfile;
