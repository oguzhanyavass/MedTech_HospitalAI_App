// Firebase Auth modülünü içe aktar
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// React Native bileşenlerini içe aktar
import React, { useState } from 'react';
import { Text, StyleSheet, View, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { colors } from "../config/theme";


// PatientLogin fonksiyonel bileşeni
const PatientLogin = ({ navigation }) => {
  // Firebase Authentication nesnesini oluştur
  const auth = getAuth();

  // TC kimlik numarasını tutacak state değişkeni
  const [tcNumber, setTcNumber] = useState('');

  // Giriş yap butonuna basıldığında çalışacak fonksiyon
  const signIn = async () => {
    // TC kimlik numarası geçerli ise
    if (tcNumber.length === 11) {
      try {
        // Kullanıcının hesabı zaten varsa giriş yap
        const existingUserCredential = await signInWithEmailAndPassword(
          auth,
          `${tcNumber}@example.com`,
          tcNumber
        );
        navigation.navigate('QuestionsScreen', { userId: existingUserCredential.user.email });
      } catch (e) {
        if (e.code === "auth/user-not-found") {
          // Kullanıcının hesabı yoksa yeni hesap oluştur
          try {
            const newUserCredential = await createUserWithEmailAndPassword(
              auth,
              `${tcNumber}@example.com`,
              tcNumber
            );
            navigation.navigate('QuestionsScreen', { userId: newUserCredential.user.email });
          } catch (e) {
            Alert.alert('Hata', e.message);
          }
        } else {
          Alert.alert('Hata', e.message);
        }
      }
    } else {
      // TC kimlik numarası geçersiz ise uyarı ver
      Alert.alert('Uyarı', 'Lütfen geçerli bir TC kimlik numarası girin.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MedTech Hastane Uygulaması</Text>
      <Text style={styles.title2}>Lütfen TC Kimlik Numaranızı Giriniz</Text>
      <TextInput
        style={styles.input}
        value={tcNumber}
        onChangeText={setTcNumber}
        placeholder="TC Kimlik Numaranız"
        keyboardType="numeric"
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      ></View>
      <Button mode="contained" onPress={signIn}>
        Giriş Yap
      </Button>
    </View>
  );
};

const theme = { mode: "dark" }
let activeColors = colors[theme.mode];
// Stil tanımları
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: activeColors.primary,
    padding: 32,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: "white",
    fontWeight: "800",
    marginBottom: 16,
  },
  title2: {
    textAlign: 'center',
    fontSize: 20,
    color: "white",
    fontWeight: "800",
    marginBottom: 16,
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

export default PatientLogin;
