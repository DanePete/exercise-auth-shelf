const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  let queryString = `SELECT * FROM item`;
  pool.query(queryString)
    .then((result) => {
      console.log('our shelf item response', result.rows);
      res.send(result.rows);
      // res.sendStatus(200);
    })
    .catch((err) => {
      console.log('shelf response error', err);
      res.sendStatus(500);
    })
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  const sqlText = `INSERT INTO "item" ("description", "image_url", "user_id")
                   VALUES($1, $2, $3)
                    `;
  const sqlParams = [
    req.body.description,
    req.body.url,
    req.user.id
  ] 

  pool.query(sqlText, sqlParams).then((response) => {
    console.log('POST successful', response);
    res.sendStatus(201)
  }).catch((error) => {
    console.error('POST Error', error);
    res.sendStatus(500)
  })
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
  const idToDelete = req.params.id
  console.log('idToDelete', idToDelete);
  const sqlText = `DELETE FROM "item"
                  WHERE id=$1;`;
  const sqlParams = [idToDelete];
   pool.query(sqlText, sqlParams).then((response) => {
    console.log('DELETE successful', response);
    res.sendStatus(200)
  }).catch((error) => {
    console.error('DELETE Error', error);
    res.sendStatus(500);
  })
});

// Below this are STRETCH requirements

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
