import { useState } from 'react';
import { useHistory } from 'react-router-dom';



export const StudentReg = () => {

  const regNo = localStorage.getItem('regno');

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:9000` : url = ``;

  const history = useHistory();

  const [state, setState] = useState({
    phone: "",
    full_names: "",
    department: "",
    password: "",
    confirmPassword: "",
    message: ""
  });

  const [isLoading, setIsLoading] = useState(false);


  const completeSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state)
    };

    const res = await (await fetch(`${url}/auth/provideInfo?regno=${regNo}`, config)).json();
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
  };




  return (
    <div>
      {state.message ? <div style={{ textAlign: "center" }}>
        <p style={{ color: "red" }}>{state.message} </p>
      </div> : ""}
      <form onSubmit={(e) => completeSignUp(e)}>
        <input placeholder="Full names"
          required
          onChange={(e) => setState({ ...state, full_names: e.target.value })}
        />
        <input placeholder="Tel"
          required
          onChange={(e) => setState({ ...state, phone: e.target.value })} />
        <select onChange={(e) => setState({ ...state, department: e.target.value })} >
          <option>--Select department--</option>
          <option>IT</option>
          <option>EEE</option>
          <option>CID</option>
        </select>
        <input placeholder="Password"
          type="password"
          required
          onChange={(e) => setState({ ...state, password: e.target.value })} />
        <input placeholder="Confirm password"
          type="password"
          required
          onChange={(e) => setState({ ...state, confirmPassword: e.target.value })}
        />
        {isLoading ? <button>Loading....</button>
          : <button>Send</button>}
      </form>
    </div>
  );
};
