import con from "../_data/db.js";

const deleted = (req, res) => {
  if (req.session.name && !req.body.name) {
    let sql = `DELETE FROM user WHERE fname ='${req.session.name}'`;
    con.query(sql, (err, result) => {
      err && console.log(err);
      result &&
        req.session.destroy((err) => {
          err && console.log(err);
          res.send({ url: "/" });
        });
    });
  }
};

export default deleted;
