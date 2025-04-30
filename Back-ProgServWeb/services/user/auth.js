const UserModel = require("../../models/user");
const { status } = require("http-status");
const bcryp = require("bcrypt");
require('dotenv').config();
const process = require("process");
const JWT = require("jsonwebtoken");

const register = async (req, res) => {
    try {
      const { name, semester, password } = req.body;
      const salt = await bcryp.genSalt(10);
      const hashpass = await bcryp.hash(password,salt);
      
  
      if (!name || !semester || !password) {
        return res
          .status(status.BAD_REQUEST)
          .json({ error: "Todos los campos son obligatorios." });
      }
  
      const payload = {
        name,password
      }
      const token = JWT.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"12h"})
      
  
      UserModel.create({ name, semester, password:hashpass });
  
      return res.json({
        mensaje: "Registered user",
        user: { name, semester, password ,token},
      });
    } catch (exception) {
      return exception.message;
    }
  };
  
  // Actualizar usuario 
  
  const UpdateUser = async (req, res) => {
  
    const { id } = req.params;
    const { name, semester, password } = req.body;
  
    const salt = await bcryp.genSalt(10);
    const hashpass = await bcryp.hash(password,salt);
  
    try {
        const usuario = await UserModel.findOne({ where: { id } });
  
        if (!usuario) {
        return res .status(status.NOT_FOUND).json({ error: "Usuario no encontrado"});
        }
        await usuario.update({ name, semester, password:hashpass } );
        return res
        .status(status.OK)
        .json({ message: 'Usuario actualizado', user: usuario });
    } catch (exception) {
        return exception.message;
      }
  };
  
  const GetUsers = async (req, res) => {
    try {
      const usuarios = await UserModel.findAll();
  
      if (usuarios.length == 0) { 
        return res
          .status(status.NOT_FOUND)
          .json({ error: "NO hay registros en la base de datos" });
      }
      return res.json({
        mensaje: "Usuario:",
        user: usuarios,
      });
    } catch (exception) {
      return exception.message;
    }
  };
  
  const DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await UserModel.findOne({ where: { id } });
        
        if (!usuario) {
        return res .status(status.NOT_FOUND).json({ error: "Usuario no encontrado"});
        }
        await usuario.destroy()
        return res
        .json({
            mensaje: "Usuario borrado con exito",
            user: { usuario },
          });
          
    } catch (exception) {
        return exception.message;
      }
  };
  
  module.exports = { UpdateUser , register , GetUsers, DeleteUser};