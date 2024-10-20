import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const Tomatoes = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.tomato}>🍅</Text>
            <Text style={styles.tomato}>🍅</Text>
            <Text style={styles.tomato}>🍅</Text>
            <Text style={styles.tomato}>🍅</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 140,
    },
    tomato: {
        fontSize: 40,
        paddingRight: 16,
        paddingLeft: 16,
    }
    });

export default Tomatoes;