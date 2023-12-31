const express = require("express");
const route = express.Router();
const { sequelize, Materijal, ProizvodMaterijal} = require("../models");
const { authAdminToken } = require('./middleware'); 

route.use(express.json());
route.use(express.urlencoded({extended:true}));

route.get("/", async (req, res) => {
    try{
          const materijal = await Materijal.findAll({include:[
               {model: ProizvodMaterijal, as: "proizvod"}
             ]});
          return res.json(materijal);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });

 route.get("/:id", async (req, res) => {
    try{
          const materijal = await Materijal.findByPk(req.params.id, {include:[
               {model: ProizvodMaterijal, as: "proizvod"}
             ]});
          return res.json(materijal);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.post("/", authAdminToken, async (req, res) => {
    try{
          const novi = await Materijal.create(req.body);
          if(!res.json(novi)){
               const novi = {};
               novi.naziv = req.body.mojNaziv;
               const insertovani = await Materijal.create(novi);
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
          const materijal = await Materijal.findByPk(req.params.id);
          materijal.naziv = req.body.naziv;
          materijal.save();
          return res.json(materijal);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.delete("/:id", authAdminToken, async (req, res) => {
    try{
          const materijal = await Materijal.findByPk(req.params.id);
          materijal.destroy();
          return res.json( materijal.id );
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 module.exports = route;