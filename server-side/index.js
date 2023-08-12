const express = require("express");
var cors = require("cors");
const multer = require("multer");
const ConnectToMongo = require("./db");
const path = require("path");

ConnectToMongo();

const app = express();
const port = 8800;

app.use(cors());
app.use(express.json());

app.use('/images',express.static(path.join(__dirname,'/uploads')))

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./uploads");
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now()+file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post("/api/uploadimg", upload.single("file"), function (req, res) {
  try {
    res.status(200).json({"filename": req.file.filename});
  } catch (error) {
    console.log(error)
  }
});

app.use("/api/user", require("./routes/auth"));
app.use("/api", require("./routes/CRUD"));
app.use("/api/posts", require("./routes/posts"));

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
