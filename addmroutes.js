const express = require("express");
const Admission = require("../models/admission");

  router.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
  });
  
  router.get('/admission', (req, res) => {
    res.render('form', { title: 'Admission Form' });
  });
  
  router.get('/', (req, res) => {
    res.render('form');
  });
  
  router.post('/', (req, res) => {
    // Handle form submission
    res.redirect('/success');
  });
  
  // router.post('/admission', async (req, res) => {
  //   try {
  //     const newAdmission = new Admission(req.body);
  //     await newAdmission.save();
  //     res.render('success', { title: 'Success' });
  //   } catch (err) {
  //     res.status(500).send('Error submitting form');
  //   }
  // });  

  //const upload = require('../middleware/uploads'); // adjust path as needed

router.post('/admission', upload.single('resume'), async (req, res) => {
  try {
    const newAdmission = new Admission({
      name: req.body.name,
      email: req.body.email,
      course: req.body.course,
      resume: req.file ? req.file.filename : null
    });

    await newAdmission.save();
    res.render('success', { title: 'Success' });
  } catch (err) {
    console.error('Form save error:', err);
    res.status(500).send('Error submitting form');
  }
});

// Backend-only route: GET all admissions as JSON
router.get('/list', async (req, res) => {
  try {
    const allAdmissions = await Admission.find();
    res.status(200).json(allAdmissions); // Returns JSON
  } catch (err) {
    res.status(500).json({ error: "Error fetching admission data" });
  }
});

// GET All Admissions (Admin View)
router.get("/admin", async (req, res) => {
    const Admissions = await Admission.find();
    console.log("Admin route running");
    res.send(Admissions); // Returns a list of students
});

// GET Admission by ID (Route Params)
router.get("/:id", async (req, res) => {
    const dmission = await Admission.findById(req.params.id);
    if (!dmission) return res.status(404).send("Admission not found");
    res.send(dmission);
});


// POST Submit Admission Form
router.post("/users", async (req, res) => {
    const newAdmission = new Admission(req.body);
    await newAdmission.save();
    res.send("Admission form submitted successfully");
});

// Update admission by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Admission.findByIdAndUpdate(
      req.params.id,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Admission not found" });
    }

    res.status(200).json({ message: "Admission updated", updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update admission" });
  }
});

// Delete admission by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Admission.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Admission not found" });
    }

    res.status(200).json({ message: "Admission deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete admission" });
  }
});

module.exports = router;
