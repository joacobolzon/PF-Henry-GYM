const axios = require("axios");
const { Exercise, Bodypart, Muscle } = require("../db");
const exercisesData = require("./exercisesData");

const getAndLoadDbExercises = async () => {
  try {
    // Utiliza el array de objetos directamente
    exercisesData.map((e) =>
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
  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": "7e715ef831msh5c89891ae4651bdp13cde7jsn517618af6d57",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    response.data.map((e) =>
      Bodypart.findOrCreate({
        where: {
          name: e,
        },
      })
    );
    return "Body parts loaded correctly";
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAndLoadDbMuscle = async () => {
  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/targetList",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": "7e715ef831msh5c89891ae4651bdp13cde7jsn517618af6d57",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    response.data.map((e) =>
      Muscle.findOrCreate({
        where: {
          name: e,
        },
      })
    );
    return "Muscles loaded correctly";
  } catch (error) {
    console.log(error);
    return error;
  }
};
console.log(getAndLoadDbMuscle());
console.log(getAndLoadDbExercises());
console.log(getAndLoadDbBodyParts());

module.exports = {
  getAndLoadDbExercises,
  getAndLoadDbBodyParts,
  getAndLoadDbMuscle,
};
