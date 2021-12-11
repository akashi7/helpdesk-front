import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { StudentNavBar } from '../Components/AppBar';
import Dropzone from "react-dropzone";

export const UploadFiles = () => {


  let url;

  process.env.NODE_ENV === "production" ? url = ` ` : url = `http://localhost:9000`;

  const history = useHistory();

  const token = localStorage.getItem('token');
  const service = localStorage.getItem('service');

  const [file, setFile] = useState([]);
  const [file2, setFile2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  const [state, setState] = useState({
    bankslip: {},
    FormFile: {},
    message: "",
    year: ""
  });

  const onDrop = File => {

    if (File.length > 0) {
      setFile(File[0].name);
      setState({ ...state, bankslip: File[0] });
    }

  };
  const onDrop2 = File => {

    if (File.length > 0) {
      setFile2(File[0].name);
      setState({ ...state, FormFile: File[0] });
    }

  };

  const uploadFile = async (e) => {
    e.preventDefault();
    const tel = '0786399098';
    setLoading(true);

    const Year = state.year;

    if (!state.bankslip || !state.FormFile) {
      setState({ ...state, message: "upload all files" });
    }
    else {
      let formData = new FormData();
      formData.append('bankslip', state.bankslip);
      formData.append('FormFile', state.FormFile);

      const config = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      };

      const res = await (await fetch(`${url}/student/sendToFinance?service=${service}&&year=${Year}&&${tel}`, config)).json();

      if (res.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
      else if (res.status === 401) {
        localStorage.clear();
        history.push(`/`);
      }
      else if (res.status === 300) {
        setLoading(false);
        setState({ ...state, message: res.message });
      }
    }
  };






  useEffect(() => {
    if (!token) {
      history.push('/');
    }
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <StudentNavBar />
      {state.message ? <div style={{ width: "100%", padding: "7px", textAlign: "center", backgroundColor: "red" }}>
        <p style={{ color: "whitesmoke" }}>{state.message} </p>
      </div> : ""}
      {success ? <div style={{ width: "100%", padding: "7px", textAlign: "center", backgroundColor: "green" }}>
        <p style={{ color: "whitesmoke" }}>Request sent succesfully  </p>
      </div> : ""}
      <div className="files">
        <form onSubmit={(e) => uploadFile(e)}>
          <select
            required
            onChange={(e) => setState({ ...state, year: e.target.value })}
            className="choose"
          >
            <option>--select year---</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <Dropzone multiple={false}
            onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section className="zone">
                <h3>Upload bankslip</h3>
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
          <Dropzone multiple={false}
            onDrop={onDrop2}>
            {({ getRootProps, getInputProps }) => (
              <section className="zone">
                <h3>Upload filled form</h3>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  {file2.length > 0 ? <div className="selected-file">
                    {file2}
                  </div>
                    : <div div className="selected-file">
                      <p>Drag and drop file here, or click to select file</p></div>}
                </div>
              </section>
            )}
          </Dropzone>
          {loading ? <button className="buttonB">Loading.....</button> : <button className="buttonB">Send</button>}
        </form>
      </div>
      <div>
      </div>
    </div>
  );
};
