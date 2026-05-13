import React, { use, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function App() {
   const [conteo, setConteo] = useState(0);
   

   const hue = (conteo * 30) % 360; 
  
  const colordeFondo = `hsl(${hue}, 100%, 90%)`; // Pastel (Brillante)
  const colorBoton = `hsl(${hue}, 70%, 50%)`;   // Oscuro (Profundo)

   

   return (
      <View style={[styles.container, { backgroundColor: colordeFondo }]}>
        <Text style={styles.texto}>
          {conteo}
        </Text>
        <TouchableOpacity style={[styles.boton, { backgroundColor: colorBoton }]} onPress={() => setConteo(conteo + 1)}>
          <Text style={styles.interruptor}>Tap</Text>
        </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    texto: {
      fontSize: 60,
      fontWeight : 'bold',
      marginBottom: 40,
      color: '#333',
      alignItems: 'flex-start',
    },
    boton: {
      width: 300,
      height: 300,
      borderRadius: 150,
      alignItems: 'center',
      justifyContent: 'center',
    },
    interruptor: {
      color: '#262121',
      fontWeight: 'bold',
      fontSize: 40,
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'arial'
    }
  });
