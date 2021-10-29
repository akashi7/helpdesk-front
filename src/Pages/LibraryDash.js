import { useEffect, useContext } from 'react';
import { StaffNavBar } from '../Components/AppBar';
import { UserContext } from '../Context/UserContext';
import { useHistory } from "react-router-dom";

export const LibraryDash = () => {

  const token = localStorage.getItem('token');

  const history = useHistory();

  const { libraReq, LibraryGetRequests } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      if (!token) {
        history.push("/");
      }
      else {
        await LibraryGetRequests(token);
      }
    })();
    //eslint-disable-next-line
  }, []);

  const viewRequest = async (id) => {
    localStorage.setItem("ID", id);
    history.push(`/library/viewReq/${id}`);
  };

  return (
    <div>
      <StaffNavBar />
      <div>
        {libraReq.library.length === 0 ?
          <div> You have no requests </div> :
          libraReq.library.map(({ id, service, time, regno, status }) => {
            return (
              <div key={id} className="requests" onClick={() => viewRequest(id)}>
                <p>{regno}</p>
                <p>{service}</p>
                {status === 'not viewed' ? <p style={{ color: "red" }}>Not viewed</p> : <p style={{ color: "green" }}>viewed</p>}
                <p>{time}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};
