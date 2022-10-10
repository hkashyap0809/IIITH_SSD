import './App.css';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import AddQuery from './components/AddQuery';
import TAProfile from './components/TAProfile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='signup' element={<SignUpForm />} />
        <Route path='login' element={<LoginForm />} />
        <Route path='student' element={<Profile />} />
        <Route path='student/addQuery' element={<AddQuery />} />
        <Route path='ta/queries' element={<TAProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
