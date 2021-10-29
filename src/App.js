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
import { FinanceViewReq } from './Pages/FinanceViewReq';
import { WadenDash } from './Pages/WadenDash';
import { WadenViewReq } from './Pages/WadenViewReq';
import { LibraryDash } from './Pages/LibraryDash';
import { LibraryViewReq } from './Pages/LibraryViewReq';
import { HodDash } from './Pages/HodDash';
import { HodViewReq } from './Pages/HodViewReq';
import { StudentReg } from './Pages/StudentReg';
import { StudentFiles } from './Pages/StudentFiles';

function App() {
  return (
    <Router>
      <Switch>
        <UserProvider>
          <Route path="/" component={Home} exact />
          <Route path="/staff" component={StaffLogin} exact />
          {/*Student  Routes */}
          <Route path="/transcipt" component={RequestTranscipt} exact />
          <Route path="/transcipt/uploadFiles" component={UploadFiles} exact />
          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/studentReg" component={StudentReg} exact />
          <Route path="/files" component={StudentFiles} exact />
          {/*Finance Routes */}
          <Route path="/financeDash" component={FinanceDashboard} exact />
          <Route path="/finance/viewReq/:id" component={FinanceViewReq} exact />
          {/*Waden Routes */}
          <Route path="/wadenDash" component={WadenDash} exact />
          <Route path="/waden/viewReq/:id" component={WadenViewReq} exact />
          {/*library Routes */}
          <Route path="/libraryDash" component={LibraryDash} exact />
          <Route path="/library/viewReq/:id" component={LibraryViewReq} exact />
          {/*hod Routes */}
          <Route path="/hodDash" component={HodDash} exact />
          <Route path="/hod/viewReq/:id" component={HodViewReq} exact />

        </UserProvider>
      </Switch>
    </Router>
  );
}

export default App;
