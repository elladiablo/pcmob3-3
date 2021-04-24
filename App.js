import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React , {useEffect}from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import {Entypo} from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import {useState} from "react";
import NotesStack from "./Screens/NotesStack";
import AddScreen from "./Screens/AddScreen";

const db = SQLite.openDatabase("notes.db");

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode = "modal" headerMode ="none">
        <Stack.Screen
        name ="Notes Stack"
        component ={NotesStack}
        options ={{headerShown:false}}
      />
      <Stack.Screen name ="Add Note" component = {AddScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}




