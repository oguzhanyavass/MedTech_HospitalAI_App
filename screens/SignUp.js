import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { AppColors } from "../config/constans";
import { TextInput, Button, Subheading, Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { colors } from "../config/theme";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigation = useNavigation();

  const theme = {mode:"dark"}
  let activeColors = colors[theme.mode];

  const createAccount = async () => {
    setIsLoading(true);
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Kullanıcının adını kaydetmek için yeni bir alan oluşturun
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      setIsLoading(false);
      navigation.popToTop();
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yeni Doktor Hesabı Oluştur</Text>
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
        style={styles.input}
        value={name}
        textColor ={{color:activeColors.tint}}
        onChangeText={(text) => setName(text)}
        label="Name"
      />

      <TextInput
        style={styles.input}
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

      <View style={styles.checkboxContainer}>
        <Checkbox
          style ={{color:activeColors.tint}}
          status={rememberMe ? "checked" : "unchecked"}
          onPress={() => setRememberMe(!rememberMe)}
        />
        <Text style={styles.checkboxLabel}>Beni Hatırla</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <Button compact onPress={() => navigation.navigate("SignIn")}>
          Hesabım Var
        </Button>
        <Button compact onPress={() => navigation.navigate("PatientLogin")}>
          Hasta Giriş
        </Button>
        <Button
          mode="contained"
          onPress={() => createAccount()}
          loading={isLoading}
          style={{marginRight:16}}
        >
          Kayıt Ol
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
    color:  activeColors.tint ,
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
  checkboxContainer: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
    color: activeColors.tint,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  checkboxLabel:{
    color:  activeColors.tint ,
  },
});


export default SignUp;
