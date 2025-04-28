const express = require("express");
const Admission = require("../models/admission");
const router = express.Router();
const upload = require('../middleware/uploads'); // Correct file upload middleware

// Render the home page
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Render the admission form page
router.get('/admission', (req, res) => {
  res.render('form', { title: 'Admission Form' });
});

// POST for admission form submission (with file upload)
router.post('/admission', upload.single('resume'), async (req, res) => {
  try {
    const newAdmission = new Admission({
      ...req.body,
      resume: req.file ? req.file.filename : null // handle resume upload
    });
    await newAdmission.save();
    res.render('success', { title: 'Success' });
  } catch (err) {
    console.error('Form save error:', err);
    res.status(500).send('Error submitting form');
  }
});

// GET All Admissions as JSON (for backend testing)
router.get('/list', async (req, res) => {
  try {
    const allAdmissions = await Admission.find();
    res.status(200).json(allAdmissions); // Returns JSON of all admissions
  } catch (err) {
    res.status(500).json({ error: "Error fetching admission data" });
  }
});

// Admin view of all admissions
router.get("/admin", async (req, res) => {
  try {
    const allAdmissions = await Admission.find();
    console.log("Admin route running");
    res.status(200).json(allAdmissions); // Returns a list of all admissions
  } catch (err) {
    res.status(500).send("Error fetching data");
  }
});

// GET Admission by ID
router.get("/:id", async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);
    if (!admission) return res.status(404).send("Admission not found");
    res.status(200).json(admission); // Returns admission details
  } catch (err) {
    res.status(500).json({ error: "Error fetching admission data" });
  }
});

// PUT request to update admission by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Admission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Admission not found" });
    }
    res.status(200).json({ message: "Admission updated", updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update admission" });
  }
});

// DELETE request to delete admission by ID
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
