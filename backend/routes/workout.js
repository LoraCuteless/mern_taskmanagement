const express = require('express')

const router = express.Router()


router.get('/', (req, res)=>{
    res.json({mssg:'GET ALL'})
})

router.get("/:id", (req, res) => {
    res.json({mssg:'GET SPECIFIC'})
});

router.post('/', (req,res)=>{   
    res.json({mssg:"POST a new workout"})
})

router.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE workout" });
});

router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE workout" });
});

module.exports = router