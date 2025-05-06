const express = require('express');
const router = express.Router();
const authController = require('../../../controllers/userControllers');
const { validateData } = require('../../../middlewares/middlewaresAmano');

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar un nuevo usuario.
 *     description: Registra un nuevo usuario después de validar los datos.
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
 *               semester:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *       400:
 *         description: Datos inválidos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/register', validateData, authController.register);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualizar información de un usuario por ID.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NameUser:
 *                 type: string
 *               semester:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado.
 *       500:
 *         description: Error del servidor.
 */
router.put('/usuarios/:id', validateData, authController.updateUser);

/**
 * @swagger
 * /obtener:
 *   get:
 *     summary: Obtener todos los usuarios registrados.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Lista de usuarios.
 *       500:
 *         description: Error del servidor.
 */
router.get('/obtener', authController.getUsers);

/**
 * @swagger
 * /borrar/{id}:
 *   delete:
 *     summary: Eliminar un usuario por su ID.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuario eliminado.
 *       404:
 *         description: Usuario no encontrado.
 */
router.delete('/borrar/:id', authController.deleteUser);

/**
 * @swagger
 * /LogOut/{id}:
 *   get:
 *     summary: Cerrar sesión de un usuario.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sesión cerrada.
 *       500:
 *         description: Error del servidor.
 */
router.get('/LogOut/:id', authController.logout);

/**
 * @swagger
 * /LogIn:
 *   post:
 *     summary: Iniciar sesión.
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
 *               semester:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *       500:
 *         description: Error del servidor.
 */
router.post('/LogIn', authController.login);

module.exports = router;
