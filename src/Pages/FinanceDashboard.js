import { useEffect, useContext } from 'react';
import { StaffNavBar } from '../Components/AppBar';
import { UserContext } from '../Context/UserContext';
import { useHistory } from "react-router-dom";

export const FinanceDashboard = () => {

  const token = localStorage.getItem('token');

  const history = useHistory();

  const { FinanceReq, FinanceGetRequests } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      if (!token) {
        history.push("/");
      }
      else {
        await FinanceGetRequests(token);
      }
    })();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <StaffNavBar />
      <div>
        {FinanceReq.finance.length === 0 ?
          <div> You have no requests </div> :
          FinanceReq.finance.map(({ id, service, time, regno, status }) => {
            return (
              <div key={id} className="requests">
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
