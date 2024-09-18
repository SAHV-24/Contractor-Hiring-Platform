const mongoose = require("mongoose");

const getCategorias = async (Categorias)=>{
    const data = await Categorias.find({nombre:"Plomería"})
    const res = await data.json
    console.log(res)
}


function db() {
  // connect to the cluster:


  console.log(Categorias.find({nombre: "Electricidad"}).body)

}

module.exports = db;
