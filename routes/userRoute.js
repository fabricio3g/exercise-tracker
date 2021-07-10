const router = require("express").Router();
let Exercise = require("../models/exercise.model");
let User = require("../models/user.model");

router.route("/api/users").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/api/users").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then((user) => res.json({ username: user.username, _id: user._id }))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/api/users/:_id/logs").get((req, res) => {
  const _id = req.params._id;
  const LIMIT = req.query.limit;
  const FROM = new Date(req.query.from);
  const TO = new Date(req.query.to);

  Exercise.findById(_id.toString())
    .then((data) => {
      const LOGS = data.log.filter((d) => {
        return (d.date >= FROM && d.date <= TO) || d;
      });
      const LogsFromated = LOGS.map((d) => {
        const date = new Date(d.date);
        const dateSplit = date.toString().split(" ");

        const dateJoin =
          dateSplit[0] +
          " " +
          dateSplit[1] +
          " " +
          dateSplit[2] +
          " " +
          dateSplit[3];

        return {
          description: d.description,
          duration: d.duration,
          date: dateJoin
        };
      });

      let logLimit =
        LIMIT === "undefined" ? LogsFromated : LogsFromated.slice(0, LIMIT);

      res.json({
        _id: data._id,
        username: data.username,
        count: LOGS.length,
        log: logLimit
      });
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
