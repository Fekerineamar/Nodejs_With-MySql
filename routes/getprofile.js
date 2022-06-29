import con from "../_data/db.js";
import path from "path";

let __dirname = path.resolve();

const getprofile = (req, res) => {
  let user;
  req.session.name && (user = req.session.name);
  let sqlvalid = `SELECT * FROM user WHERE fname ='${req.session.name}' `;
  req.session.name
    ? con.query(sqlvalid, function (err, result) {
        result = JSON.parse(JSON.stringify(result[0]));
        if (err) throw err;
        res.render(path.join(__dirname, "views/Component/profile.ejs"), {
          title: "profile",
          user: user,
          err: req.session.err ? req.session.err : "",
          fname: result.fname ? result.fname : "",
          lname: result.lname ? result.lname : "",
          email: result.email ? result.email : "",
          phone: result.phone ? result.phone : "",
          addr1: result.addr1 ? result.addr1 : "",
          addr2: result.addr2 ? result.addr2 : "",
          country: result.country ? result.country : "",
          state: result.state ? result.state : "",
          image: result.image ? result.image : "profile.jpg",
        });
      })
    : res.redirect("/");
};

export default getprofile;
