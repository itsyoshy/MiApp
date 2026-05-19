import React, { useRef, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
   const [conteo, setConteo] = useState(0);
   
   // 1. Variable de animación para controlar la escala (empieza en 100% -> 1)
   const scaleAnim = useRef(new Animated.Value(1)).current;

   // Lógica de colores infinitos basados en HSL
   const hue = (conteo * 30) % 360; 
   const colordeFondo = `hsl(${hue}, 100%, 90%)`; 
   const colorBoton = `hsl(${hue}, 70%, 50%)`;   

   // 2. Función que maneja el incremento y la animación al mismo tiempo
   const manejarPresion = () => {
     // Incrementamos el contador
     setConteo(conteo + 1);

     // Ejecutamos la secuencia de animación (Crecer y encoger)
     Animated.sequence([
       // Fase 1: Crecer a 1.2 veces su tamaño original en 100 milisegundos
       Animated.timing(scaleAnim, {
         toValue: 1.13,
         duration: 100,
         useNativeDriver: true, // Optimizado para correr directo en la GPU de tu Mac/Celular
       }),
       // Fase 2: Regresar al tamaño normal (1) con un leve efecto de resorte (spring)
       Animated.spring(scaleAnim, {
         toValue: 1,
         friction: 4, // Controla qué tan rígido es el rebote
         useNativeDriver: true,
       }),
     ]).start();
   };

   return (
      <View style={[styles.container, { backgroundColor: colordeFondo }]}>
        <Text style={styles.texto}>
          {conteo}
        </Text>
        
        {/* 3. Envolvemos el botón en una vista animada que maneja la escala */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity 
            style={[styles.boton, { backgroundColor: colorBoton }]} 
            onPress={manejarPresion}
            activeOpacity={0.8} // Evita que se vuelva gris opaco al presionarlo
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
      fontSize: 80, // Un poco más grande para que resalte
      fontWeight: 'bold',
      marginBottom: 40,
      color: '#333',
    },
    boton: {
      width: 260, // Ajustado ligeramente para dar espacio al crecimiento del 1.2
      height: 260,
      borderRadius: 130, // Sigue siendo la mitad exacta para mantener el círculo perfecto
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5, // Sombra para Android
      shadowColor: '#000', // Sombra para iOS
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
    },
    interruptor: {
      color: '#ffffff', // Cambiado a blanco para mejor contraste sobre los botones oscuros HSL
      fontWeight: 'bold',
      fontSize: 45,
    }
  });