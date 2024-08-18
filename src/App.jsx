import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Rankings from "./components/Rankings";
import { useState, useEffect } from "react";
import { fetchIDs } from "./store/UserProfile";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [loading, setLoading] = useState(true);
  const [userIDsData, setUserIDsData] = useState([]);

  const fetchAndSetUserIDs = async () => {
    setLoading(true);
    const ids = await fetchIDs();
    if (ids) {
      const usernames = ids.map(id => id.username);
      setUserIDsData(usernames);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAndSetUserIDs();
  }, []);

  return (
    <>
      {<Rankings loading={loading} setLoading={setLoading} userIDs={userIDsData} />}
    </>
  );
}

export default App;
