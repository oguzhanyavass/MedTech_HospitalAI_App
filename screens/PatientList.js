import React, { useState, useEffect } from 'react';
import { ScrollView, Text, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Divider, List,Button} from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { colors } from '../config/theme';

const PatientList = () => {
  const [patientsData, setPatientsData] = useState([]);
  const navigation = useNavigation();

  const theme = {mode:"dark"}
  let activeColors = colors[theme.mode];

  useEffect(() => {
    const fetchPatientsData = async () => {
      const db = getFirestore();
      const patientsRef = collection(db, 'results');
      const patientsSnapshot = await getDocs(patientsRef);
      const patients = patientsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPatientsData(patients);
    };

    fetchPatientsData();
  }, []);

  return (
    <ScrollView  style={{backgroundColor: activeColors.primary,flex: 1,}}>
      <Text style={[styles.title,{color:activeColors.tint}]}>Hasta Listesi</Text>
      <FlatList
        data={patientsData}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}
          onPress={() => navigation.navigate("PatientDetail", {id: item.id})}>
          <List.Item
            title={"TC Numarası: "+item.tcNumber.substring(0, 11)}
            description="Oğuzhan Yavaş"
            left={props => 
            <List.Icon {...props} icon="account" />}
            />
            <Divider/>
            <Text>Soru: {item.answers[0].question}</Text>
            <Text>Cevap: {item.answers[0].answer}</Text>
            <Divider/>
            <Text>Soru: {item.answers[1].question}</Text>
            <Text>Cevap: {item.answers[1].answer}</Text>
            <Divider/>
            <Text>Soru: {item.answers[2].question}</Text>
            <Text>Cevap: {item.answers[2].answer}</Text>
            <Divider/>
            <Text>Ek Şikayet: {item.additionalComment}</Text>
            <Button 
            compact onPress={() => navigation.navigate("PatientDetail", {id: item.id})}>
            Detay
            </Button>
          </TouchableOpacity>
          
        )}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    borderRadius:36,
  },

});

export default PatientList;
