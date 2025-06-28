import express from 'express';
import { body, validationResult } from 'express-validator';
import { query } from '../config/database.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(verifyToken);

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', async (req, res) => {
  try {
    const userResult = await query(
      `SELECT id, first_name, last_name, email, phone, is_active, created_at, last_login
       FROM users WHERE id = $1`,
      [req.user.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Пользователь не найден'
      });
    }

    const user = userResult.rows[0];

    // Get user preferences
    const preferencesResult = await query(
      `SELECT property_type, rooms, area, budget, move_in_date, living_with, updated_at
       FROM user_preferences WHERE user_id = $1`,
      [user.id]
    );

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          phone: user.phone,
          isActive: user.is_active,
          createdAt: user.created_at,
          lastLogin: user.last_login
        },
        preferences: preferencesResult.rows[0] || null
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении профиля'
    });
  }
});

// Update profile validation
const updateProfileValidation = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Имя должно содержать от 2 до 50 символов')
    .matches(/^[а-яёА-ЯЁ\s-]+$/)
    .withMessage('Имя может содержать только русские буквы, пробелы и дефисы'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Фамилия должна содержать от 2 до 50 символов')
    .matches(/^[а-яёА-ЯЁ\s-]+$/)
    .withMessage('Фамилия может содержать только русские буквы, пробелы и дефисы'),
  
  body('phone')
    .optional()
    .matches(/^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/)
    .withMessage('Телефон должен быть в формате +7 (999) 123-45-67')
];

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', updateProfileValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Ошибка валидации',
        errors: errors.array()
      });
    }

    const { firstName, lastName, phone } = req.body;

    // Build update query dynamically
    const updateFields = [];
    const values = [];
    let paramCount = 1;

    if (firstName) {
      updateFields.push(`first_name = $${paramCount}`);
      values.push(firstName);
      paramCount++;
    }

    if (lastName) {
      updateFields.push(`last_name = $${paramCount}`);
      values.push(lastName);
      paramCount++;
    }

    if (phone) {
      updateFields.push(`phone = $${paramCount}`);
      values.push(phone);
      paramCount++;
    }

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Не указаны поля для обновления'
      });
    }

    updateFields.push(`updated_at = NOW()`);
    values.push(req.user.id);

    const updateResult = await query(
      `UPDATE users SET ${updateFields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    if (updateResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Пользователь не найден'
      });
    }

    const user = updateResult.rows[0];

    res.json({
      success: true,
      message: 'Профиль успешно обновлен',
      data: {
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          phone: user.phone,
          isActive: user.is_active,
          createdAt: user.created_at,
          lastLogin: user.last_login,
          updatedAt: user.updated_at
        }
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при обновлении профиля'
    });
  }
});

// Update preferences validation
const updatePreferencesValidation = [
  body('propertyType')
    .optional()
    .isIn(['apartment', 'penthouse', 'commercial'])
    .withMessage('Неверный тип недвижимости'),
  
  body('budget')
    .optional()
    .notEmpty()
    .withMessage('Выберите бюджет'),
  
  body('moveInDate')
    .optional()
    .notEmpty()
    .withMessage('Выберите срок заезда'),
  
  body('livingWith')
    .optional()
    .notEmpty()
    .withMessage('Выберите с кем будете жить')
];

// @route   PUT /api/users/preferences
// @desc    Update user preferences
// @access  Private
router.put('/preferences', updatePreferencesValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Ошибка валидации',
        errors: errors.array()
      });
    }

    const {
      propertyType,
      rooms,
      area,
      budget,
      moveInDate,
      livingWith
    } = req.body;

    // Check if preferences exist
    const existingPreferences = await query(
      'SELECT id FROM user_preferences WHERE user_id = $1',
      [req.user.id]
    );

    if (existingPreferences.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Предпочтения пользователя не найдены'
      });
    }

    // Build update query dynamically
    const updateFields = [];
    const values = [];
    let paramCount = 1;

    if (propertyType) {
      updateFields.push(`property_type = $${paramCount}`);
      values.push(propertyType);
      paramCount++;
    }

    if (rooms !== undefined) {
      updateFields.push(`rooms = $${paramCount}`);
      values.push(rooms);
      paramCount++;
    }

    if (area !== undefined) {
      updateFields.push(`area = $${paramCount}`);
      values.push(area);
      paramCount++;
    }

    if (budget) {
      updateFields.push(`budget = $${paramCount}`);
      values.push(budget);
      paramCount++;
    }

    if (moveInDate) {
      updateFields.push(`move_in_date = $${paramCount}`);
      values.push(moveInDate);
      paramCount++;
    }

    if (livingWith) {
      updateFields.push(`living_with = $${paramCount}`);
      values.push(livingWith);
      paramCount++;
    }

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Не указаны поля для обновления'
      });
    }

    updateFields.push(`updated_at = NOW()`);
    values.push(req.user.id);

    const updateResult = await query(
      `UPDATE user_preferences SET ${updateFields.join(', ')} WHERE user_id = $${paramCount} RETURNING *`,
      values
    );

    res.json({
      success: true,
      message: 'Предпочтения успешно обновлены',
      data: {
        preferences: updateResult.rows[0]
      }
    });

  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при обновлении предпочтений'
    });
  }
});

export default router; 