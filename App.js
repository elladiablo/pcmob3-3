import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React , {useEffect}from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import {Entypo} from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import {useState} from "react";

const db = SQLite.openDatabase("notes.db");


function NotesScreen({ navigation }) {
  const [notes, setNotes] = useState([
    {title: "Walk the crazy cat", done: false, id:"0"},
    {title: "Feed the elephant", done: false, id:"1"},
    {title: "Feed the doggie", done: false, id:"2"},
    {title: "Feed the human", done: false, id:"3"},
  ]);

 useEffect(()=>{
   navigation.setOptions({
     headerRight: () => (
       <TouchableOpacity onPress={addNote}>
        <Entypo
          name="new-message"
          size ={24}
          color="black"
          style={{marginRight:20}}
          />
        </TouchableOpacity>
        ),
    });
  });
 
 function addNote() {
   let newNote = {
     title: "Sample new crazy note",
     done: false,
     id: notes.length.toString(),
   };
   setNotes([...notes, newNote]);
 }

 function renderItem({ item }) {
   return (
     <View
       style={{
         padding: 10,
         paddingTop: 20,
         paddingBottom: 20,
         borderBottomColor: "#ccc",
         borderBottomWidth: 1,
       }}
     >
       <Text style={{ textAlign: "left", fontSize: 16 }}>{item.title}</Text>
     </View>
   );
 }

 return (
   <View style={styles.container}>
     <FlatList
       style={{ width: "100%" }}
       data={notes}
       renderItem={renderItem}
     />
   </View>
 );
}


const Stack = createStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen
         name="Notes"
         component={NotesScreen}
         options={{
           headerTitle: "EllaDiablo Note App",
           headerTitleStyle: {
             fontWeight: "bold",
             fontSize: 30,
           },
           headerStyle: {
             height: 120,
             backgroundColor: "pink",
             borderBottomColor: "#ccc",
             borderBottomWidth: 1,
           },
         }}
       />
     </Stack.Navigator>
   </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#ffc",
   alignItems: "center",
   justifyContent: "center",
 },
});


