const express = require('express');
const router = express.Router();
const authService = require('../../../services/user/auth');
require('dotenv').config();
const { status } = require("http-status");

router.post("/register", async(req, res) =>{
    try {
        const user = await authService.register(req, res);
        return res.status(201).json(user);
      } catch (exception) {
        return res.status(500);
      }
});

router.put('/usuarios/:id', async (req, res) => {
  try {
      const UserUpdated = await authService.UpdateUser(req, res);
      res
      .status(status.OK).json({ message: 'Usuario actualizado', user: UserUpdated });
  } catch (exception) {
      return res.status(500);
  }
});

router.get("/obtener", async(req, res) =>{
    try {
        const user = await authService.GetUsers(req, res);
        return res.status(status.OK).json(user);
      } catch (exception) {
        return res.status(500);
      }
});

router.delete("/borrar/:id", async(req, res) =>{
    try {
        const user = await authService.DeleteUser(req, res);
        return res.status(status.NO_CONTENT).json(user);
      } catch (exception) {
        return res.status(500);
      }
});

router.get("/LogOut/:id", async(req, res) =>{
  try {
      const user = await authService.LogOut(req, res);
      return res.status(status.OK).json(user);
    } catch (exception) {
      return res.status(500);
    }
});

module.exports = router;