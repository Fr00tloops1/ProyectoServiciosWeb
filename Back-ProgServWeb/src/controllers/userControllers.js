const authService = require('../services/user/auth');

exports.register = async (req, res) => {
  try {
    const user = await authService.register(req, res);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

exports.updateUser = async (req, res) => {
    try {
      // Llamada al servicio UpdateUser
      const result = await authService.UpdateUser(req, res);
  
      // Como el servicio maneja la respuesta directamente, necesitamos manejar el resultado aquí
      if (result) {
        return res.status(200).json({ message: 'Usuario actualizado', user: result });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar usuario' });
    }
  };
  

exports.getUsers = async (req, res) => {
  try {
    const users = await authService.GetUsers(req, res);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await authService.DeleteUser(req, res);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

exports.logout = async (req, res) => {
  try {
    const result = await authService.LogOut(req, res);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Error al cerrar sesión' });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await authService.LogIn(req, res);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
