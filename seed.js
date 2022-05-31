require('dotenv').config();

const Users = require('./models/newUserModel');

const userData = [
  {
    userId: 'A001',
    user: 'John',
    lastName: 'Smith',
    password: 'admin',
    email: 'j.smith@pinguseafood.co.uk',
  },
];

userData.forEach(doc => {
  Users.seed(doc, doc.password);
});
