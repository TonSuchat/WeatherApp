import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import Weather from "./components/weather";
import { api_key, api_uri } from "./utils/appConfig";

type AppState = {
  isLoading: boolean;
  city: string;
  temperature: number;
  weatherCondition: string;
  error?: any;
  lat: number;
  lon: number;
};

export default function App() {
  const [state, setState] = useState<AppState>({
    isLoading: true,
    city: "",
    temperature: 0,
    weatherCondition: null,
    lat: 0,
    lon: 0
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async position => {
        // fetch the weather by location
        const uri = buildWeatherUriByLatLon(
          position.coords.latitude,
          position.coords.longitude
        );
        setState({
          ...state,
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        await fetchWeather(uri);
      },
      error => {
        setState({ ...state, error: "Error getting Conditions" });
      }
    );
  }, []);

  const buildWeatherUriByLatLon = (lat: number, lon: number) => {
    return `${api_uri}?lat=${lat}&lon=${lon}&APPID=${api_key}&units=metric`;
  };

  const buildWeatherUriByCity = (city: string) => {
    return `${api_uri}?q=${city}&APPID=${api_key}&units=metric`;
  };

  const fetchWeather = async uri => {
    const res = await fetch(uri);
    const json = await res.json();
    if (json && json.cod == 200) {
      setState({
        ...state,
        city: json.name,
        isLoading: false,
        temperature: json.main.temp,
        weatherCondition: json.weather[0].main
      });
    } else {
      Alert.alert("City not found");
    }
  };

  const onSearch = async (city: string) => {
    const uri = city
      ? buildWeatherUriByCity(city)
      : buildWeatherUriByLatLon(state.lat, state.lon);
    await fetchWeather(uri);
  };

  return (
    <View style={styles.container}>
      {state.isLoading ? (
        <Text>Fetching the weather data.</Text>
      ) : (
        <Weather
          city={state.city}
          temperature={state.temperature}
          weather={state.weatherCondition}
          onSearch={(city: string) => onSearch(city)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
