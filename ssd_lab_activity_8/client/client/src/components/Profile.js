import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const axios = require('axios').default;

const BACKEND_URI = 'http://localhost:5000/api/';
const FETCH_QUERY = 'http://localhost:5000/std/';

function Profile(props) {
  const img_link = 'https://i.ibb.co/0mR0RTc/user.jpg';

  const [queryData, setQueryData] = useState([]);

  const tableStyle = {
    width: 'fit-content',
    margin: 'auto',
    border: '1px solid black',
  };

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };
  const navigateToQuery = () => {
    navigate('/student/addQuery');
  };

  const rollNo = sessionStorage.getItem('curr_email');

  useEffect(() => {
    fetch(`${FETCH_QUERY}${rollNo}`)
      .then((results) => results.json())
      .then((data) => {
        setQueryData(data);
      });
  }, []);

  // If email is null it means the session variable is not set and hence the user
  // has not logged in yet
  if (rollNo == null) {
    return (
      <p>
        Please Login First.
        <button onClick={navigateToLogin} className='btn btn-primary'>
          Go To Login
        </button>
      </p>
    );
  }

  // control comes here if email is not null.
  return (
    <div>
      <button
        className='btn btn-primary m-4'
        onClick={async (e) => {
          const requestOptions = {
            credentials: 'include',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          };
          var res = await fetch(BACKEND_URI + 'logout', requestOptions);
          {
            /* alert((await res.json())["msg"]); */
          }

          if (res.status == 200) {
            sessionStorage.removeItem('curr_email');
            navigateToLogin();
          }
        }}
      >
        Logout
      </button>

      <button className='btn btn-primary m-4' onClick={navigateToQuery}>
        Add Query
      </button>

      <h2 className='text-center'> Welcome, {rollNo} </h2>
      <div>
        <img className='img-thumbnail w-25 h-25 m-4' src={img_link} alt='' />
        <div className='queries'>
          {queryData.map((row) => (
            <div
              key={row[0]}
              style={{
                border: '1px solid black',
                margin: 'auto',
                marginLeft: '10px',
              }}
            >
              <h5>EXAM NAME : {row.examName}</h5>
              <h5>Course Name : {row.courseName}</h5>
              <h5>Question No : {row.questionNo}</h5>
              <h5>Student Roll No : {row.taRoll}</h5>
              <h5>Students Comment : {row.stdComment}</h5>
              <h5> TA Comment : {row.taComment}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
