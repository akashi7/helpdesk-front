import { useEffect, useContext } from 'react';
import { StaffNavBar } from '../Components/AppBar';
import { UserContext } from '../Context/UserContext';
import { useHistory } from "react-router-dom";

export const WadenDash = () => {
  const token = localStorage.getItem('token');

  const history = useHistory();

  const { wadenReq, WadenGetRequests } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      if (!token) {
        history.push("/");
      }
      else {
        await WadenGetRequests(token);
      }
    })();
    //eslint-disable-next-line
  }, []);

  const viewRequest = async (id) => {
    localStorage.setItem("ID", id);
    history.push(`/waden/viewReq/${id}`);
  };
  return (
    <div>
      <StaffNavBar />
      <div>
        {wadenReq.waden.length === 0 ?
          <div> You have no requests </div> :
          wadenReq.waden.map(({ id, service, time, regno, status }) => {
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
