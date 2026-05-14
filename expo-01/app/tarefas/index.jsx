import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DraggableCard = ({ label }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onBegin(() => { scale.value = withSpring(1.1); })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (event.absoluteX < SCREEN_WIDTH * 0.35) {
        translateX.value = withSpring(-SCREEN_WIDTH * 0.3); // Coluna NÃO GOSTO
      } else if (event.absoluteX > SCREEN_WIDTH * 0.65) {
        translateX.value = withSpring(SCREEN_WIDTH * 0.3);  // Coluna GOSTO
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
      scale.value = withSpring(1);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }],
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.background}>
          <View style={[styles.zone, { backgroundColor: '#ffebee' }]}><Text>NÃO GOSTO</Text></View>
          <View style={[styles.zone, { backgroundColor: '#e8f5e9' }]}><Text>GOSTO</Text></View>
        </View>
        <View style={styles.cardsArea}>
          {items.map((item, index) => <DraggableCard key={index} label={item} />)}
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { ...StyleSheet.absoluteFillObject, flexDirection: 'row' },
  zone: { flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.5 },
  cardsArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#2196F3', padding: 20, borderRadius: 10, marginBottom: 10, width: 150, alignItems: 'center' },
  cardText: { color: '#fff', fontWeight: 'bold' }
});