const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, first_name, last_name, email, age, industry 
    FROM humanticUsers LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}





async function create(user){
    const result = await db.query(
      `INSERT INTO humanticUsers 
      (first_name, last_name, email, age, industry) 
      VALUES 
      ("${user.first_name}", "${user.last_name}", "${user.email}", ${user.age}, "${user.industry}")`
    );
  
    let message = 'Error in creating user';
  
    if (result.affectedRows) {
      message = 'User created successfully';
    }
  
    return {message};
  }

  module.exports = {
    getMultiple,
    create
  }