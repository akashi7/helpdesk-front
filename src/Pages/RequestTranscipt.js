import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { StudentNavBar } from '../Components/AppBar';
import Form from '../images/image.png';

export const RequestTranscipt = () => {
  const history = useHistory();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      history.push('/');
    }
    //eslint-disable-next-line
  }, []);

  function next(e) {
    e.preventDefault();
    history.push("/transcipt/uploadFiles");
  }
  return (
    <div>
      <StudentNavBar />
      <div className="transcipt-div">
        <h3>Download form and fill it</h3>
        <img src={Form} alt="form" className="TransciptForm" />
        <br></br>
        <a href={Form} download >Download Form</a>
        <div className="to-next">
          <p>Downloaded?</p>
          <button onClick={(e) => next(e)} className="By">next</button>
        </div>
      </div>
    </div>
  );
};
