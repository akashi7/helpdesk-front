import { createContext, useReducer } from "react";
import { useHistory } from 'react-router-dom';
import { UserReducer } from "./UserReducer";

const initialState = {
  FinanceReq: {
    finance: []
  },
  FinanceViewReq: {
    fdata: []
  },
  wadenReq: {
    waden: []
  },
  WadenViewReq: {
    wadendata: []
  },
  libraReq: {
    library: []
  },
  LibraryViewReq: {
    libdata: []
  },
  HodReq: {
    HOD: []
  },
  HodViewReq: {
    hodData: []
  },
  StudentFiles: {
    files: []
  }
};

export const UserContext = createContext(initialState);
export const UserProvider = ({ children }) => {

  let url;
  process.env.NODE_ENV === "development" ? url = `http://localhost:9000` : url = ``;

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

  //waden get all requests

  const WadenGetRequests = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/staff/wadenRequests`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'WADEN_REQUESTS',
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/');
    }
  };

  //waden view Request
  const WadenviewRequest = async (token, id) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/staff/wadenViewRequest?id=${id}`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'WADEN_VIEW_REQUEST',
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/');
    }
  };

  //libary get all requests

  const LibraryGetRequests = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/staff/librayRequests`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'LIBRARY_REQUESTS',
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/');
    }
  };

  //library view request

  const LibraryviewRequest = async (token, id) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/staff/libraryViewRequest?id=${id}`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'LIBRARY_VIEW_REQUEST',
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/');
    }
  };

  //Hod get all Request
  const HODGetRequests = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/staff/hodRequests`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'HOD_REQUESTS',
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/');
    }
  };

  //Hod view request

  const HODviewRequest = async (token, id) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/staff/hodViewRequest?id=${id}`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'HOD_VIEW_REQUEST',
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/');
    }
  };

  //studen view files

  const studentViewFiles = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/student/yourFiles`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'STUDENT_FILES',
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
        ...state, FinanceGetRequests, FinanceviewRequest, WadenGetRequests, WadenviewRequest,
        LibraryGetRequests, LibraryviewRequest, HODGetRequests, HODviewRequest, studentViewFiles
      }
    }>
      {children}
    </UserContext.Provider>
  );

};