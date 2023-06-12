import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "./config/theme";
import TabsNavigator from "./TabsNavigator";
import PatientDetail from "./screens/PatientDetail";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import PatientLogin from "./screens/PatientLogin";
import QuestionsScreen from "./screens/QuestionsScreen";
import TestQueue from "./screens/TestQueue";

const Stack = createNativeStackNavigator();

const StacksNavigator = () => {
  const theme = { mode: "dark" };
  const activeColors = colors[theme.mode];

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "left",
        headerTitleStyle: {
          paddingLeft: 10,
        },
        headerStyle: {
          backgroundColor: activeColors.secondary,
        },
        headerTintColor: activeColors.tint,
      }}
    >
      <Stack.Screen
        name="Main"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PatientLogin"
        component={PatientLogin}
        options={{ presentation: "fullScreenModal" }}
      />
      <Stack.Screen name="PatientDetail" 
      component={PatientDetail}
      options={{ presentation: "fullScreenModal" } }
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ presentation: "fullScreenModal" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          presentation: "fullScreenModal",
          headerBackVisible: false,
        }}
      />
       <Stack.Screen
        name="QuestionsScreen"
        component={QuestionsScreen}
        options={{ presentation: "fullScreenModal" }}
      />
      <Stack.Screen
        name="TestQueue"
        component={TestQueue}
        options={{ presentation: "fullScreenModal" }}
      />
    </Stack.Navigator>
  );
};

export default StacksNavigator;
