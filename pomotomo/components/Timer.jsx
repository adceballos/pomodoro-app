// components/Timer.tsx
import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(10); // state to track time passed
  const [isActive, setIsActive] = useState(false); // state to track if timer is running
  const [isWorkPhase, setIsWorkPhase] = useState(true); // State to track the current phase (work/break)
  const intervalRef = useRef(null); // Ref to hold the interval ID

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }
    else if (timeLeft === 0) {
      setIsActive(false);
      isWorkPhase ? setTimeLeft(5) : setTimeLeft(10);
      setIsWorkPhase(!isWorkPhase);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
    setTimeLeft(isWorkPhase ? 10 : 5); // Reset to the appropriate time for the current phase
  };

  // Calculate minutes and seconds from timeLeft
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  // Ensure seconds are always displayed as two digits (e.g., "04" instead of "4")
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <View style={styles.container}>
      {timeLeft > 0 ? (
        <Text style={styles.timerText}>{minutes}:{formattedSeconds}</Text>
      ) : (
        <Text style={styles.timerText}>{isWorkPhase ? "Begin 5 min rest" : "Begin 25 min work"}</Text>
      )}

      {/* Use a TouchableOpacity for a custom button with an icon and conditionally render them */}
      <View style={styles.buttonContainer}>
      {!isActive ? (
        <TouchableOpacity
          style={styles.button}
          onPress={startTimer}
        >
          <Ionicons name="play" size={40} color="#854442" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={pauseTimer}
        >
          <Ionicons name="pause" size={40} color="#854442" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={resetTimer}
      >
        <Ionicons name="refresh" size={40} color="#854442" />
      </TouchableOpacity>
      </View>
    </View>
  );
};
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    timerText: {
      fontSize: 64,
      fontWeight: 'bold',
      color: '#854442',
    },
    buttonContainer: {
      width: '50%',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      borderRadius: 8,
      marginTop: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
  });
  
  export default Timer;

