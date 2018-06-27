var config = require('config');
const pg = require('pg');
const dbconfig = config.dbconfig;
// pool takes the object above -config- as parameter
const pool = new pg.Pool(dbconfig);


let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.connect(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

let select = function() {
	let sql = 'SELECT * FROM talent';
	return query(sql);
}

let add = function(values) {
	let sql = 'INSERT INTO talent VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) '; 
	return query(sql, values);   	
}

module.exports = { select, add }


