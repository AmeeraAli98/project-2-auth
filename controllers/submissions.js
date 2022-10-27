const { application } = require('express')
const express = require('express')
const db = require('../models')
const router = express.Router()
router.get("/:name/:id", async (req,res)=>{
  const get_submissions = await db.submission.findAll({where:{sessionId:req.params.id}})
  res.render("organizers/submissions", {submissions:get_submissions ,session_name:req.params.name})
  })
router.post("/upload", async (req, res) => {
    //verify if session exists
    const session = await db.session.findOne({where:{seshName:req.body.seshName}})
    // (B3-1) UPLOADED FILE & DESTINATION
    let upfile = req.files.upfile;
      updest = "Uploads" + "/" + upfile.name;
     
    // (B3-2) MOVE UPLOADED FILE
    upfile.mv(updest, (err) => {
      if (err) { return res.status(500).send(err); }
      async function stepTwo(){
        const added_file = await session.createSubmission({
          uploader:req.body.uploader,
          mime_type:req.files.upfile.mimetype,
          file_path:updest
        });
        res.redirect("/")
      
      }
      stepTwo();
    });
   
})
router.get("/:name", (req,res)=>{
res.sendFile(__dirname.slice(0,__dirname.length-11)+"/Uploads/"+req.params.name)
})
router.post("/delete/", async(req,res)=>{
  const found_session = await db.session.findOne({where:{id:req.body.id}})
  found_session.destroy();
  res.redirect("back")
})

  module.exports = router;
