import '../common.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BACKEND_URI = 'http://localhost:5000/';

// functional component
function AddQuery(props) {
  const [examName, setExamName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [questionNum, setQuestionNum] = useState('');
  const [taRoll, setTaRoll] = useState('');
  const [stdComment, setStdComment] = useState('');

  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate('/student');
  };

  const rollNo = sessionStorage.getItem('curr_email');

  return (
    <div className='center-div'>
      <h1 className='text-center'>Query Form</h1>
      <form className='form-group'>
        <label className='m-2 form-label'>Exam Name: </label>
        <input
          className='m-2 form-control'
          type='text'
          name='examName'
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
        />
        <label className='m-2 form-label'>Course Name : </label>
        <input
          className='m-2 form-control'
          type='courseName'
          name='courseName'
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <label className='m-2 form-label'>Question No : </label>
        <input
          className='m-2 form-control'
          type='questionNo'
          name='questionNo'
          value={questionNum}
          onChange={(e) => setQuestionNum(e.target.value)}
        />
        <label className='m-2 form-label'>Ta Roll : </label>
        <input
          className='m-2 form-control'
          type='taRoll'
          name='taRoll'
          value={taRoll}
          onChange={(e) => setTaRoll(e.target.value)}
        />
        <label className='m-2 form-label'>Comments : </label>
        <input
          className='m-2 form-control'
          type='stdComment'
          name='stdComment'
          value={stdComment}
          onChange={(e) => setStdComment(e.target.value)}
        />
      </form>
      <button
        className='btn btn-primary position-relative start-50 translate-middle-x'
        onClick={navigateToProfile}
      >
        Go Back
      </button>
      <button
        className='btn btn-primary position-relative start-50 translate-middle-x'
        onClick={async (e) => {
          // send fetch (POST) request to server
          const requestOptions = {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              examName: examName,
              courseName: courseName,
              questionNum: questionNum,
              taRoll: taRoll,
              stdRoll: rollNo,
              stdComment: stdComment,
              isActive: true,
            }),
          };

          console.log(requestOptions);
          console.log(rollNo);
          var res = await fetch(BACKEND_URI + 'std/', requestOptions);
          alert((await res.json())['msg']);
          setExamName('');
          setCourseName('');
          setQuestionNum('');
          if (res.status == 200) {
            // sessionStorage.setItem('curr_email', q);
            navigateToProfile();
          }
        }}
      >
        Post
      </button>
      <br />
    </div>
  );
}

export default AddQuery;
