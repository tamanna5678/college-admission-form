const express = require("express");
const connectDB = require("./config/db");
const uploads = require("./middleware/uploads");
const admissionRoutes = require("./routes/addmroutes");
const path = require('path');

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
const upload = require('./uploads'); 


app.set('view engine', 'hbs');


app.set('views', path.join(__dirname, 'views'));
//app.use(express.static(path.join(__dirname, 'public')));


connectDB();
app.use(uploads); 

// Routes
app.use("/Admission", admissionRoutes);

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});
app.get('/admission', (req, res) => {
    res.render('admission');
  });
// app.post('/admission', (req, res) => {
//     res.send('Form submitted successfully!');
//   });
  
app.post('/admission', async (req, res) => {
  try {
    const data = new Admission({
      ...req.body,
      resume: req.file ? req.file.filename : null
    });
    await data.save();
    res.redirect('/success');
  } catch (err) {
    res.status(500).send('Error saving data');
  }
});
app.get('/success', (req, res) => {
  res.render('success', { message: 'Thank you for your submission!' });
});

  app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/'); // Ensure this directory exists
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname);
//     }
//   });
//   const upload = multer({ storage });

const PORT = 3333;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
