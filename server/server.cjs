const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;
// const DB = require('./db/db.cjs')()

app.use(express.json())
app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

mongoose.connect(
  "mongodb+srv://root:root@clustersergiouao.l2sbp.mongodb.net/",
  { useNewUrlParser: true ,
    useUnifiedTopology: true,}
);




categoriasSchema = {
  nombre: String,
  imagen: String,
};

const Categorias = mongoose.model("Categorias", categoriasSchema);

async function getCategorias (){
    try{
        const arr = await Categorias.find()
        console.log(arr)
    }catch(err){
        console.error(err)
    }
}

getCategorias()

// Getters

app.get("/", (req, res) => {});

app.listen(PORT, () => {
  console.log("Server Listening on PORT:" + PORT);
});
