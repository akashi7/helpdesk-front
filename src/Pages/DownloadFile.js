import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { StudentNavBar } from '../Components/AppBar';
import { UserContext } from '../Context/UserContext';

export const DownloadFile = () => {

  const history = useHistory();

  const token = localStorage.getItem('token');
  const id = localStorage.getItem('fileId');

  const { StudentFile, studentViewFile } = useContext(UserContext);

  const [Url, setUrl] = useState('');

  useEffect(() => {
    (async () => {
      if (!token) {
        history.push('/');
      }
      else {
        await studentViewFile(token, id);
      }
    })();
    //eslint-disable-next-line
  }, []);

  const downloadFile = async (url) => {

    const config = {
      method: "GET",
      headers: {
        'content-type': 'application/pdf'
      },
    };

    fetch(`${url}`, config)
      .then((res) => res.blob())
      .then(blob => {
        const URL = window.URL.createObjectURL(blob);
        setUrl(URL);
      });

  };
  return (
    <div>
      <StudentNavBar />
      <div>
        {StudentFile.file.map(({ id, service, file_url }) => {
          return (
            <div key={id} className="d-page">
              <img src={file_url} alt={file_url} width="600" />
              <div className="dlink">
                {Url ? "" : <p onClick={() => downloadFile(file_url)} className="link" >Click to generate download link</p>}
                {Url ? <a href={Url} download={`${service}`} >Download {service}  </a> : ""}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
