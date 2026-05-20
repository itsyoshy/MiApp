import { Audio } from "expo-av"; // Importamos el módulo de audio
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
   const [conteo, setConteo] = useState(0);
   // Reemplaza tu línea actual del useState de sonido por esta:
   const [sonido, setSonido] = useState<Audio.Sound | null>(null);
   
   // Variable de animación para la escala del botón
   const scaleAnim = useRef(new Animated.Value(1)).current;

   // Lógica de colores HSL infinitos
   const hue = (conteo * 30) % 360; 
   const colordeFondo = `hsl(${hue}, 100%, 90%)`; 
   const colorBoton = `hsl(${hue}, 70%, 50%)`;   

   // EFECTO: Pre-cargar el sonido en memoria al abrir la app (Buenas prácticas de rendimiento)
   useEffect(() => {
     async function cargarSonido() {
       const { sound } = await Audio.Sound.createAsync(
        require("./../assets/images/newsound.mp3") // Apunta directamente a tu archivo local
      );
       setSonido(sound);
     }
     cargarSonido();

     // Limpieza de memoria al cerrar la app (Previene memory leaks)
     return () => {
       if (sonido) {
         sonido.unloadAsync();
       }
     };
   }, []);

   // Función que maneja el click: Cuenta + Anima + Suena
   const manejarPresion = async () => {
     setConteo(conteo + 1);

     // 1. Reproducir el sonido cargado
     if (sonido) {
       await sonido.replayAsync(); // Replay resetea el audio al inicio por si das taps muy rápidos
     }

     // 2. Ejecutar secuencia de animación (Crecer y encoger con efecto resorte)
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
    }
  });