const { register } = require('../../services/user/auth.js'); // Importa la función a probar
const UserModel = require('../../models/user'); // Mock del modelo de usuario

// Mock del modelo UserModel
jest.mock('../../models/user', () => ({
  create: jest.fn()
}));

describe('register function', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
  });

  // Test 1: Verifica si falta NameUser
  it('should fail if NameUser is missing', async () => {
    const mockRequest = {
      body: {
        NameUser: undefined, // Sin NameUser
        semester: 5,
        password: 'test'
      }
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await register(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Todos los campos son obligatorios.'
    });
  });

  // Test 2: Verifica si falta semester
  it('should fail if semester is missing', async () => {
    const mockRequest = {
      body: {
        NameUser: 'Test User',
        semester: undefined, // Sin semester
        password: 'test123'
      }
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await register(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Todos los campos son obligatorios.'
    });
  });
});