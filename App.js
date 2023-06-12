import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-native-paper";
import { initializeApp } from "firebase/app";
import StacksNavigator from "./StacksNavigator";

const firebaseConfig = {
  apiKey: "AIzaSyBPn-OuBn25njChjjum5wZLBYVatG8w9FE",
  authDomain: "medtech-react-native.firebaseapp.com",
  projectId: "medtech-react-native",
  storageBucket: "medtech-react-native.appspot.com",
  messagingSenderId: "508836003372",
  appId: "1:508836003372:web:c00322d6b8b2282b379b89",
  measurementId: "G-TW3GPXV7BJ"
};


const app = initializeApp(firebaseConfig);

const App = () => {
  return (
    <Provider>
      <NavigationContainer>
        <StacksNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;