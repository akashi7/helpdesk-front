import { useState } from 'react';
import { useHistory } from "react-router-dom";

export const StaffLogin = () => {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:8000` : url = ``;

  const history = useHistory();

  const [state, setState] = useState({
    code: "",
    password: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state)
    };
    const res = await (await fetch(`${url}/auth/staff-login`, config)).json();

    if (res.status === 201) {
      localStorage.setItem("token", res.token);
      history.push("/dashboard");
    }
    if (res.status === 202) {
      localStorage.setItem("token", res.token);
      history.push("/dashboard");
    }
    if (res.status === 203) {
      localStorage.setItem("token", res.token);
      history.push("/dashboard");
    }
    if (res.status === 204) {
      localStorage.setItem("token", res.token);
      history.push("/financeDash");
    }
    else if (res.status === 205) {
      setState({ ...state, message: res.message });
      setIsLoading(false);
    }
    else if (res.status === 207) {
      setState({ ...state, message: res.message });
      setIsLoading(false);
    }
    else if (res.status === 409) {
      setState({ ...state, message: res.error });
      setIsLoading(false);
    }
  };

  return (
    <div>
      {state.message ? <div style={{ textAlign: "center" }}>
        <p style={{ color: "red" }}>{state.message} </p>
      </div> : ""}
      <form onSubmit={e => login(e)}>
        <input placeholder="Code"
          type="text"
          onChange={(e) => setState({ ...state, code: e.target.value })}
        />
        <input placeholder="Password"
          type="password"
          onChange={(e) => setState({ ...state, password: e.target.value })}
        />
        {isLoading ? <button>Loading....</button> : <button>Login</button>}
      </form>
    </div>
  );
};