const sql = require('./db.js');

// constructor
const Role = function (role) {
  this.name = role.name;
  this.description = role.description;
  this.icon = role.icon;
};

Role.create = (newRole, result) => {
  sql.query('INSERT INTO roles SET ?', newRole, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created role: ', { id: res.insertId, ...newRole });
    result(null, { id: res.insertId, ...newRole });
  });
};

Role.findById = (id, result) => {
  sql.query(`SELECT * FROM roles WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found role: ', res[0]);
      result(null, res[0]);
      return;
    }

    // not found Role with the id
    result({ kind: 'not_found' }, null);
  });
};

Role.getAll = (name, result) => {
  let query = 'SELECT * FROM roles';

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('roles: ', res);
    result(null, res);
  });
};

Role.getAllPublished = (result) => {
  sql.query('SELECT * FROM roles WHERE icon=true', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('roles: ', res);
    result(null, res);
  });
};

Role.updateById = (id, role, result) => {
  sql.query(
    'UPDATE roles SET name = ?, description = ?, icon = ? WHERE id = ?',
    [role.name, role.description, role.icon, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Role with the id
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('updated role: ', { id: id, ...role });
      result(null, { id: id, ...role });
    }
  );
};

Role.remove = (id, result) => {
  sql.query('DELETE FROM roles WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Role with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted role with id: ', id);
    result(null, res);
  });
};

Role.removeAll = (result) => {
  sql.query('DELETE FROM roles', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} roles`);
    result(null, res);
  });
};

module.exports = Role;
