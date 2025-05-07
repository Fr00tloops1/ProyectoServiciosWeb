const { register } = require('../../services/user/auth.js');
const UserModel = require('../../models/user.js');

// Mock del modelo UserModel
jest.mock('../../models/user.js', () => ({
  create: jest.fn()
}));

describe('register function', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  // Test 1: Verifica si falta NameUser
  it('should fail if NameUser is missing', async () => {
    const mockRequest = {
      body: {
        NameUser: undefined, 
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

  });

  // Test 2: Verifica si falta semester
  it('should fail if semester is missing', async () => {
    const mockRequest = {
      body: {
        NameUser: 'Test User',
        semester: undefined,
        password: 'test123'
      }
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await register(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });


  // Test 3: Verifica un registro exitoso
  it('should register a user successfully', async () => {
    const mockRequest = {
      body: {
        NameUser: 'Test User',
        semester: 5,
        password: 'test123'
      }
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await register(mockRequest, mockResponse);

    expect(mockResponse.status).not.toHaveBeenCalledWith(400);
    expect(UserModel.create).toHaveBeenCalledWith({
      NameUser: 'Test User',
      semester: 5,
      password: expect.any(String) 
    });
    expect(mockResponse.json).toHaveBeenCalledWith({
      mensaje: 'Usuario registrado',
      user: {
        NameUser: 'Test User',
        semester: 5,
        password: 'test123' 
      }
    });
  });
});