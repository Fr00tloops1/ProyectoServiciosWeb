const express = require('express');
const router = express.Router();
const questionService = require('../../../services/questions/questions');
const { status } = require('http-status');
const verifyToken = require('../../../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Endpoints para la gestión de preguntas
 */

/**
 * @swagger
 * /CrearPreguntas:
 *   post:
 *     summary: Crear una nueva pregunta.
 *     description: Este endpoint permite crear una nueva pregunta proporcionando el contenido, el tema y el nombre del profesor.
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "¿Cuál es la capital de Francia?"
 *               subject:
 *                 type: string
 *                 example: "Geografía"
 *               teacher:
 *                 type: string
 *                 example: "Profesor Pérez"
 *     responses:
 *       201:
 *         description: Pregunta creada con éxito.
 *       400:
 *         description: Faltan campos requeridos (content, subject, teacher).
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/CrearPreguntas",verifyToken,async(req,res) =>{
    try{
        const question = await questionService.createQ(req,res);
        return res.status(201).json(question);
    }
    catch(exception){
        return res.status(500);
    }
});

/**
 * @swagger
 * /MostrarPreguntas:
 *   get:
 *     summary: Obtener todas las preguntas.
 *     description: Este endpoint permite obtener todas las preguntas almacenadas en el sistema.
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: Lista de preguntas obtenida con éxito.
 *       404:
 *         description: No se encontraron preguntas en la base de datos.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/MostrarPreguntas", async(req, res) =>{
    try{
        const question = await questionService.readQ(req, res);
        return res.status(201).json(question);
    }
    catch(exception){
        return res.status(500)
    }
});

/**
 * @swagger
 * /EliminarPregunta/{id}:
 *   delete:
 *     summary: Eliminar una pregunta por su ID.
 *     description: Este endpoint permite eliminar una pregunta proporcionando su ID. 
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único de la pregunta a eliminar.
 *     responses:
 *       200:
 *         description: Pregunta eliminada con éxito.
 *       404:
 *         description: La pregunta con el ID proporcionado no existe.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/EliminarPregunta/:id", async(req, res) =>{
    try{
        const question = await questionService.deleteQ(req, res);
        return res.status(201).json(question);
    }
    catch(exception){
        return res.status(500)
    }
});

/**
 * @swagger
 * /EditarPregunta/{id}:
 *   put:
 *     summary: Actualizar una pregunta por su ID.
 *     description: Este endpoint permite actualizar una pregunta proporcionada su ID. Se puede modificar el contenido, el tema y el nombre del profesor.
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único de la pregunta a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "¿Qué es la fotosíntesis?"
 *               subject:
 *                 type: string
 *                 example: "Biología"
 *               teacher:
 *                 type: string
 *                 example: "Profesor Gómez"
 *     responses:
 *       200:
 *         description: Pregunta actualizada con éxito.
 *       404:
 *         description: No se encontró la pregunta con el ID proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put("/EditarPregunta/:id", async(req, res) =>{
    try{
        const question = await questionService.updateQ(req, res);
        return res.status(201).json(question);
    }
    catch(exception){
        return res.status(500)
    }
});

router.get("/MostrarMisPreguntas", async(req, res) =>{
    try{
        const question = await questionService.questionUser(req, res);
        return res.status(201).json(question);
    }
    catch(exception){
        return res.status(500)
    }
});

module.exports = router;
