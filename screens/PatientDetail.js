// PatientDetail.js
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Divider, List,Modal, Portal, Text, Button, Dialog,TextInput  } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import { colors } from '../config/theme';

const PatientDetail = () => {
  const [patientData, setPatientData] = useState(null);
  const route = useRoute();
  const patientId = route.params.id; // get the patient id from the navigation params
  const theme = {mode:"dark"}
  let activeColors = colors[theme.mode];
  const [doctorComment, setDoctorComment] = useState(''); // Ek açıklamayı tutan state
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  useEffect(() => {
    const fetchPatientData = async () => {
      const db = getFirestore();
      const patientRef = doc(db, 'results', patientId); // get the document reference for the patient
      const patientSnapshot = await getDoc(patientRef); // get the document snapshot for the patient
      if (patientSnapshot.exists()) {
        setPatientData(patientSnapshot.data()); // set the patient data state with the document data
      }
    };

    fetchPatientData();
  }, []);

  if (!patientData) {
    return <Text style={{color:activeColors.tint}}>Loading...</Text>; // show a loading message while fetching data
  }

  return (
    <ScrollView style={{backgroundColor: activeColors.primary,flex: 1}}>
      <Text style={[styles.title,{color:activeColors.tint}]}>Hasta Detayı</Text>
      <List.Item
        title={"TC Numarası: "+patientData.tcNumber.substring(0, 11)}
        titleStyle={{color:activeColors.tint}}
        description="Oğuzhan Yavaş"
        descriptionStyle={{color:activeColors.tint}}
        left={props => 
        <List.Icon {...props} icon="account" color='red'/>}
      />
      <Divider/>
      {patientData.answers.map((answer, index) => ( // map over the answers array and display each question and answer
        <>
          <Text style={{color:activeColors.tint,marginBottom:8,paddingLeft:16,paddingTop:16}}>Soru{index + 1}:    {answer.question}</Text>
          <Text style={{color:activeColors.tint,marginBottom:18,paddingLeft:16,paddingTop:16}}>Cevap:    {answer.answer}</Text>
          <Divider/>
        </>
      ))}
      <Text style={{color:activeColors.tint,marginTop:18,marginBottom:18,paddingLeft:16,paddingTop:16}}>Ek Şikayet:   {patientData.additionalComment}</Text>
      <Divider/>
      <Divider/>


      <Button onPress={showDialog}>Hastadan İstenen Tahliller</Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>İstenen Tahliller</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">Hastadan kan tahlili istenmiştir.</Text>
              <TextInput
              style={styles.input}
              value={doctorComment}
              onChangeText={(text) => setDoctorComment(text)}
              placeholder="Gelişmemiz İçin Yorum Ekle..."
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
});

export default PatientDetail;
