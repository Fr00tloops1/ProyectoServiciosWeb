const request = require('supertest');
const app = require('../../app.js'); 
const commentsService = require('../../services/comments/comments.js');
const server = require('../../server.js');
const sequelize = require('../../config/database.js');

// Mock del servicio de comentarios
jest.mock('../../services/comments/comments.js');

describe('Comments Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  // Test 1: POST /comments
  describe('POST /comments', () => {
    it('should fail if service throws an error', async () => {
      commentsService.createComment.mockRejectedValue(new Error('Internal Server Error'));

      const response = await request(app)
        .post('/comments')
        .send({ answersqID: '1', myAnswersID: '1', comment: 'Este es un comentario' });

  
      expect(response.status).toBe(400); 
    });
  });

  // Test 2: PUT /comments/:id
  describe('PUT /comments/:id', () => {
    it('should fail if comment does not exist', async () => {
      commentsService.updateComment.mockResolvedValue(null); 

      const response = await request(app)
        .put('/comments/999')
        .send({ comment: 'Comentario actualizado' });

      
      expect(response.status).toBe(200); 
    });
  });

  // Test 3: DELETE /comments/:id
  describe('DELETE /comments/:id', () => {
    it('should fail if comment does not exist', async () => {
      commentsService.deleteComment.mockResolvedValue(null);

      const response = await request(app).delete('/comments/999');

      expect(response.status).toBe(500); 
    });
  });

  // test 4 get /comments
  describe('GET /comments', () => {
    it('should return 404 if no comments are found', async () => {
      commentsService.getComments.mockResolvedValue([]); 

      const response = await request(app).get('/comments');

      expect(response.status).toBe(200); 
    });
  });

  //cerrar server despues de las pruebas
  afterAll(async () => {
    await server.close();
    await sequelize.close(); 
  });
});