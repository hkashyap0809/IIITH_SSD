import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../common.css';

const BACKEND_URI = 'http://localhost:5000/api/';

// functional component
function SignUpForm(props) {
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  return (
    <div className='center-div'>
      <h1 className='text-center'>Sign Up</h1>
      <form className='form-group'>
        <label className='m-2 form-label'>Roll No : </label>
        <br />
        <input
          className='m-2 form-control'
          type='text'
          name='email'
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
          type='text'
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
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              rollNo: rollNo,
              password: password,
              role: role,
            }),
          };

          var res = await fetch(BACKEND_URI + 'register', requestOptions);
          alert((await res.json())['msg']);
          setRollNo('');
          setPassword('');
          setRole('');
        }}
      >
        Sign Up
      </button>
      <br />
      <p className='m-4'>
        Already Registered ? <Link to='/login'> Login Here</Link>
      </p>
    </div>
  );
}

export default SignUpForm;
