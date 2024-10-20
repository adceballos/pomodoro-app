import { Text, View, StyleSheet } from "react-native";

export default function Settings() {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Settings</Text>
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
        color: '#854442',
      fontSize: 26,
      fontWeight: 'bold',
      margin: 'auto'
    },
  })