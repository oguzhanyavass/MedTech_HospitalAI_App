import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { questions } from '../data/questionsData';
import { outcomes } from '../data/outcomes';
import { TextInput, Button, Subheading, Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// QuestionsScreen fonksiyonel bileşeni
const QuestionsScreen = ({ route, navigation }) => {
  // Giriş yapan kullanıcının kimliğini al
  const { userId } = route.params;

  // Firestore nesnesini oluştur
  const db = getFirestore();

  const [questionIndex, setQuestionIndex] = useState(0); // Soru indeksini tutan state
  const [answers, setAnswers] = useState([]); // Cevapları tutan state
  const [additionalComment, setAdditionalComment] = useState(''); // Ek açıklamayı tutan state
  const [comment, setComment] = useState(''); // Ek yorumu tutan state


  const handleAnswer = (answer) => {
    const currentQuestion = questions[questionIndex];
    const nextQuestionIndex = currentQuestion[answer];
    
    if (nextQuestionIndex !== undefined) {
      const nextQuestion = questions[nextQuestionIndex];
  
      const parsedAnswer = parseInt(nextQuestionIndex);
      let formattedAnswer;
      if (isNaN(parsedAnswer)) {
        formattedAnswer = nextQuestion;
      } else {
        formattedAnswer = parsedAnswer % 2 === 1 ? 'Evet' : 'Hayır';
      }
  
      setAnswers([...answers, { question: currentQuestion.text, answer: formattedAnswer }]);
  
      // Firestore'a cevabı gönder
      addDoc(collection(db, 'Users'), {
        tcNumber: userId,
        question: currentQuestion.text,
        answer: formattedAnswer,
      });
  
      setQuestionIndex(nextQuestionIndex);
    }
  };
  
  


  const navigateToScreen = () => {
    navigation.navigate('TestQueue'); 
    // HedefEkran, yönlendirilmek istenen ekranın adıdır.
  };

  const buttonFunc = () => {
    handleAdditionalComment();
    setAdditionalComment();
    reset();
    navigateToScreen();
  };

  const handleAdditionalComment = () => {
    setAdditionalComment();
  };

  const reset = async () => {
    // Firestore'a sonucu gönder
    const docRef = await addDoc(collection(db, 'results'), {
      tcNumber: userId, // Soru gönderen kişinin TC numarasını ekle
      answers: answers.map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
      additionalComment: additionalComment,
    });
  
    setAnswers([]);
    setQuestionIndex(0);
    setAdditionalComment('');
  
    console.log('Document written with ID: ', docRef.id);
  };
  

  return (
    <View style={styles.container}>
      {questionIndex < questions.length ? (
        // Sorular bitmediyse
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{questions[questionIndex].text}</Text>
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={() => handleAnswer('yes')}>
              Evet
            </Button>
            <Button mode="contained" onPress={() => handleAnswer('no')}>
              Hayır
            </Button>
          </View>
        </View>
      ) : (
        // Sorular bittiyse
        <View style={styles.outcomeContainer}>
          <Text style={styles.input} >
            Şikayetleriniz İçin Eklemek İstediğiniz Bir Şey Varsa Yazınız
          </Text>
          <TextInput
            style={styles.input}
            value={additionalComment}
            onChangeText={(text) => setAdditionalComment(text)}
            placeholder="Şikayet..."
          />
          <Button mode="contained" onPress={buttonFunc}>
            Yapay Zekaya Ne Yapmam Gerektiğini Sor
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  outcomeContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  outcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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

export default QuestionsScreen;
