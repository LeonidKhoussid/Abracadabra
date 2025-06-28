import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Recommendations() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecommendations();
  }, [isAuthenticated]);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (isAuthenticated) {
        // Try to get personalized recommendations first
        try {
          response = await api.getPersonalizedRecommendations();
        } catch (authError) {
          // If personalized fails, fall back to general recommendations
          console.warn('Personalized recommendations failed, falling back to general:', authError);
          response = await api.getRecommendations();
        }
      } else {
        // Get general recommendations for non-authenticated users
        response = await api.getRecommendations();
      }

      if (response.success && response.data.recommendations) {
        setProperties(response.data.recommendations);
      }
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError('Не удалось загрузить рекомендации');
    } finally {
      setLoading(false);
    }
  };

  const getDefaultImage = () => 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80';

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  if (loading) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-2xl font-bold mb-4">
          {isAuthenticated ? 'Рекомендации для вас' : 'Могут подойти'}
        </h2>
        <div className="flex gap-4 overflow-x-auto">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-4 min-w-[250px] animate-pulse">
              <div className="bg-gray-300 rounded-lg mb-2 w-full h-40"></div>
              <div className="bg-gray-300 h-4 rounded mb-2"></div>
              <div className="bg-gray-300 h-3 rounded mb-1"></div>
              <div className="bg-gray-300 h-3 rounded mb-1"></div>
              <div className="bg-gray-300 h-4 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-2xl font-bold mb-4">
          {isAuthenticated ? 'Рекомендации для вас' : 'Могут подойти'}
        </h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 py-8">
      <h2 className="text-2xl font-bold mb-4">
        {isAuthenticated ? 'Рекомендации для вас' : 'Могут подойти'}
      </h2>
      <div className="flex gap-4 overflow-x-auto">
        {properties.map((property, i) => (
          <div 
            key={property.id || i} 
            className="bg-white rounded-xl shadow p-4 min-w-[250px] cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => handlePropertyClick(property.id)}
          >
            <img 
              src={property.main_photo_url || getDefaultImage()} 
              alt={property.name} 
              className="rounded-lg mb-2 w-full h-40 object-cover"
              onError={(e) => {
                e.target.src = getDefaultImage();
              }}
            />
            <div className="font-semibold text-lg mb-1">{property.name}</div>
            <div className="text-gray-500 text-sm mb-1">{property.address}</div>
            <div className="text-gray-400 text-xs mb-1">{property.property_type}</div>
            <div className="font-bold text-blue-700">{property.formatted_price}</div>
          </div>
        ))}
      </div>
      {properties.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          Рекомендации не найдены
        </div>
      )}
    </section>
  );
} 