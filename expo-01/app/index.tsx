import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  runOnJS 
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const THRESHOLD = SCREEN_WIDTH * 0.25;

const DraggableCard = ({ label }: { label: string }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      // Efeito de aumento ao tocar [Requisito]
      scale.value = withSpring(1.1);
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      // Lógica de Drop Zones [Requisito]
      if (event.translationX > THRESHOLD) {
        // Encaixa na direita (Gosto)
        translateX.value = withSpring(SCREEN_WIDTH / 3);
      } else if (event.translationX < -THRESHOLD) {
        // Encaixa na esquerda (Não Gosto)
        translateX.value = withSpring(-SCREEN_WIDTH / 3);
      } else {
        // Volta ao centro se solto fora das colunas [Requisito]
        translateX.value = withSpring(0);
      }
      
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text style={styles.cardText}>{label}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default function App() {
  const items = ["Brócolis", "Pizza", "Chuva", "Praia"];

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.dropZoneContainer}>
        <View style={[styles.dropZone, styles.leftZone]}>
          <Text style={styles.zoneText}>NÃO GOSTO</Text>
        </View>
        <View style={[styles.dropZone, styles.rightZone]}>
          <Text style={styles.zoneText}>GOSTO</Text>
        </View>
      </View>

      <View style={styles.cardsContainer}>
        {items.map((item, index) => (
          <DraggableCard key={index} label={item} />
        ))}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  dropZoneContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    height: '100%', 
    position: 'absolute', 
    width: '100%' 
  },
  dropZone: { flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.2 },
  leftZone: { backgroundColor: '#ff4d4d' },
  rightZone: { backgroundColor: '#4dff88' },
  zoneText: { fontWeight: 'bold', fontSize: 18, color: '#333' },
  cardsContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    width: 150,
    alignItems: 'center',
    marginBottom: 15,
  },
  cardText: { fontSize: 16, fontWeight: '600' }
});