const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://txhhqhrc:dRaMlNDvxFlAKQlL_AOfqgHScWzQN6Lm@rain.db.elephantsql.com/txhhqhrc',
});

app.use(bodyParser.json());

const queries = require('./queries.js')(pool);

app.get('/users', queries.getUsers);
app.get('/users/:id', queries.getUserById);
app.post('/users', queries.createUser);
app.put('/users/:id', queries.updateUser);
app.delete('/users/:id', queries.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
