module.exports = (pool) => {
  const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  }

  const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  }

  const createUser = (request, response) => {
    const { name, phone } = request.body;

    pool.query('INSERT INTO users (name, phone) VALUES ($1, $2) RETURNING id', [name, phone], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ id: results.rows[0].id });
    });
  }

  const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, phone } = request.body;

    pool.query(
      'UPDATE users SET name = $1, phone = $2 WHERE id = $3',
      [name, phone, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(`User modified with ID: ${id}`);
      }
    );
  }

  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    });
  }

  return {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };
}
