import { useEffect, useContext, useState } from 'react';
import { StaffNavBar } from '../Components/AppBar';
import { useHistory } from "react-router-dom";
import { UserContext } from '../Context/UserContext';
import Qrcode from 'qrcode.react';
import Dropzone from "react-dropzone";

export const HodViewReq = () => {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem("ID");

  const history = useHistory();

  let url;
  process.env.NODE_ENV === "development" ? url = `http://localhost:9000` : url = ``;

  const { HODviewRequest, HodViewReq } = useContext(UserContext);

  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  const [state, setState] = useState({
    file: {},
    message: ""
  });

  const onDrop = File => {

    if (File.length > 0) {
      setFile(File[0].name);
      setState({ ...state, file: File[0] });
    }

  };


  useEffect(() => {
    (async () => {
      if (!token) {
        history.push("/");
      }
      else {
        await HODviewRequest(token, id);
      }
    })();
    //eslint-disable-next-line
  }, []);


  const SendFile = async (e, phone, regno, service, year) => {
    e.preventDefault();
    setLoading(true);

    let formData = new FormData();
    formData.append('file', state.file);

    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    };
    const res = await (await fetch(`${url}/staff/sendFile?phone=${phone}&&regno=${regno}&&service=${service}&&year=${year}`, config)).json();

    if (res.status === 200) {
      setSuccess(true);
      setTimeout(() => {
        history.push('/hodDash');
      }, 4000);
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push(`/staff`);
    }
    else if (res.status === 300) {
      setLoading(false);
      setState({ ...state, message: res.message });
    }
    else if (res.status === 307) {
      setLoading(false);
      setState({ ...state, message: res.message });
    }
  };


  return (
    <div>
      <StaffNavBar />
      {state.message ? <div style={{ backgroundColor: "red", width: "100%", padding: "8px", textAlign: "center" }}>
        <p style={{ color: "whitesmoke" }}>{state.message}</p>
      </div> : ""}
      {success ? <div style={{ width: "100%", padding: "7px", textAlign: "center", backgroundColor: "green" }}>
        <p style={{ color: "whitesmoke" }}>Request sent succesfully  </p>
      </div> : ""}
      <div className="staff-view">
        {HodViewReq.hodData.map(({ id, phone, formslip, regno, service, qrcode, department, year }) => {
          return (
            <div key={id}>
              <p>Student regno : {regno} </p>
              <p>Service : {service} </p>
              <p>Dep : {department} </p>
              <p>Dep : {year} </p>
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
              <form onSubmit={(e, i, k, j, m) => SendFile(e, phone, regno, service, year)} >
                <Dropzone multiple={false}
                  onDrop={onDrop}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <h3>Upload {service} file </h3>
                      <br></br>
                      <br></br>
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        {file.length > 0 ? <div className="selected-file">
                          {file}
                        </div>
                          : <div div className="selected-file">
                            <p>Drag and drop file here, or click to select file</p></div>}
                      </div>
                    </section>
                  )}
                </Dropzone>
                {loading ? <button>Loading....</button> : <button>Send</button>}
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
};
