import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ControlSliders from './src/components/ControlSliders';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DonutChart } from './src/components/DonutChart/DonutChart';
import { useState } from 'react';


export default function App() {
  const [width, setWidth] = useState(5);
  const [length, setLength] = useState(4);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={{alignItems: 'center', marginTop: 200, marginBottom: 20}}>
        <DonutChart strokeWidth={width} chartData={[{ color: "#bbff00", percent: length / 12 }]} />
      </View>
      <ControlSliders width={width} setWidth={setWidth} length={length} setLength={setLength} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2b2b',
  },
});