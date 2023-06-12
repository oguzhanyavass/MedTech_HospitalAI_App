import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { AppColors } from "../config/constans";
import { TextInput, Button, Subheading, Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { colors } from "../config/theme";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigation = useNavigation();

  const theme = {mode:"dark"}
  let activeColors = colors[theme.mode];

  const signIn = async () => {
    setIsLoading(true);
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setIsLoading(false);
      if (rememberMe) {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
      }
      navigation.popToTop();
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');
      if (email && password) {
        setEmail(email);
        setPassword(password);
        setRememberMe(true);
      }
    };
    loadUserData();
  }, []);

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>MedTech</Text>
      <Text style={styles.title}>Doktor Girişi</Text>
      {!!error && (
        <Subheading
          style={{
            color: "red",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          {error}
        </Subheading>
      )}

      <TextInput
        style={[styles.input]}
        value={email}
        textColor ={{color:activeColors.tint}}
        onChangeText={(text) => setEmail(text)}
        label="Email"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        value={password}
        textColor ={{color:activeColors.tint}}
        onChangeText={(text) => setPassword(text)}
        label="Password"
        secureTextEntry
      />

      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}>
        <Checkbox
          style ={{color:activeColors.tint}}
          status={rememberMe ? "checked" : "unchecked"}
          onPress={() => setRememberMe(!rememberMe)}
        />
        <Text style={{ color: activeColors.tint, marginLeft: 8 }}>Beni Hatırla</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <Button compact onPress={() => navigation.navigate("PatientLogin")} >
          Hasta Girişi
        </Button>
        <Button mode="contained" onPress={() => signIn()} loading={isLoading}>
          Giriş Yap
        </Button>
      </View>
    </View>
  );
};

  const theme = {mode:"dark"}
  let activeColors = colors[theme.mode];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: activeColors.primary,
    padding: 32,
  },
  title: {
    fontSize: 36,
    color: "white",
    fontWeight: "800",
    marginBottom: 16,
  },
  contentContainer: {
    padding: 32,
  },
  input: {
    backgroundColor: activeColors.tertiary,
    fontSize: 16,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
  },
});

export default SignIn;
