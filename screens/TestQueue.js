// TestQueue.js functional component 
import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 
import { Button } from "react-native-paper";

// TestQueueScreen functional component 
const TestQueue = ({navigation}) => { 

return ( 
    <View style={styles.container}> 
        <Text style={styles.messageText}>Kan Tahlili İsteniyor. Yönlendirildiniz.</Text> 
        <Button mode="contained" 
        onPress={() => navigation.navigate("PatientLogin")}> 
        Ana Sayfaya Dön 
        </Button> 
    </View> 
); 
};

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: "center", alignItems: "center",}, 
messageText: { 
    fontSize: 18, 
    fontWeight: "bold",
    textAlign: "center", 
    marginBottom: 20, 
}, 
queueText: { 
    fontSize: 16, 
    textAlign: "center", 
    marginBottom: 20, 
}, 
});

export default TestQueue;