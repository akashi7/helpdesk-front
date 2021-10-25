import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const Home = () => {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:8000` : url = ``;

  const history = useHistory();

  const [toLogin, setLogin] = useState(false);
  const [state, setState] = useState({
    regno: "",
    password: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div>
      {state.message ? <div style={{ textAlign: "center" }}>
        <p style={{ color: "red" }}>{state.message} </p>
      </div> : ""}
      {!(toLogin) ? <form onSubmit={(e) => Login(e)}>
        <input
          placeholder="Reg No"
          onChange={(e) => setState({ ...state, regno: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setState({ ...state, password: e.target.value })}
        />
        {isLoading ? <button>Loading....</button>
          : <button>Login</button>}
        <p>Forgot password?</p>
        <p onClick={(e) => toggle(e)} >Do not have account?</p>
      </form> :
        <form>
          <input
            placeholder="Reg No" />
          <button>Sign up</button>
          <p onClick={(e) => toggle(e)} >have account?</p>
        </form>
      }
    </div>
  );
};
