import detect from "detect-file-type";
import fs from "fs";
import path from "path";
import * as vars from "./variables.js";
import con from "../_data/db.js";

let __dirname = path.resolve();
const upload = async (req, res) => {
  let current = "image_" + Date.now() + ".jpeg";
  req.Error
    ? res.send({ err: req.Error })
    : req.file
    ? detect.fromFile(
        path.join(__dirname, "images/") + vars.imgname.img,
        function (err, result) {
          if (err) {
            return console.log(err);
          }
          result
            ? result.mime != "image/jpeg" && result.mime != "image/png"
              ? (fs.unlinkSync(
                  path.join(__dirname, "images") + vars.imgname.img
                ),
                res.send({ err: "Please upload a jpeg or png Image" }))
              : (res.send({ url: vars.url }),
                (() => {
                  fs.rename(
                    path.join(__dirname, "images/") + vars.imgname.img,
                    path.join(__dirname, "images/") + current,
                    () => console.log("done re!")
                  );
                  let sql = `UPDATE user SET image = '${current}' WHERE fname = '${req.session.name}';`;
                  con.query(sql, (err, result) => {
                    err && console.log(err);
                    console.log(result);
                  });
                })())
            : (fs.unlinkSync(path.join(__dirname, "images/") + vars.imgname),
              res.send({ err: "Please upload a valid Image" }));
        }
      )
    : res.send({ err: "please choose one image" });
  req.session.save();
};

export default upload;
