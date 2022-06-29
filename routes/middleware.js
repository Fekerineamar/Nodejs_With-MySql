import multer from "multer";
import path from "path";
import * as vars from "./variables.js";

let __dirname = path.resolve();

const imgStorage = multer.diskStorage({
  destination: path.join(__dirname, "images"),
  filename: (_req, file, cb) => {
    cb(null, vars.imgname.img);
  },
});

const middleware = multer({
  storage: imgStorage,
  fileFilter(req, file, cb) {
    const fileSize = parseInt(req.headers["content-length"]);
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      req.Error = "Please upload a jpeg or png Image";
      return cb(null, false, req.Error);
    } else if (fileSize > 1024 * 1024) {
      req.Error = "File to Large, please use less than 1mb";
      return cb(null, false, req.Error);
    }
    return cb(null, true);
  },
});
export default middleware;
