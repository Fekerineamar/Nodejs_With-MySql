import con from "../_data/db.js";
import * as vars from "./variables.js";
import bcrypt from "bcrypt";

const login = (req, res) => {
  let sql = `SELECT * FROM user WHERE email ='${req.body.email}';`;
  let obj = {};
  if (vars.regemail.test(req.body.email) && !/^\s*$/.test(req.body.password)) {
    con.query(sql, async (err, result) => {
      err && console.log("err", err);
      if (result[0]) {
        let pass;
        let r1 = JSON.parse(JSON.stringify(result[0]));
        pass = await bcrypt.compare(req.body.password, r1.pass);
        obj.email = vars.email;
        if (!pass) {
          obj.err = vars.password;
          obj.success = vars.notsuccess;
          res.send(obj);
        } else {
          if (r1.email && pass) {
            req.session.name = r1.fname;
            req.session.save();
            return res.send({ success: vars.success, url: vars.url });
          }
        }
      } else {
        obj.err = "notexist";
        res.send(obj);
      }
    });
  } else {
    obj.err = vars.email;
    res.send(obj);
  }
};
export default login;
