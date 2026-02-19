'use strict';

import jwt from 'jsonwebtoken';
import { User } from '../users/user.model.js'; // ajusta ruta si cambia

export const validateJWT = async (req, res, next) => {
  try {
    let token =
      req.header('x-token') ||
      req.header('authorization') ||
      req.body.token ||
      req.query.token;

    // ❌ No token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No hay token en la petición',
      });
    }

    // Quitar "Bearer "
    token = token.replace(/^Bearer\s+/i, '');

    // ❌ No secret
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'JWT no configurado en el servidor',
      });
    }

    // ✅ Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded.id porque así generamos el token normalmente
    const user = await User.findById(decoded.id).populate('role');

    // ❌ Usuario no existe
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no existe',
      });
    }

    // ❌ Usuario inactivo
    if (!user.status) {
      return res.status(403).json({
        success: false,
        message: 'Usuario desactivado',
      });
    }

    // ✅ Datos útiles en request
    req.user = user;
    req.userId = user._id;
    req.role = user.role?.name || null;

    next();
  } catch (error) {
    console.error('JWT Error:', error);

    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado',
    });
  }
};
