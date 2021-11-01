import { useHistory } from "react-router-dom";

export const StudentNavBar = () => {

  const history = useHistory();

  function logOut() {
    localStorage.clear();
    history.push('/');
  }
  return (
    <div className="student-bar">
      <h3 onClick={() => history.push('/dashboard')} className="link">Dashboard</h3>
      <div className="links">
        <p onClick={() => history.push('/files')} className="link" >Results</p>
        <p onClick={() => logOut()} className="link">Log out</p>
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
        <p onClick={() => logOut()} className="link">Log out</p>
      </div>
    </div>
  );
};

export const HomeBar = () => {

  return (
    <div className="student-bar">
      <h3>Help desk</h3>
    </div>
  );
};