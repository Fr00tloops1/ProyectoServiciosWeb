const express = require('express');
const router = express.Router();
const authService = require('../../../services/user/auth');
require('dotenv').config();
const { status } = require("http-status");
const {validateData} = require('../../../middlewares/middlewaresAmano');

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar un nuevo usuario.
 *     description: Este endpoint permite registrar un nuevo usuario proporcionando los datos requeridos. El middleware de validación verifica que la solicitud cumpla con los requisitos antes de crear el usuario.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NameUser:
 *                 type: string
 *                 example: "usuarioNuevo"
 *               semester:
 *                 type: string
 *                 example: "5"
 *               password:
 *                 type: string
 *                 example: "abcd1234"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *       400:
 *         description: Solicitud inválida o datos incompletos.
 *       500:
 *         description: Error interno del servidor.
 */

router.post("/register", validateData, async(req, res) =>{
    try {
        const user = await authService.register(req, res);
        return res.status(201).json(user);
    } catch (exception) {
        return res.status(500);
    }
});

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualizar la información de un usuario específico.
 *     description: Este endpoint permite actualizar los detalles de un usuario proporcionando su ID. Se puede modificar el nombre de usuario, semestre y contraseña.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del usuario a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NameUser:
 *                 type: string
 *                 example: "usuarioActualizado"
 *               semester:
 *                 type: string
 *                 example: "7"
 *               password:
 *                 type: string
 *                 example: "5678"
 *     responses:
 *       200:
 *         description: Usuario actualizado.
 *       500:
 *         description: Error interno o usuario no encontrado.
 */
router.put("/usuarios/:id", async (req, res) => {
  try {
      const UserUpdated = await authService.UpdateUser(req, res);
      res
      .status(status.OK).json({ message: 'Usuario actualizado', user: UserUpdated });
  } catch (exception) {
      return res.status(500);
  }
});

/**
 * @swagger
 * /obtener:
 *   get:
 *     summary: Obtener una lista de todos los usuarios registrados.
 *     description: Este endpoint permite obtener todos los usuarios registrados en el sistema. El resultado es una lista de objetos de usuario.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/obtener", async(req, res) =>{
    try {
        const user = await authService.GetUsers(req, res);
        return res.status(status.OK).json(user);
    } catch (exception) {
        return res.status(500);
    }
});

/**
 * @swagger
 * /borrar/{id}:
 *   delete:
 *     summary: Eliminar un usuario por su ID.
 *     description: Este endpoint permite eliminar un usuario específico proporcionando su ID. Tras la eliminación, el usuario ya no podrá acceder al sistema.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del usuario que se desea eliminar.
 *     responses:
 *       204:
 *         description: Usuario eliminado exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 */
router.delete("/borrar/:id", async(req, res) =>{
    try {
        const user = await authService.DeleteUser(req, res);
        return res.status(status.NO_CONTENT).json(user);
    } catch (exception) {
        return res.status(500);
    }
});

/**
 * @swagger
 * /LogOut/{id}:
 *   get:
 *     summary: Cerrar sesión de un usuario.
 *     description: Este endpoint cierra la sesión de un usuario específico proporcionando su ID. El usuario ya no estará autenticado en el sistema.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del usuario que desea cerrar sesión.
 *     responses:
 *       200:
 *         description: Usuario cerrado sesión exitosamente.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/LogOut/:id", async(req, res) =>{
  try {
      const user = await authService.LogOut(req, res);
      return res.status(status.OK).json(user);
    } catch (exception) {
      return res.status(500);
    }
});

/**
 * @swagger
 * /LogIn:
 *   post:
 *     summary: Iniciar sesión de un usuario.
 *     description: Este endpoint permite a un usuario autenticarse proporcionando su nombre de usuario, semestre y contraseña. Si las credenciales son correctas, el usuario podrá acceder al sistema.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NameUser:
 *                 type: string
 *                 example: "usuario1"
 *               semester:
 *                 type: string
 *                 example: "6"
 *               password:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente y sesión iniciada.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/LogIn", async(req, res) =>{
  try {
      const user = await authService.LogIn(req, res);
      return res.status(status.OK).json(user);
    } catch (exception) {
      return res.status(500);
    }
});

module.exports = router;
