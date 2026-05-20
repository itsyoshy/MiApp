import { Audio } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
   const [conteo, setConteo] = useState(0);
   const [sonido, setSonido] = useState<Audio.Sound | null>(null);
   
   // Variable de animación para la escala del botón
   const scaleAnim = useRef(new Animated.Value(1)).current;

   // Lógica de colores HSL infinitos
   const hue = (conteo * 30) % 360; 
   const colordeFondo = `hsl(${hue}, 100%, 90%)`; 
   const colorBoton = `hsl(${hue}, 70%, 50%)`;   

   // Cargar el sonido local de forma limpia al abrir la app
   useEffect(() => {
     async function cargarSonido() {
       // IMPORTANTE: Asegúrate de que el archivo en tu carpeta assets/images 
       // se llame exactamente "button-sound.mp3". Si se llama diferente, cámbialo aquí abajo.
       const { sound } = await Audio.Sound.createAsync(
         require("../assets/images/newsound.mp3") 
       );
       setSonido(sound);
     }
     
     cargarSonido();

     // Limpieza de memoria al cerrar la app
     return () => {
       if (sonido) {
         sonido.unloadAsync();
       }
     };
   }, []);

   // Manejador del click (Cuenta, Suena y Anima)
   const manejarPresion = async () => {
     setConteo(conteo + 1);

     // Ejecutar sonido de forma inmediata (Spam-proof)
     if (sonido) {
       await sonido.replayAsync(); 
     }

     // Secuencia de animación tipo resorte
     Animated.sequence([
       Animated.timing(scaleAnim, {
         toValue: 1.2,
         duration: 100,
         useNativeDriver: true,
       }),
       Animated.spring(scaleAnim, {
         toValue: 1,
         friction: 4,
         useNativeDriver: true,
       }),
     ]).start();
   };

   return (
      <View style={[styles.container, { backgroundColor: colordeFondo }]}>
        <Text style={styles.texto}>
          {conteo}
        </Text>
        
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity 
            style={[styles.boton, { backgroundColor: colorBoton }]} 
            onPress={manejarPresion}
            activeOpacity={0.8}
          >
            <Text style={styles.interruptor}>Tap</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Texto de créditos fijo en la parte inferior */}
        <Text style={styles.creditos}>Sound from Zapsplat</Text>
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
      fontSize: 80,
      fontWeight: 'bold',
      marginBottom: 40,
      color: '#333',
    },
    boton: {
      width: 260,
      height: 260,
      borderRadius: 130,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8, 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
    },
    interruptor: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 45,
    },
    creditos: {
      position: 'absolute', 
      bottom: 40,           
      fontSize: 12,         
      color: '#666',        
      letterSpacing: 0.5,   
    }
  });