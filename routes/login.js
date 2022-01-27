var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", async (req, res, next) => {
  console.log("receiving ... " + req.body);
  // datos desde postman
  const user = req.body.user;
  const password = req.body.password;

  // validar
  if (user === "admin" && password === "12345") {
    let salt = bcrypt.genSaltSync(8);
    let passwordHash = await bcrypt.hash(password, salt);
    res.json({
      message: "AUTENTICACION EXITOSA!",
      hash: passwordHash,
    });
  } else {
    res.json({
      message: "INGRESE CREDENCIALES CORRECTAS",
    });
  }
});

router.post("/compare", async (req, res) => {
  let password = req.body.password;
  let hashSaved =
    "$2a$08$5iJOH709kXwFfiFlCw.uieQC7G.qQlb0bRW6SZ1cO73L0Zoq6dUu2"; // 12345
  let compare = bcrypt.compareSync(password, hashSaved);
  if (compare) {
    res.json("OK");
  } else {
    res.json("NO OK - Hash no coincide");
  }
});

module.exports = router;
