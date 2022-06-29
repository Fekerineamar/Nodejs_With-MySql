import * as vars from "./variables.js";
import con from "../_data/db.js";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
  let obj = {};
  let long = false;
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      let result = req.body[key];
      result = result.replace(/[^a-z0-9]/gi, "");
      result = result.toLowerCase();
      obj[key] = result;
      key == "_csrf" && delete obj._csrf;
    }
  }
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const result = obj[key];
      result.length >= 30 && (long = true);
    }
  }
  if (
    !long &&
    vars.regemail.test(req.body.email) &&
    req.body.password &&
    vars.regname.test(obj.name)
  ) {
    let pass = await bcrypt.hash(req.body.password, 10);
    let obj = {};
    let sql = `INSERT INTO user (fname, lname,email,pass) VALUES ('${req.body.name}', '${req.body.last_name}','${req.body.email}','${pass}')`;
    let sqlvalid = `SELECT * FROM user WHERE email ='${req.body.email}';SELECT * FROM user WHERE fname = '${req.body.name}'`;
    con.query(sqlvalid, [1, 2], function (err, result) {
      let r1 = JSON.parse(JSON.stringify(result[0]));
      let r2 = JSON.parse(JSON.stringify(result[1]));
      if (err) throw err;
      r1[0]
        ? (obj.mailexist = vars.success)
        : r2[0] && (obj.nameexist = vars.success);
      !r1[0] && !r2[0]
        ? con.query(sql, function (err) {
            if (err) throw err;
            req.session.name = req.body.name;
            req.session.save();
            console.log("success added");
            return res.send({ success: vars.success, url: vars.url });
          })
        : res.send(obj);
    });
  } else {
    res.send({ success: vars.notsuccess, data: req.body });
  }
};

export default signup;
