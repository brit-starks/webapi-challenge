const express = require('express');

const db = require('./projectModel');

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: "Unable to complete request"
      })
    })
})

router.post('/', (req, res) => {
  const newProject = req.body;

  db.insert(newProject)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(err => {
      res.status(500).json({
        message: "Unable to add new user"
      })
    })
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const editProject = req.body;

  db.update(id, editProject)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(err => {
      res.status(500).json({
        message: "Unable to update user info"
      })
    })
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deleteProject => {
      res.json(deleteProject)
    })
    .catch(err => {
      res.status(500).json({
        message: "Unable to delete user"
      })
    })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.get(id) 
  .then( project => {
    res.status(200).json({project})
  })
  .catch(err => {
    res.status(404).json({
      message: "Unable to return project"
    })
  })
})

router.get('/action/:id', verifyPostId, (req, res) => {
  // const { id } = req.params;

  db.getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      res.status(404).json({
        err: err,
        message: "Unable to complete request"
      })
    })
  }
);

function verifyPostId(req, res, next){
  db.get(req.params.id)
  .then(id => {
    if(id) {
      // req.id = id;
      next()
    } else {
      res.status(404).json({
        message: `id ${req.params.id} does not exist`
      })
    }
  })
}

module.exports = router;