const express = require('express');

const actions = require('./actionModel');

const router = express.Router();


router.get('/', (req, res) => {
  actions.get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({
        message: "Unable to complete request"
      })
    })
});

router.post('/', validatePost, (req, res) => {

  actions.insert(req.body)
    .then(action => {
      res.status(201).json(action)
    })
    .catch(err => {
      res.status(404).json({
        message: "Unable to add new action"
      })
    })
});

router.put('/:id', validateId, (req, res) => {
  const { id } = req.params;
  const editAction = req.body;

  actions.update(id, editAction)
    .then(action => {
      res.status(201).json(action)
    })
    .catch(err => {
      res.status(500).json({
        message: "Unable to update user info"
      })
    })
});

router.delete('/:id', validateId, (req, res) => {
  const { id } = req.params;

  actions.remove(id)
  .then(action => res.status(200).json(action))
  .catch(err => res.status(500).json({message: 'Unable to delete action'}))
})

function validatePost(req, res, next){

  actions
  .get(action)
  .then(action => {
    if (req.body.project_id || req.body.description || req.body.notes) {

      next();
    } else {
      res.status(404).json(err);
    }
  })
  .catch(err => {
    res.status(500).json({ message: "unable to validate"})
  })
}

function validateId(req, res, next){
  const { id } = req.params;

  actions.get(id)
  .then(action => {
    if(action) {
      next();
    } else {
      res.status(404).json({
        message: `post ${req.params.id} does not exist`
      })
    }
  })
  .catch( err => {
    res.status(500).json({
      message: "Unable to find ID"
    })
  })
}

module.exports = router;