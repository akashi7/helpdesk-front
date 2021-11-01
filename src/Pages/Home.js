import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HomeBar } from '../Components/AppBar';

export const Home = () => {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:9000` : url = ``;

  const history = useHistory();

  const [toLogin, setLogin] = useState(false);
  const [state, setState] = useState({
    regno: "",
    password: "",
    message: "",
    loading: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  function toggle(e) {
    e.preventDefault();
    if (toLogin) {
      setLogin(false);
    }
    else setLogin(true);
  }

  const Login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state)
    };

    const res = await (await fetch(`${url}/auth/student-login`, config)).json();

    if (res.status === 200) {
      localStorage.setItem("token", res.token);
      history.push("/dashboard");
    }
    else if (res.status === 409) {
      setState({ ...state, message: res.error });
      setIsLoading(false);
    }
    else if (res.status === 205) {
      setState({ ...state, message: res.message });
      setIsLoading(false);
    }
    else if (res.status === 207) {
      setState({ ...state, message: res.message });
      setIsLoading(false);
    }
  };

  const signUp = async (e) => {
    e.preventDefault();

    const config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state)
    };
    setState({ ...state, loading: true });
    const res = await (await fetch(`${url}/auth/schollRegister`, config)).json();

    if (res.status === 200) {
      localStorage.setItem("regno", res.regno);
      history.push("/studentReg");
    }
    else if (res.status === 302) {
      setMessage(res.message);
      setState({ ...state, loading: false });
    }
  };

  return (
    <div>
      <HomeBar />
      {state.message ? <div style={{ textAlign: "center" }}>
        <p style={{ color: "red" }}>{state.message} </p>
      </div> : ""}
      <div className="home-div">
        {!(toLogin) ? <form onSubmit={(e) => Login(e)}>
          <p>STUDENT LOGIN</p>
          <input
            placeholder="Reg No"
            required
            className="input"
            onChange={(e) => setState({ ...state, regno: e.target.value })}
          />
          <input
            placeholder="Password"
            type="password"
            required
            className="input"
            onChange={(e) => setState({ ...state, password: e.target.value })}
          />
          {isLoading ? <button className="button" >Loading....</button>
            : <button className="button" >Login</button>}
          <p onClick={(e) => toggle(e)} >Do not have account?</p>
        </form> :
          <form onSubmit={(e) => signUp(e)}>
            <p>STUDENT SIGN UP</p>
            {message ? <div style={{ textAlign: "center" }}>
              <p style={{ color: "red" }}>{message} </p>
            </div> : ""}
            <input
              placeholder="Reg No"
              onChange={(e) => setState({ ...state, regno: e.target.value })}
              className="input"
              required />
            {state.loading ? <button className="button" >Loading....</button> : <button className="button" >Sign up</button>}
            <p onClick={(e) => toggle(e)} >have account?</p>
          </form>
        }
      </div>
    </div>
  );
};
