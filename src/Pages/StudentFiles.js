import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { StudentNavBar } from '../Components/AppBar';
import { UserContext } from '../Context/UserContext';

export const StudentFiles = () => {

  const history = useHistory();

  const token = localStorage.getItem('token');

  const { StudentFiles, studentViewFiles } = useContext(UserContext);

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



  const goToDownload = (id) => {
    localStorage.setItem('fileId', id);
    history.push('/downloadFile');
  };


  return (
    <div>
      <StudentNavBar />
      <div>
        {StudentFiles.files.length === 0 ? <div>
          <p>You have no files</p>
        </div>
          : StudentFiles.files.map(({ id, regno, service, year }) => {
            return (
              <div key={id} className="filess">
                <p>{regno} </p>
                <p> {service} </p>
                <p> {year} </p>
                <p onClick={() => goToDownload(id)} className="link" >go to download</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};
