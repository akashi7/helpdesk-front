import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Dashboard } from './Pages/Dashboard';
import { FinanceDashboard } from './Pages/FinanceDashboard';
import { Home } from './Pages/Home';
import { QQrcode } from './Pages/Qrcode';
import { RequestTranscipt } from './Pages/RequestTranscipt';
import { StaffLogin } from './Pages/StaffLogin';
import { UploadFiles } from './Pages/UploadFiles';
import { UserProvider } from './Context/UserContext';

function App() {
  return (
    <Router>
      <Switch>
        <UserProvider>
          <Route path="/" component={Home} exact />
          <Route path="/staff" component={StaffLogin} exact />
          <Route path="/financeDash" component={FinanceDashboard} exact />
          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/transcipt" component={RequestTranscipt} exact />
          <Route path="/transcipt/uploadFiles" component={UploadFiles} exact />
        </UserProvider>
      </Switch>
    </Router>
  );
}

export default App;
