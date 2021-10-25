import { useHistory } from "react-router-dom";

export const StudentNavBar = () => {

  const history = useHistory();

  function logOut() {
    localStorage.clear();
    history.push('/');
  }
  return (
    <div className="student-bar">
      <h3>Dashboard</h3>
      <div className="links">
        <p>History</p>
        <p onClick={() => logOut()}>Log out</p>
      </div>
    </div>
  );
};

export const StaffNavBar = () => {
  const history = useHistory();

  function logOut() {
    localStorage.clear();
    history.push('/');
  }
  return (
    <div className="student-bar">
      <h3>Dashboard</h3>
      <div className="links">
        <p onClick={() => logOut()}>Log out</p>
      </div>
    </div>
  );
};