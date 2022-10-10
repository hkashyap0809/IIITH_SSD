import '../common.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BACKEND_URI = 'http://localhost:5000/api/';

// functional component
function LoginForm(props) {
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate('/student');
  };
  const navigateToTAProfile = () => {
    navigate('/ta/queries');
  };

  return (
    <div className='center-div'>
      <h1 className='text-center'>Login</h1>
      <form className='form-group'>
        <label className='m-2 form-label'>Roll No : </label>
        <br />
        <input
          className='m-2 form-control'
          type='text'
          name='rollNo'
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
        />
        <br />
        <label className='m-2 form-label'>Password : </label>
        <br />
        <input
          className='m-2 form-control'
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label className='m-2 form-label'>Role : </label>
        <br />
        <input
          className='m-2 form-control'
          type='role'
          name='role'
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <br />
      </form>
      <button
        className='btn btn-primary position-relative start-50 translate-middle-x'
        onClick={async (e) => {
          // send fetch (POST) request to server
          const requestOptions = {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              rollNo: rollNo,
              password: password,
              role: role,
            }),
          };

          console.log(requestOptions);
          var res = await fetch(BACKEND_URI + 'login', requestOptions);
          alert((await res.json())['msg']);
          setRollNo('');
          setPassword('');
          setRole('');
          if (res.status == 200) {
            sessionStorage.setItem('curr_email', rollNo);
            if (role == 'student') navigateToProfile();
            else navigateToTAProfile();
          }
        }}
      >
        Login
      </button>
      <br />
      <p className='m-4'>
        Do not have an account ? <Link to='/signup'> Sign Up Here</Link>{' '}
      </p>
    </div>
  );
}

export default LoginForm;
