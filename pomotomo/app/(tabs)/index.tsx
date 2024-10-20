import { Text, View, StyleSheet } from "react-native";
import Timer from '@/components/Timer'

export default function Index() {
  return (
      <View style={styles.container}>
        <Timer />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#be9b7b',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  titleText: {
    color: '#4b3832',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
  },
})