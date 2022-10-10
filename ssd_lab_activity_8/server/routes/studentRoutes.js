const Query = require('../models/QuerySchema.js');
const User = require('../models/UserSchema');

const express = require('express');
const router = express.Router();

const isAlive = (req, res, next) => {
  if (req.session.user) {
    next();
    return;
  }
  return res.status(401).send('Unauthorized...');
};

// router.use(isAlive);

// get all queries by student
router.get('/:roll', async (req, res) => {
  try {
    const rollNo = req.params.roll;
    const user = await User.findOne({ rollNo: rollNo, role: 'student' });
    if (!user) {
      return res.status(200).json({ msg: "Student doesn't exist..." });
    }
    const queries = await Query.find({ stdRoll: rollNo }).sort({ date: -1 });

    return res.status(200).json(queries);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Something went wrong!');
  }
});

// post a query by student
router.post('/', async (req, res) => {
  console.log(req.body);
  console.log('h');
  const {
    examName,
    courseName,
    questionNum,
    taRoll,
    stdRoll,
    stdComment,
    isActive,
  } = req.body;

  if (
    !examName ||
    !courseName ||
    !questionNum ||
    !taRoll ||
    !stdRoll ||
    !stdComment
  ) {
    return res.status(400).json({ msg: 'Something is missing' });
  }

  const ta = await User.findOne({ rollNo: taRoll });

  if (!ta) {
    return res.status(200).json({ msg: 'TA does not exists...' });
  }
  const newQuery = new Query({
    examName: examName,
    courseName: courseName,
    questionNum: questionNum,
    taRoll: taRoll,
    stdRoll: stdRoll,
    stdComment: stdComment,
    isActive,
  });
  const saveQuery = await newQuery.save();

  if (saveQuery) {
    return res.status(200).json({ msg: 'Your query has been Saved' });
  } else {
    return res.status(500).json({ msg: 'Serve Error' });
  }
});

// get all queries by ta
router.get('/ta/:roll', async (req, res) => {
  try {
    const rollNo = req.params.roll;

    const queries = await Query.find({ taRoll: rollNo }).sort({ date: -1 });

    return res.status(200).json(queries);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Something went wrong!');
  }
});

router.put('/', async (req, res) => {
  const { name, roll, programme, courses } = req.body;

  if (!name || !roll || !programme) {
    return res.status(400).send('Something is missing');
  }

  const existStd = await Student.findOne({ roll });
  if (!existStd) {
    return res.status(500).json({ msg: "Student doesn't exist..." });
  }

  const std = await Student.findByIdAndUpdate(
    existStd.id,
    { name, roll, programme, courses },
    { new: true }
  );

  if (std) {
    return res.status(200).json({ data: std });
  } else {
    return res.status(500).json({ msg: "Couldn't update student details" });
  }
});

module.exports = router;
