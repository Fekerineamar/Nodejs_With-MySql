import express from "express";
import multer from "multer";
import path from "path";

const app = express();
const port = 3000;
let __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "assets")));

console.log(__dirname);

let imgname = "image_" + Date.now() + ".jpeg";
const imgStorage = multer.diskStorage({
  destination: "images",
  filename: (_req, file, cb) => {
    cb(null, imgname);
  },
});

const upload = multer({
  storage: imgStorage,
  limits: {
    fileSize: 1024 * 1024, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      req.Error = "Not a Image";
      return cb(null, false, req.Error);
    }
    return cb(null, true);
  },
});

const uploader = multer({
  storage: multer.diskStorage({
    destination: "images",
    filename: (_req, file, cb) => {
      cb(null, file.fieldname);
    },
  }),
});

app.get("/", (req, res) => {
  res.render("uploads.ejs");
});

app.post("/test", upload.single("avatar"), (req, res) => {
  console.log("body: ", req.body);
  console.log("file: ", req.file);
  res.sendStatus(200);
});

app.listen(port, () =>
  console.log(`HTTP server is listening on http://localhost:${port}`)
);
