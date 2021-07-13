const Exercise = require("../models/exercise.model");

const User = require("../models/user.model");

const exerciseRoute = async (req, res) => {
  const id = req.params._id;
  const description = req.body.description;
  const duration = parseInt(req.body.duration);
  const newDate = new Date()
  let date = req.body.date === undefined ? newDate : new Date(req.body.date);
  const dateSplit = date.toString().split(" ");

  const dateJoin =
    dateSplit[0] + " " + dateSplit[1] + " " + dateSplit[2] + " " + dateSplit[3];

  await User.findById(id).then((data) => {
    const username = data.username;
    const count = 1;

    Exercise.findById(data._id)
      .then((exerciseData) => {
        const update = {
          _id: data._id,
          username: data.username,
          count: exerciseData.log.length,
          log: {
            description,
            duration,
            date: date
          }
        };

        Exercise.findOneAndUpdate(
          { _id: exerciseData._id },
          { $push: { log: update.log } },
          (err, success) => {
            if (err) {
              console.log("Cant't not update");
            } else {
              res.json({
                _id: id,
                username: username,
                date: dateJoin,
                duration: duration,
                description: description
              });
            }
          }
        );
      })
      .catch(() => {
        const newExercise = new Exercise({
          _id: data._id,
          username,
          count,
          log: {
            description,
            duration,
            date: date
          }
        });
        newExercise.save().then(() => {
          res.json({
            _id: id,
            username,
            date: dateJoin,
            duration,
            description
          });
        });
      });
  });
};

module.exports = exerciseRoute;
