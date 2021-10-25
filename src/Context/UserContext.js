import { createContext, useReducer } from "react";
import { useHistory } from 'react-router-dom';
import { UserReducer } from "./UserReducer";

const initialState = {
  FinanceReq: {
    finance: []
  },
  FinanceViewReq: {
    fdata: []
  }
};

export const UserContext = createContext(initialState);
export const UserProvider = ({ children }) => {

  let url;
  process.env.NODE_ENV === "development" ? url = `http://localhost:8000` : url = ``;

  const History = useHistory();

  const [state, dispatch] = useReducer(UserReducer, initialState);

  //finance get all requests

  const FinanceGetRequests = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/staff/financeRequests`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'FINANCE_REQUESTS',
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/');
    }
  };

  //finance view Request

  const FinanceviewRequest = async (token, id) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/staff/financeViewRequest?id=${id}`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'FINANCE_VIEW_REQUEST',
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/');
    }
  };


  return (
    <UserContext.Provider value={
      {
        ...state, FinanceGetRequests, FinanceviewRequest
      }
    }>
      {children}
    </UserContext.Provider>
  );

};