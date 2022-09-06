import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../../routes/Login';
import SignUp from '../../routes/SignUp';
import Trello from '../../routes/Trello';

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/trello' element={<Trello />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
