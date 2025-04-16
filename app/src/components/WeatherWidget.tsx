import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getWeatherByCity } from '../services/weatherService';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  name: string;
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeatherByCity('Jakarta');
        setWeather(data);
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#4f80c6" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="weather-partly-cloudy" size={24} color="#4f80c6" />
        <Text style={styles.cityText}>{weather?.name}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.tempText}>{Math.round(weather?.main.temp || 0)}°C</Text>
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="water" size={16} color="#4f80c6" />
            <Text style={styles.detailText}>{weather?.main.humidity}%</Text>
          </View>
          <Text style={styles.descText}>
            {weather?.weather[0].description}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 12,
    borderRadius: 12,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  content: {
    alignItems: 'flex-start',
  },
  tempText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4f80c6',
    marginBottom: 4,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  descText: {
    fontSize: 12,
    color: '#666',
    textTransform: 'capitalize',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default WeatherWidget; 