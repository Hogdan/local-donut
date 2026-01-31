import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DonutChart,
  DonutChartRef,
} from "./src/components/DonutChart/DonutChart";
import { useState, useRef } from "react";

export default function App() {
  const [width, setWidth] = useState(5);
  const [hours, setHours] = useState(4);
  const [overtime, setOvertime] = useState(2);
  const donutRef = useRef<DonutChartRef>(null);
  const overtimeRef = useRef<DonutChartRef>(null);
  const hoursRef = useRef<DonutChartRef>(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <DonutChart
          ref={donutRef}
          strokeWidth={width}
          labelText="Total"
          size={200}
          displayValue={hours + overtime}
          chartData={[
            { color: "#bbff00", percent: hours / 12 },
            { color: "#ea00ff", percent: overtime / 12 },
          ]}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: -40,
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
      >
        <DonutChart
          ref={overtimeRef}
          strokeWidth={width}
          size={150}
          labelText="Overtime"
          labelStyle={{ fontSize: 20, marginTop: 10 }}
          titleStyle={{ fontSize: 38, marginTop: -14 }}
          displayValue={overtime}
          chartData={[
            { color: "transparent", percent: hours / 12 },
            { color: "#ea00ff", percent: overtime / 12 },
          ]}
        />
        <DonutChart
          ref={hoursRef}
          strokeWidth={width}
          size={150}
          labelText="Standard"
          labelStyle={{ fontSize: 20, marginTop: 10 }}
          titleStyle={{ fontSize: 38, marginTop: -14 }}
          displayValue={hours}
          chartData={[{ color: "#bbff00", percent: hours / 12 }]}
        />
      </View>

      <View style={styles.controlsContainer}>
        <View style={styles.sliderGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Width:</Text>
            <Text style={styles.value}>{width.toFixed(1)}</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={20}
            value={width}
            onValueChange={setWidth}
            minimumTrackTintColor="#bbff00"
            maximumTrackTintColor="#414141"
            thumbTintColor="#bbff00"
          />
        </View>

        <View style={styles.sliderGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Hours:</Text>
            <Text style={styles.value}>{Math.floor(hours)}</Text>
          </View>
          <Slider
            style={styles.slider}
            step={1}
            minimumValue={0}
            maximumValue={12}
            value={hours}
            onValueChange={setHours}
            minimumTrackTintColor="#bbff00"
            maximumTrackTintColor="#414141"
            thumbTintColor="#bbff00"
          />
        </View>

        <View style={styles.sliderGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Overtime:</Text>
            <Text style={styles.overtimeValue}>{Math.floor(overtime)}</Text>
          </View>
          <Slider
            style={styles.slider}
            step={1}
            minimumValue={0}
            maximumValue={12}
            value={overtime}
            onValueChange={setOvertime}
            minimumTrackTintColor="#ea00ff"
            maximumTrackTintColor="#414141"
            thumbTintColor="#ea00ff"
          />
        </View>

        <TouchableOpacity
          style={styles.refreshButton}
          onPress={() => {
            donutRef.current?.refresh();
            overtimeRef.current?.refresh();
            hoursRef.current?.refresh();
          }}
        >
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b2b2b",
  },
  controlsContainer: {
    paddingHorizontal: 40,
    gap: 20,
  },
  sliderGroup: {
    gap: 8,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
  },
  value: {
    color: "#bbff00",
    fontSize: 18,
    fontWeight: "600",
  },
  overtimeValue: {
    color: "#ea00ff",
    fontSize: 18,
    fontWeight: "600",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  refreshButton: {
    backgroundColor: "#bbff00",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  refreshButtonText: {
    color: "#2b2b2b",
    fontSize: 18,
    fontWeight: "700",
  },
});
