import { useEffect, useContext, useState } from 'react';
import { StaffNavBar } from '../Components/AppBar';
import { useHistory } from "react-router-dom";
import { UserContext } from '../Context/UserContext';
import Qrcode from 'qrcode.react';

export const WadenViewReq = () => {

  const token = localStorage.getItem('token');
  const id = localStorage.getItem("ID");

  const history = useHistory();

  let url;
  process.env.NODE_ENV === "development" ? url = `http://localhost:9000` : url = ``;

  const { WadenViewReq, WadenviewRequest } = useContext(UserContext);

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!token) {
        history.push("/");
      }
      else {
        await WadenviewRequest(token, id);
      }
    })();
    //eslint-disable-next-line
  }, []);

  const approve = async (e, regno, service, phone, formslip, department, year) => {
    e.preventDefault();
    const tel = '0786399098';
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/staff/wadenSendTolibrary?regno=${regno}&&service=${service}&&phone=${phone}&&formslip=${formslip}&&department=${department}&&year=${year}&&tel=${tel}`, config)).json();
    if (res.status === 200) {
      setMessage('File sent succesfully');
      setTimeout(() => {
        history.push('/wadenDash');
      }, 4000);
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push('/');
    }
  };

  const Reject = async (e, regno, service, phone) => {


    e.preventDefault();
    setLoading(true);
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };

    const res = await (await fetch(`${url}/staff/wadenreject?regno=${regno}&&service=${service}&&phone=${phone}`, config)).json();
    if (res.status === 200) {
      setMessage('File Rejected succesfully');
      setTimeout(() => {
        history.push('/wadenDash');
      }, 4000);
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/');
    }
    else if (res.status === 307) {
      setLoading(false);
      setMessage(res.message);
    }
  };

  return (
    <div>
      <StaffNavBar />
      {message ? <div style={{ backgroundColor: "darkgreen", width: "100%", padding: "8px", textAlign: "center" }}>
        <p style={{ color: "whitesmoke" }}>{message}</p>
      </div> : ""}
      <div>
        {WadenViewReq.wadendata.map(({ id, phone, formslip, regno, service, qrcode, department, year }) => {
          return (
            <div key={id} className="staff-view">
              <p>Student regno : {regno} </p>
              <p>Service : {service} </p>
              <p>Dep : {department} </p>
              <p>YEAR: {year} </p>
              <br></br>
              <br></br>
              <img src={formslip} alt="formslip" width="600" />
              <br></br>
              <br></br>
              <div>
                <Qrcode
                  value={qrcode}
                  size={128}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"L"}
                  includeMargin={false}
                  renderAs={"svg"}
                />
              </div>
              <br></br>
              <br></br>
              <button onClick={(e, u, i, k, t, v, l) => approve(e, regno, service, phone, formslip, department, year)} > Approve doc </button>
              {loading ? <button className="buttonB">Loading....</button> : <button onClick={(e, i, k, l) => Reject(e, regno, service, phone)} className="buttonB" >Reject</button>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
