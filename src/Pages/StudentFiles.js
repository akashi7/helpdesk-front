import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { StudentNavBar } from '../Components/AppBar';
import { UserContext } from '../Context/UserContext';

export const StudentFiles = () => {

  const history = useHistory();

  const token = localStorage.getItem('token');

  const { StudentFiles, studentViewFiles } = useContext(UserContext);

  const [Url, setUrl] = useState('');

  useEffect(() => {

    (async () => {
      if (!token) {
        history.push('/');
      }
      else {
        await studentViewFiles(token);
      }
    })();

    //eslint-disable-next-line
  }, []);

  const downloadFile = async (url) => {

    const config = {
      method: "GET",
      headers: {
        'content-type': 'image/jpeg'
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
        {StudentFiles.files.length === 0 ? <div>
          <p>You have no files</p>
        </div>
          : StudentFiles.files.map(({ id, regno, service, file_url }) => {
            return (
              <div key={id} className="filess">
                <p>{regno} </p>
                <p> {service} </p>
                <a href={Url ? Url : "#"} download={`${service}`} onClick={() => downloadFile(file_url)} >download file</a>
              </div>
            );
          })}
      </div>
    </div>
  );
};
