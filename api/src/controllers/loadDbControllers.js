const { Exercise, Bodypart, Muscle } = require("../db");
const {data} = require("../exercisesData.js");

const getAndLoadDbExercises = async () => {
  try {
    // Utiliza el array de objetos directamente
    console.log(data);
    data.map((e) =>
      Exercise.findOrCreate({
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
      })
    );

    return "Exercises loaded correctly";
  } catch (error) {
    return error;
  }
};

const getAndLoadDbBodyParts = async () => {
  try {
    const bodyPartsSet = new Set();
    

    // Extrae los bodyParts y muscles únicos
    data.forEach((exercise) => {
      bodyPartsSet.add(exercise.bodyPart);
    });

    // Convierte los Sets en Arrays
    const bodyPartsArray = Array.from(bodyPartsSet);

    // Agrega los bodyParts únicos a la tabla Bodypart
    await Promise.all(
      bodyPartsArray.map((bodyPart) =>
        Bodypart.findOrCreate({
          where: {
            name: bodyPart,
          },
        })
      )
    );

    return "Bodyparts loaded correctly";
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAndLoadDbMuscle = async () => {
  try {
    const musclesSet = new Set();

    // Extrae los bodyParts y muscles únicos
    data.forEach((exercise) => {
      musclesSet.add(exercise.target);
    });

    // Convierte los Sets en Arrays
    const musclesArray = Array.from(musclesSet);

    // Agrega los muscles únicos a la tabla Muscle
    await Promise.all(
      musclesArray.map((muscle) =>
        Muscle.findOrCreate({
          where: {
            name: muscle,
          },
        })
      )
    );

    return "Muscles loaded correctly";
  } catch (error) {
    console.log(error);
    return error;
  }
}



console.log(getAndLoadDbExercises());
console.log(getAndLoadDbBodyParts());
console.log(getAndLoadDbMuscle());

module.exports = {
  getAndLoadDbExercises,
   getAndLoadDbBodyParts,
  getAndLoadDbMuscle
};
