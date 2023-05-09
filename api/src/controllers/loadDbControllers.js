const { Exercise, Bodypart, Muscle } = require("../db");
const { data } = require("../exercisesData.js");

const getAndLoadDbExercises = async () => {
  try {
    await Promise.all(
      data.map(async (e) => {
        const [exercise, created] = await Exercise.findOrCreate({
          where: {
            id: e.id,
          },
          defaults: {
            body_part: e.bodyPart,
            equipment: e.equipment,
            gif_url: e.gifUrl,
            name: e.name,
            muscle_target: e.target,
          },
        });
      })
    );
    return "Exercises loaded correctly";
  } catch (error) {
    return error;
  }
};

const getAndLoadDbBodyParts = async () => {
  try {
   /*  const bodyParts = data.map((item) => item.bodyPart);
    const uniqueBodyParts = [...new Set(bodyParts)];

    await Promise.all(
    uniqueBodyParts.forEach(async (e) => {
      await Bodypart.findOrCreate({
        where: {
          name: e.bodyPart,
        },
      });
    })) */

    return "Bodyparts loaded correctly";
  } catch (error) {
    console.log(error);
    return error;
  }
};

const { Op } = require("sequelize");

const getAndLoadDbMuscles = async () => {
  try {
    /* const uniqueMuscles = new Set();

    data.forEach((item) => {
      uniqueMuscles.add(item.target);
    });

    const dataMuscles = [...uniqueMuscles];
    dataMuscles.forEach(
      async (e) =>
        await Muscle.findOrCreate({
          where: {
            name: uniqueMuscles,
          },
        })
    );
   */

    return "Muscles loaded correctly";
  } catch (error) {
    console.log(error);
    return error;
  }
};

console.log(getAndLoadDbExercises());
console.log(getAndLoadDbBodyParts());
console.log(getAndLoadDbMuscles()); 

module.exports = {
  getAndLoadDbExercises,
  getAndLoadDbBodyParts,
  getAndLoadDbMuscles,
};
