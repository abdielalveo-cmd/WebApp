const users = require('../../models/users');
const config = require('../../config');

const createUser = function (req, res) {
  const sql = `Select * from users where username ='${req.body.username}'`;
  const query = config.connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length != 0) {
      res.render('registration', {
        errors: { username: 'A selected username already exists' },
      });
    }
    const errors = registrationUser(req, res);
    if (errors) {
      res.redirect('/forgot/user');
    } else {
      res.render('registration', errors);
    }
  });
};

function registrationUser(req, res) {
  let data;
  // eslint-disable-next-line no-use-before-define
  const errors = validation(req);
  if (!isEmpty(errors)) {
    return { errors };
  }
  if (req.body.studentID != '') {
    data = {
      id: req.body.ID,
      name: req.body.name,
      lastName: req.body.lastName,
      studentID: req.body.studentID,
      userName: req.body.username,
      password: req.body.password,
      type: 'student',
      ans: req.body.ans,
    };
  } else {
    data = {
      id: req.body.ID,
      name: req.body.name,
      lastName: req.body.lastName,
      userName: req.body.username,
      password: req.body.password,
      type: 'regular',
      ans: req.body.ans,
    };
  }
  return users.saveUser(data, res);
}

function validation(req) {
  const errors = {};
  validID(req.body.ID, errors);
  validName(req.body.name, errors);
  validLastname(req.body.lastName, errors);
  if (req.body.studentID != '') {
    validStudentID(req.body.studentID, errors);
  }
  validPassword(req.body.password, errors);
  return errors;
}


function validID(id, errors) {
  if (id.length != 9) {
    errors.ID = 'Must contain 9 numbers';
  }
}

function validName(name, errors) {
  if (!/^[a-zA-Z]+$/.test(name)) {
    errors.name = 'Name must contain only letters';
  }
}

function validLastname(lastName, errors) {
  if (!/^[a-zA-Z]+$/.test(lastName)) {
    errors.lastName = 'Last name must contain only letters';
  }
}
function validStudentID(studentID, errors) {
  if (studentID.length != 6) {
    errors.studentID = 'Must contain 6 numbers';
  }
}

function validPassword(password, errors) {
  if (password.length < 8 || password.length > 15 || !/^[a-zA-Z0-9]+$/.test(password)) {
    errors.password = '1. The password must contain between 8 and 15 characters\n '
            + '2. The password must contain letters\n'
            + ' 3. The password must contain numbers\n'
            + 'At least one of the parameters does not exist';
  }
}
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

module.exports.createUser = createUser;
