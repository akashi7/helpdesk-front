import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { StudentNavBar } from '../Components/AppBar';
import Dropzone from "react-dropzone";

export const UploadFiles = () => {


  let url;

  process.env.NODE_ENV === "production" ? url = ` ` : url = `http://localhost:8000`;

  const history = useHistory();

  const token = localStorage.getItem('token');

  const [file, setFile] = useState([]);
  const [file2, setFile2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  const [state, setState] = useState({
    bankslip: {},
    FormFile: {},
    message: ""
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

    setLoading(true);

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

      const service = 'transcipt';

      const res = await (await fetch(`${url}/student/sendToFinance?service=${service}`, config)).json();

      if (res.status === 200) {

        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 4000);

        window.location.reload();
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
        <p style={{ color: "whitesmoke" }}>{success} </p>
      </div> : ""}
      <div>
        <form onSubmit={(e) => uploadFile(e)}>
          <Dropzone multiple={false}
            onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
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
              <section>
                <h3>Upload bankslip</h3>
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
          {loading ? <button>Loading.....</button> : <button>Send</button>}
        </form>
      </div>
      <div>
      </div>

    </div>
  );
};
