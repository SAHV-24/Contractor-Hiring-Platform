const app = require("./server.cjs");
const dbConnection = require("./db/db.cjs");

// collections
const Categorias = require("./models/Categorias.cjs");
const Usuarios = require("./models/Usuarios.cjs");
const Contratistas = require("./models/Contratistas.cjs");
const Citas = require("./models/Citas.cjs");

function getCategoryUrl(name) {
  const collections = [Categorias, Usuarios, Contratistas, Citas];

  for (let col of collections) {
    console.log(col.modelName);
    if (name === col.modelName) {
      return col;
    }
  }

  return false;
}

app.get("/:collection", async (req, res) => {
  try {
    const urlCollection = req.params.collection;
    const model = getCategoryUrl(urlCollection);

    if (model === false) {
      throw new Error(`${urlCollection} not found.`);
    }

    const data = await model.find();
    res.json(data);
  } catch (err) {
    res.status(404);
    res.send(err);
  }
});

app.post("/:collection", async (req, res) => {
  try {
    const urlCollection = req.params.collection;
    const model = getCategoryUrl(urlCollection);    
    
    if (model === false) {
      throw new Error(`${urlCollection} not found.`);
    }
  } catch (err) {}
});
