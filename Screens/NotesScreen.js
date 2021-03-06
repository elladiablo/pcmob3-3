import React , {useState, useEffect}from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import {Entypo} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("notes.db");

export default function NotesScreen({ route, navigation }) {
    const [notes, setNotes] = useState([]);
    //   {title: "Walk the crazy cat", done: false, id:"0"},
    //   {title: "Feed the elephant", done: false, id:"1"},
    //   {title: "Feed the doggie", done: false, id:"2"},
    //   {title: "Feed the human", done: false, id:"3"},
   
    function refreshNotes() {
        db.transaction((tx) => {
            tx.executeSql(
        "SELECT * FROM notes",
        null,
        (txObj, { rows: {_array}})=> setNotes(_array),
        (txObj, error) => console.log("Error",error)
        );
    });
}

   useEffect(()=> {
    db.transaction((tx) => {
       tx.executeSql(
           'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, done INT);'
       );
   },
   null,
   refreshNotes
);
});
  
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

    useEffect(() => {
        if (route.params?.text) {
          db.transaction((tx) => {
            tx.executeSql("INSERT INTO notes (done, title) VALUES (0, ?)", [
              route.params.text,
            ]);
          },
          null,
          refreshNotes
          );
     
        //   const newNote = {
        //     title: route.params.text,
        //     done: false,
        //     id: notes.length.toString(),
        //   };
        //   setNotes([...notes, newNote]);
        }
      }, [route.params?.text]);
     
    function addNote() {
        navigation.navigate("Add Note") 
        // let newNote = {
        // title: "Sample new crazy note",
        // done: false,
        // id: notes.length.toString(),
        // };
        // setNotes([...notes, newNote]);
      }
     
      function deleteNote(id) {
          console.log("Deleting" + id);
          db.transaction(
              (tx)=> {
                  tx.executeSql(`DELETE FROM notes WHERE id=${id}`);
              },
              null,
              refreshNotes
          );
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
              flexDirection:"row",
              justifyContent:"space-between",
            }}
          >
            <Text style={{ textAlign: "left", fontSize: 16 }}>{item.title}</Text>
            
            <TouchableOpacity onPress={() => deleteNote(item.id)}>
              <Ionicons name="trash" size={24} color ="black"/>
            </TouchableOpacity>
          </View>
        );
      }

      return (
        <View style={styles.container}>
          <FlatList
            style={{ width: "100%" }}
            data={notes}
            renderItem={renderItem}
            keyExtractor={(item)=>item.id.toString()} //turn to integer to string
          />
        </View>
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