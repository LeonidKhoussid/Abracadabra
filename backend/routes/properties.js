import express from 'express';
import { query } from '../config/database.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Apply optional auth middleware to all routes
router.use(optionalAuth);

// @route   GET /api/properties
// @desc    Get properties with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      propertyType,
      rooms,
      budget,
      city,
      developer
    } = req.query;

    const offset = (page - 1) * limit;

    // Build WHERE clause dynamically
    const whereConditions = [];
    const values = [];
    let paramCount = 1;

    if (propertyType) {
      whereConditions.push(`property_type = $${paramCount}`);
      values.push(propertyType);
      paramCount++;
    }

    if (rooms) {
      whereConditions.push(`rooms = $${paramCount}`);
      values.push(rooms);
      paramCount++;
    }

    if (budget) {
      whereConditions.push(`price <= $${paramCount}`);
      values.push(budget);
      paramCount++;
    }

    if (city) {
      whereConditions.push(`city ILIKE $${paramCount}`);
      values.push(`%${city}%`);
      paramCount++;
    }

    if (developer) {
      whereConditions.push(`developer ILIKE $${paramCount}`);
      values.push(`%${developer}%`);
      paramCount++;
    }

    const whereClause = whereConditions.length > 0 
      ? `WHERE ${whereConditions.join(' AND ')}` 
      : '';

    // Get total count
    const countResult = await query(
      `SELECT COUNT(*) FROM properties ${whereClause}`,
      values
    );
    const totalCount = parseInt(countResult.rows[0].count);

    // Get properties
    const propertiesResult = await query(
      `SELECT 
        id, name, description, property_type, rooms, area, price, 
        city, address, developer, completion_date, status,
        images, amenities, created_at, updated_at
       FROM properties 
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${paramCount} OFFSET $${paramCount + 1}`,
      [...values, limit, offset]
    );

    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      success: true,
      data: {
        properties: propertiesResult.rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCount,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении списка недвижимости'
    });
  }
});

// @route   GET /api/properties/:id
// @desc    Get property by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const propertyResult = await query(
      `SELECT 
        id, name, description, property_type, rooms, area, price, 
        city, address, developer, completion_date, status,
        images, amenities, created_at, updated_at
       FROM properties WHERE id = $1`,
      [id]
    );

    if (propertyResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Недвижимость не найдена'
      });
    }

    const property = propertyResult.rows[0];

    // If user is authenticated, check if they've viewed this property
    if (req.user) {
      await query(
        `INSERT INTO property_views (user_id, property_id, viewed_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (user_id, property_id) 
         DO UPDATE SET viewed_at = NOW()`,
        [req.user.id, id]
      );
    }

    res.json({
      success: true,
      data: {
        property
      }
    });

  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении недвижимости'
    });
  }
});

// @route   GET /api/properties/search/recommendations
// @desc    Get personalized property recommendations
// @access  Private
router.get('/search/recommendations', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Требуется авторизация для получения рекомендаций'
      });
    }

    // Get user preferences
    const preferencesResult = await query(
      `SELECT property_type, rooms, area, budget, move_in_date, living_with
       FROM user_preferences WHERE user_id = $1`,
      [req.user.id]
    );

    if (preferencesResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Предпочтения пользователя не найдены'
      });
    }

    const preferences = preferencesResult.rows[0];

    // Build recommendation query based on preferences
    const whereConditions = [];
    const values = [];
    let paramCount = 1;

    if (preferences.property_type) {
      whereConditions.push(`property_type = $${paramCount}`);
      values.push(preferences.property_type);
      paramCount++;
    }

    if (preferences.rooms) {
      whereConditions.push(`rooms = $${paramCount}`);
      values.push(preferences.rooms);
      paramCount++;
    }

    if (preferences.budget) {
      // Extract numeric value from budget string
      const budgetMatch = preferences.budget.match(/(\d+)/);
      if (budgetMatch) {
        const maxBudget = parseInt(budgetMatch[1]) * 1000000; // Convert to rubles
        whereConditions.push(`price <= $${paramCount}`);
        values.push(maxBudget);
        paramCount++;
      }
    }

    const whereClause = whereConditions.length > 0 
      ? `WHERE ${whereConditions.join(' AND ')}` 
      : '';

    // Get recommended properties
    const recommendationsResult = await query(
      `SELECT 
        id, name, description, property_type, rooms, area, price, 
        city, address, developer, completion_date, status,
        images, amenities, created_at
       FROM properties 
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT 6`,
      values
    );

    res.json({
      success: true,
      data: {
        recommendations: recommendationsResult.rows,
        preferences
      }
    });

  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении рекомендаций'
    });
  }
});

// @route   GET /api/properties/filters/options
// @desc    Get filter options for properties
// @access  Public
router.get('/filters/options', async (req, res) => {
  try {
    // Get unique cities
    const citiesResult = await query(
      'SELECT DISTINCT city FROM properties WHERE city IS NOT NULL ORDER BY city'
    );

    // Get unique developers
    const developersResult = await query(
      'SELECT DISTINCT developer FROM properties WHERE developer IS NOT NULL ORDER BY developer'
    );

    // Get price ranges
    const priceRangesResult = await query(
      'SELECT MIN(price) as min_price, MAX(price) as max_price FROM properties'
    );

    res.json({
      success: true,
      data: {
        cities: citiesResult.rows.map(row => row.city),
        developers: developersResult.rows.map(row => row.developer),
        priceRange: {
          min: priceRangesResult.rows[0]?.min_price || 0,
          max: priceRangesResult.rows[0]?.max_price || 0
        },
        propertyTypes: ['apartment', 'penthouse', 'commercial'],
        roomOptions: ['1', '2', '3', '4+']
      }
    });

  } catch (error) {
    console.error('Get filter options error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении опций фильтров'
    });
  }
});

export default router; 