import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { HomeBar } from "../Components/AppBar";

export const ForgotPassword = () => {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:9000` : url = ``;

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  const [message, setMessage] = useState(false);
  const [state, setState] = useState({
    regno: "",
    password: "",
    message: "",
    confirmPassword: "",
    phone: ""
  });

  const ForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state)
    };
    const res = await (await fetch(`${url}/student/forgotPassword`, config)).json();
    if (res.status === 200) {
      setLoading(false);
      setIsTrue(true);
      localStorage.setItem("regNo", res.regno);
    }
    else if (res.status === 300) {
      setLoading(false);
      setState({ ...state, message: res.message });
      setTimeout(() => {
        setState({ ...state, message: '' });
      }, 4000);
    }
  };

  const ResetPassword = async (e) => {

    e.preventDefault();
    setLoading(true);

    const regno = localStorage.getItem("regNo");
    const config = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state)
    };
    const res = await (await fetch(`${url}/student/resetPassword?regno=${regno}`, config)).json();

    if (res.status === 200) {
      setMessage("Successfully reset!!!!");
      setTimeout(() => {
        history.push("/student");
      }, 4000);

    }
    else if (res.status === 300) {
      setLoading(false);
      setState({ ...state, message: res.message });
      setTimeout(() => {
        setState({ ...state, message: '' });
      }, 4000);
    }
    else if (res.status === 409) {
      setState({ ...state, message: res.error });
      setTimeout(() => {
        setState({ ...state, message: '' });
      }, 4000);
      setLoading(false);
    }

  };
  return (
    <div>
      <HomeBar />
      {message ? <div style={{ textAlign: "center", width: "100%", padding: "10px", backgroundColor: "green" }}>
        <p style={{ color: "white" }}>{message} </p>
      </div> : ""}
      {state.message ? <div style={{ textAlign: "center", width: "100%", padding: "10px", backgroundColor: "red" }}>
        <p style={{ color: "white" }}>{state.message} </p>
      </div> : ""}
      {isTrue ?
        <div className="home-div">
          <form onSubmit={(e) => ResetPassword(e)}>
            <p>RESET PASSWORD</p>
            <input
              placeholder="Password"
              required
              type="password"
              className="input"
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
            <input
              placeholder="Confirm password"
              type="password"
              required
              className="input"
              onChange={(e) => setState({ ...state, confirmPassword: e.target.value })}
            />
            {loading ? <button className="button" >RESETING......</button> : <button className="button" >RESET</button>}
          </form>
        </div> :
        <div className="home-div">
          <form onSubmit={(e) => ForgotPassword(e)}>
            <p>FORGOT PASSWORD?</p>
            <input
              placeholder="Reg No"
              required
              className="input"
              onChange={(e) => setState({ ...state, regno: e.target.value })}
            />
            <input
              placeholder="Phone"
              type="text"
              required
              className="input"
              onChange={(e) => setState({ ...state, phone: e.target.value })}
            />
            {loading ? <button className="button" >SENDING.....</button> : <button className="button" >SEND</button>}
          </form>
        </div>}

    </div>
  );
};

