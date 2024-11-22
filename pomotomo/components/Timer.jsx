// components/Timer.tsx
import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Audio } from 'expo-av';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(10); // state to track time passed
  const [isActive, setIsActive] = useState(false); // state to track if timer is running
  const [isWorkPhase, setIsWorkPhase] = useState(true); // State to track the current phase (work/break)
  const [tomatoCount, setTomatoCount] = useState(4); // State to track the number of tomatoes left
  const [focusPhaseCount, setFocusPhaseCount] = useState(0); // Focus phases completed
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(false); // Auto-play toggle
  const intervalRef = useRef(null); // Ref to hold the interval ID
  const [sound, setSound] = useState(null); // State to store sound instance

 // Load the sound file
 async function playSound() {
  const { sound } = await Audio.Sound.createAsync(
    require('../assets/boom.mp3') // Ensure this path is correct
  );
  setSound(sound);
  await sound.playAsync();  // Play the sound
}

// Unload the sound when the component unmounts
useEffect(() => {
  return sound ? () => { sound.unloadAsync(); } : undefined;
}, [sound]);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }
    else if (timeLeft === 0) {
      setIsActive(false);
      playSound();  // Play the sound when timer hits 0
      if (isWorkPhase) {
        // Switch to break phase and update tomato count
        const isFourthPhase = (focusPhaseCount + 1) % 4 === 0;

        setTimeLeft(isFourthPhase ? 15 : 5); // 15-second break on every 4th phase, otherwise 5 seconds
        setTomatoCount(prevCount => prevCount > 0 ? prevCount - 1 : 0); // Decrease tomato count
        setFocusPhaseCount(prevCount => prevCount + 1); // Increment the focus phase count

      } else {
        setTimeLeft(10); // Switch to work phase
      }
      setIsWorkPhase(!isWorkPhase);

      // Reset tomatoes when all are gone
      if (tomatoCount === 1 && isWorkPhase) {
        setTomatoCount(4); // Reset tomatoes after last one disappears
      }
      // Auto-play the next phase if auto-play is enabled
      if (isAutoPlayEnabled) {
        setIsActive(true);
      }
    }


    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft, isWorkPhase, isAutoPlayEnabled]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
    const isFourthPhase = (focusPhaseCount) % 4 === 0;

    if (isWorkPhase) {
      setTimeLeft(10);
    }
    else if (!isWorkPhase && isFourthPhase) {
      setTimeLeft(15);
    }
    else {
      setTimeLeft(5);
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlayEnabled(prevState => !prevState); // Toggle the auto-play feature
  };

  // Calculate minutes and seconds from timeLeft
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  // Ensure seconds are always displayed as two digits (e.g., "04" instead of "4")
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  // Create an array of tomatoes based on the current tomato count
  const tomatoArray = Array.from({ length: tomatoCount }, (_, index) => (
    <Text key={index} style={styles.tomato}>🍅</Text>
  ));

  return (
    <View style={styles.container}>
    {/* Auto-play toggle button */}
    <TouchableOpacity style={styles.autoPlayButton} onPress={toggleAutoPlay}>
      <Text style={styles.autoPlayText}>
        {isAutoPlayEnabled ? 'Auto-Play: ON' : 'Auto-Play: OFF'}
      </Text>
    </TouchableOpacity>
      {isWorkPhase? (
        <Text style={styles.phaseText}>FOCUS</Text>
      ) : (
        <Text style={styles.phaseText}>BREAK</Text>
      )}
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
      {/* Render the tomatoes */}
      <View style={styles.tomatoContainer}>
        {tomatoArray}
      </View>
      {/* Display the count of focus phases that have ended */}
      <Text style={styles.focusPhaseCountText}>
        Tomatoes Squashed: {focusPhaseCount}
      </Text>
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
      fontSize: 72,
      fontWeight: 'bold',
      color: '#854442',
    },
    phaseText: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#854442',
      marginBottom: 20,
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
    tomatoContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
    },
    tomato: {
      fontSize: 40,
      paddingRight: 16,
      paddingLeft: 16,
    },
    focusPhaseCountText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#854442',
      position: 'absolute',
      bottom: 60,
    },
    autoPlayButton: {
      paddingBottom: 24,
      marginTop: 30,
      padding: 10,
    },
    autoPlayText: {
      fontSize: 18,
      color: '#854442',
    },
  });
  
  export default Timer;