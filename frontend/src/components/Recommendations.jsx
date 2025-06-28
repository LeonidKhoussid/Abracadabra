import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Recommendations() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
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
        setFilteredProperties(response.data.recommendations);
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

  const filterProperties = (status) => {
    setActiveFilter(status);
    setShowAll(false); // Reset show all when filter changes
    
    if (status === 'all') {
      setFilteredProperties(properties);
    } else {
      const filtered = properties.filter(property => {
        const propertyStatus = property.status || property.deadline || 'В продаже';
        
        switch (status) {
          case 'completed':
            return propertyStatus === 'Сдан' || propertyStatus === 'completed';
          case 'for-sale':
            return propertyStatus === 'В продаже' || propertyStatus === 'for-sale' || !propertyStatus;
          case 'construction':
            return propertyStatus === 'Котлован' || propertyStatus === 'construction' || propertyStatus.includes('строительство');
          default:
            return true;
        }
      });
      setFilteredProperties(filtered);
    }
  };

  // Get properties to display (limited or all)
  const getDisplayProperties = () => {
    if (showAll || filteredProperties.length <= 10) {
      return filteredProperties;
    }
    return filteredProperties.slice(0, 10);
  };

  const displayProperties = getDisplayProperties();
  const hasMoreProperties = filteredProperties.length > 10 && !showAll;

  const getStatusBadge = (property) => {
    const status = property.status || property.deadline || 'В продаже';
    
    let badgeClass = 'px-2 py-1 text-xs rounded-full font-medium ';
    let statusText = status;
    
    if (status === 'Сдан' || status === 'completed') {
      badgeClass += 'bg-green-100 text-green-800';
      statusText = 'Сдан';
    } else if (status === 'Котлован' || status === 'construction' || status.includes('строительство')) {
      badgeClass += 'bg-yellow-100 text-yellow-800';
      statusText = 'Котлован';
    } else {
      badgeClass += 'bg-blue-100 text-blue-800';
      statusText = 'В продаже';
    }
    
    return <span className={badgeClass}>{statusText}</span>;
  };

  if (loading) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-2xl font-bold mb-4">
          {isAuthenticated ? 'Рекомендации для вас' : 'Могут подойти'}
        </h2>
        
        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => filterProperties('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Все
          </button>
          <button
            onClick={() => filterProperties('for-sale')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === 'for-sale'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            В продаже
          </button>
          <button
            onClick={() => filterProperties('construction')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === 'construction'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Котлован
          </button>
          <button
            onClick={() => filterProperties('completed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === 'completed'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Сдан
          </button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-4 min-w-[250px] flex-shrink-0 animate-pulse">
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">
          {isAuthenticated ? 'Рекомендации для вас' : 'Могут подойти'}
        </h2>
        {properties.length > 0 && (
          <span className="text-gray-600 text-sm">
            {filteredProperties.length} из {properties.length} объектов
          </span>
        )}
      </div>
      
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => filterProperties('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeFilter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Все
        </button>
        <button
          onClick={() => filterProperties('for-sale')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeFilter === 'for-sale'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          В продаже
        </button>
        <button
          onClick={() => filterProperties('construction')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeFilter === 'construction'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Котлован
        </button>
        <button
          onClick={() => filterProperties('completed')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeFilter === 'completed'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Сдан
        </button>
      </div>
      
      <div className={!showAll ? "relative" : ""}>
        <div className={showAll ? 
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" : 
          "flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        }>
          {displayProperties.map((property, i) => (
            <div 
              key={property.id || i} 
              className={`bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200 ${
                !showAll ? 'min-w-[250px] flex-shrink-0' : ''
              }`}
              onClick={() => handlePropertyClick(property.id)}
            >
              <div className="relative">
                <img 
                  src={property.main_photo_url || getDefaultImage()} 
                  alt={property.name} 
                  className="rounded-lg mb-2 w-full h-40 object-cover"
                  onError={(e) => {
                    e.target.src = getDefaultImage();
                  }}
                />
                <div className="absolute top-2 right-2">
                  {getStatusBadge(property)}
                </div>
              </div>
              <div className="font-semibold text-lg mb-1">{property.name}</div>
              <div className="text-gray-500 text-sm mb-1">{property.address}</div>
              <div className="text-gray-400 text-xs mb-1">{property.property_type}</div>
              <div className="font-bold text-blue-700">{property.formatted_price}</div>
            </div>
          ))}
        </div>
        
        {/* Fade indicator for horizontal scroll */}
        {!showAll && hasMoreProperties && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#f8fbff] to-transparent pointer-events-none"></div>
        )}
      </div>
      
      {hasMoreProperties && (
        <div className="text-center mt-4">
          <p className="text-gray-500 text-sm mb-3">
            Листайте влево, чтобы увидеть больше вариантов
          </p>
          <button
            onClick={() => setShowAll(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Показать все ({filteredProperties.length} объектов)
          </button>
        </div>
      )}
      
      {showAll && filteredProperties.length > 10 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(false)}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
          >
            Свернуть (показать 10)
          </button>
        </div>
      )}
      
      {filteredProperties.length === 0 && properties.length > 0 && (
        <div className="text-center text-gray-500 py-8">
          По выбранному фильтру объекты не найдены
        </div>
      )}
      {properties.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          Рекомендации не найдены
        </div>
      )}
    </section>
  );
} 