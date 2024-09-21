const Contratistas = require("../models/Contratistas.cjs");

// GET ALL
module.exports.getAll = async (req, res) => {
  try {
    const answer = await Contratistas.find();

    res.status(200).json(answer);
  } catch (err) {
    console.error(err)
    res.status(400).send(err);
  }
};

//INSERT
module.exports.insert = async (req, res) => {
  const contratista = new Contratistas({ ...req.body });

  try {
    const answer = await contratista.save();
    res.status(200).send(answer);
  } catch (err) {
    console.error(err)
    res.status(400).send(err);
  }
};


// UPDATE
module.exports.update = async (req, res) => {
  try {
    const contratista = await Contratistas.findById(req.params.id);

    const body = req.body;
    // This flag is added because "__v" attribute isn't working idkw
    const hasBeenUpdated = false; 

    Object.keys(body).forEach((key) => {
      if (body[key]) {
        contratista[key] = body[key];
        this.hasBeenUpdated = true;
      }
    });

    if (hasBeenUpdated) {
      contratista["__v"] = contratista["__v"] + 1;
    }
    const answer = await contratista.save();
    res.status(200).send(answer);
  } catch (err) {
    console.error(err)
    res.status(400).send(err);
  }
};


//DELETE
module.exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const answer = await Contratistas.deleteOne({ _id: id });
    res.status(200).send(answer);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};