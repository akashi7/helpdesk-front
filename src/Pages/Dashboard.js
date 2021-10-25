import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { StudentNavBar } from '../Components/AppBar';

export const Dashboard = () => {
  const history = useHistory();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      history.push('/');
    }
    //eslint-disable-next-line
  }, []);

  function RequestTranscipt() {
    history.push('/transcipt');
  }

  return (
    <div>
      <StudentNavBar />
      <div className="services">
        <h4>Services</h4>
        <div className="service">
          <p>Transcipt</p>
          <p onClick={() => RequestTranscipt()}><u>Request</u></p>
        </div>
        <div className="service">
          <p>To whom</p>
          <p><u>Request</u></p>
        </div>
        <div className="service">
          <p>New Student card</p>
          <p><u>Request</u></p>
        </div>
      </div>
    </div>
  );
};
