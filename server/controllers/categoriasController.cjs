const Categorias = require("../models/Categorias.cjs");

// GET ALL
module.exports.getAll = async (req, res) => {
  try {
    const r = await Categorias.find();
    res.status(200);
    res.json(r);
  } catch (err) {
    console.error(err)
    res.status(400).json(err);
  }
};

// INSERT
module.exports.insert = async (req, res) => {
  const categoria = new Categorias({ ...req.body });

  try {
    const answer = await categoria.save();
    res.status(201).send(answer);
  } catch (err) {
    console.error(err)
    res.status(400).send(err);
  }
};

// UPDATE
module.exports.update = async (req, res) => {
  try {
    const categoria = await Categorias.findById(req.params.id);

    const body = req.body;
    // This flag is added because "__v" attribute isn't working idkw
    const hasBeenUpdated = false; 

    Object.keys(body).forEach((key) => {
      if (body[key]) {
        categoria[key] = body[key];
        this.hasBeenUpdated = true;
      }
    });

    if (hasBeenUpdated) {
      categoria["__v"] = categoria["__v"] + 1;
    }
    const answer = await categoria.save();
    res.status(200).send(answer);
  } catch (err) {
    console.error(err)
    res.status(400).send(err);
  }
};

// DELETE
module.exports.delete = async (req,res)=>{

    const id = req.params.id
  try{
    const answer = await Categorias.deleteOne({"_id":id})
    res.status(200).send(answer)
  }catch(err){
    console.error(err)
    res.status(400).json(err)
  }

}