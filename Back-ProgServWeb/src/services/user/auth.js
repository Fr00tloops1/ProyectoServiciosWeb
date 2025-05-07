const UserModel = require('../../models/user');
const { status } = require('http-status');
const bcryp = require('bcrypt');
require('dotenv').config();
const process = require('process');
const JWT = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, semester, password } = req.body;

        if (!name || !semester || !password) {
            throw new Error('Todos los campos son obligatorios');
        }

        const salt = await bcryp.genSalt(10);
        const hashpass = await bcryp.hash(password, salt);

        const user = await UserModel.create({ 
            name, 
            semester, 
            password: hashpass 
        });

        return {
            mensaje: "Usuario registrado",
            user: { 
                id: user.id,
                name: user.name, 
                semester: user.semester 
            }
        };
    } catch (exception) {
        throw new Error(exception.message);
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
        .json({ message: "Usuario actualizado", user: usuario });
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

const LogIn = async (req, res) => {
    try {
        const { name, semester, password } = req.body;

        if (!name || !semester || !password) {
            throw new Error('Todos los campos son obligatorios');
        }

        const usuario = await UserModel.findOne({ 
            where: { name, semester }
        });
        
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        const passwordValida = await bcryp.compare(password, usuario.password);

        if (!passwordValida) {
            throw new Error('Contraseña incorrecta');
        }

        const payload = {
            id: usuario.id,
            name: usuario.name
        };

        const token = JWT.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: "12h" }
        );

        return {
            user: {
                id: usuario.id,
                name: usuario.name,
                semester: usuario.semester
            },
            token: token
        };
    } catch (exception) {
        throw new Error(exception.message);
    }
};

const LogOut = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await UserModel.findOne({ where: { id } });
        
        if (!usuario) {
        return res.status(status.NOT_FOUND).json({ error: "Usuario no encontrado" });
        }
        
        res.json({
          mensaje: "Saliste de la sesionS",
          user:  usuario ,
        });
    } catch (exception) {
        return exception.message;
      }
};
  
module.exports = { UpdateUser , register , GetUsers, DeleteUser, LogOut, LogIn};

