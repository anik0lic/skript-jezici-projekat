const express = require("express");
const route = express.Router();
const { sequelize, Proizvod, Kategorija, ProizvodMaterijal, StavkaNarudzbine} = require("../models");
const { authAdminToken } = require('./middleware'); 

route.use(express.json());
route.use(express.urlencoded({extended:true}));

route.get("/", async (req, res) => {
    try{
          const proizvodi = await Proizvod.findAll({include:[
                 {model: Kategorija, as: "kategorija"},
                 {model: ProizvodMaterijal, as: "materijal"},
                 {model: StavkaNarudzbine, as: "stavka"}
               ]});
          return res.json(proizvodi);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.get("/:id", async (req, res) => {
    try{
          const proizvod = await Proizvod.findByPk(req.params.id,{include:[
               {model: Kategorija, as: "kategorija"},
               {model: ProizvodMaterijal, as: "materijal"},
               {model: StavkaNarudzbine, as: "stavka"}
             ]});
          return res.json(proizvod);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.post("/", authAdminToken, async (req, res) => {
    try{
          const novi = await Proizvod.create(req.body);
          if(!res.json(novi)){
               const novi = {};
               novi.naziv = req.body.mojNaziv;
               novi.opis = req.body.mojOpis;
               novi.cena = req.body.mojaCena;
               novi.kategorija_id = req.body.kategorija;
               const insertovani = await Proizvod.create(novi);
               return res.json(insertovani);
          }

          return;
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.put("/:id", authAdminToken, async (req, res) => {
    try{
          const proizvod = await Proizvod.findByPk(req.params.id);
          proizvod.naziv = req.body.naziv;
          proizvod.opis = req.body.opis;
          proizvod.cena = req.body.cena;
          proizvod.kategorija_id = req.body.kategorija_id;
          proizvod.save();
          return res.json(proizvod);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.delete("/:id", authAdminToken, async (req, res) => {
    try{
          const proizvod = await Proizvod.findByPk(req.params.id);
          proizvod.destroy();
          return res.json( proizvod.id );
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 module.exports = route;