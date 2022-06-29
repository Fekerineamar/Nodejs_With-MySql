import * as vars from "./variables.js";
import con from "../_data/db.js";
import bcrypt from "bcrypt";

const profile = async (req, res) => {
  let obj = {};
  let long = false;
  if (req.session.name) {
    for (const key in req.body) {
      if (Object.hasOwnProperty.call(req.body, key)) {
        let result = req.body[key];
        result.length >= 30 && (long = true);
        result = result.replace(/[^a-z0-9]/gi, "");
        result = result.toLowerCase();
        obj[key] = result;
      }
    }

    if (
      !long &&
      vars.regemail.test(req.body.email) &&
      req.body.password &&
      vars.regname.test(obj.name)
    ) {
      let pass = await bcrypt.hash(req.body.password, 10);
      let sql = `UPDATE user SET
    fname = '${obj.name}',
    lname = '${obj.last_name}',
    email = '${req.body.email}',
    pass = '${pass}',
    phone = '${obj.phone}',
    addr1 = '${obj.addr1}',
    addr2 = '${obj.addr2}',
    country = '${obj.country}',
    state = '${obj.state}'
    WHERE fname = '${req.session.name}';`;
      con.query(sql, function (err) {
        if (err) throw err;
        req.session.name = obj.name;
        req.session.save();
        return res.send({ success: vars.success, url: "/profile" });
      });
    } else {
      return res.send({ success: vars.notsuccess, data: req.body });
    }
  }
};

export default profile;
