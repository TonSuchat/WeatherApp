import React, { FunctionComponent } from "react";
import { weatherConditions } from "../utils/weatherConditions";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type WeatherProps = {
  city: string;
  weather: string;
  temperature: number;
  onSearch: (city: string) => void;
};

const Weather: FunctionComponent<WeatherProps> = props => {
  const styles = StyleSheet.create({
    weatherContainer: {
      flex: 1,
      backgroundColor: weatherConditions[props.weather].color
    },
    headerContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around"
    },
    tempText: {
      fontSize: 72,
      color: "#fff"
    },
    bodyContainer: {
      flex: 2,
      alignItems: "flex-start",
      justifyContent: "flex-end",
      paddingLeft: 25,
      marginBottom: 40
    },
    title: {
      fontSize: 60,
      color: "#fff"
    },
    subtitle: {
      fontSize: 24,
      color: "#fff"
    },
    searchContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    search: {
      paddingLeft: 10,
      marginTop: 10,
      height: 50,
      width: "90%",
      borderRadius: 7,
      borderColor: "#fff",
      borderWidth: 1,
      color: "#fff",
      fontSize: 24
    },
    cityContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    city: {
      fontSize: 45,
      color: "#fff"
    }
  });

  return (
    <View style={styles.weatherContainer}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          size={72}
          name={weatherConditions[props.weather].icon}
          color={"#fff"}
        />
        <Text style={styles.tempText}>{props.temperature}˚</Text>
      </View>
      <View style={styles.cityContainer}>
        <Text style={styles.city}>{props.city.toUpperCase()}</Text>
      </View>
      <View style={styles.searchContainer}>
        <Text style={styles.subtitle}>Search your city</Text>
        <TextInput
          onSubmitEditing={e => props.onSearch(e.nativeEvent.text)}
          style={styles.search}
        />
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>
          {weatherConditions[props.weather].title}
        </Text>
        <Text style={styles.subtitle}>
          {weatherConditions[props.weather].subtitle}
        </Text>
      </View>
    </View>
  );
};

export default Weather;
