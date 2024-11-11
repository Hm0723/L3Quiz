import React, { useState } from "react";
import { Image, Text, View, Alert, ScrollView, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
    child: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        borderWidth: 3,
        fontSize: 24,
        textAlign: 'center',
        backgroundColor: 'lightblue',
        color:'darkblue'
    }

});

const AnimalApp = ({ picture, answer, ansSelect, index }) => {
    const checkSelect = (value) => {
        ansSelect(index, value === answer);
    };

    return (
        <View style={{ marginBottom: 20 }}>
            <Image source={picture} style={{ width: 400, height: 400 }} />
            <Text style={styles.child}>WHAT IS THIS ANIMAL?</Text>
            <RNPickerSelect
                onValueChange={checkSelect}
                items={[
                    { label: 'Rabbit', value: 'rabbit' },
                    { label: 'Deer', value: 'deer' },
                    { label: 'Crocodile', value: 'crocodile' },
                    { label: 'Owl', value: 'owl' },
                    { label: 'Elephant', value: 'elephant' },
                ]}
                placeholder={{ label: "Select an animal...", value: null }}
                style={{placeholder: {color:'red'}}}
            />
        </View>
    );
};

const ShowImg = () => {
    const [results, setResults] = useState(Array(5).fill(null));

    const answer = (index, isCorrect) => {
        setResults((prevResults) => {
            const newResults = [...prevResults];
            newResults[index] = isCorrect;
            return newResults;
        });
    };

    const checkAnswers = () => {
        const incorrectAnswersCount = results.filter((result) => result === false).length;
        if (results.every((result) => result === true)) {
            Alert.alert("All answers are correct!");
        } else {
            Alert.alert(`You have ${incorrectAnswersCount} wrong answer(s)!`);
        }
    };

    return (
        <ScrollView style={{ flex: 1}} contentContainerStyle={{ flexGrow: 1, paddingTop: 20}}>
            <Text style={{textAlign:'center', paddingTop:20, fontSize:30, fontWeight:'bold',fontStyle:'italic', color:'green'}}>
                ANIMAL QUIZ
            </Text>
            <View style={{borderWidth:5, borderStyle:'solid', justifyContent:'space-between', marginBottom:30, borderColor:'grey'}}>
                <AnimalApp picture={require('./img/rabbit.jpg')} answer="rabbit" ansSelect={answer} index={0} />
            </View>
            <View style={{borderWidth:5, borderStyle:'solid', justifyContent:'space-between', marginBottom:30, borderColor:'grey'}}>
                <AnimalApp picture={require('./img/deer.jpg')} answer="deer" ansSelect={answer} index={1} />
            </View>
            <View style={{borderWidth:5, borderStyle:'solid', justifyContent:'space-between', marginBottom:30, borderColor:'grey'}}>
                <AnimalApp picture={require('./img/crocodile.jpg')} answer="crocodile" ansSelect={answer} index={2} />
            </View>
            <View style={{borderWidth:5, borderStyle:'solid', justifyContent:'space-between', marginBottom:30, borderColor:'grey'}}>
                <AnimalApp picture={require('./img/owl.jpg')} answer="owl" ansSelect={answer} index={3} />
            </View>
            <View style={{borderWidth:5, borderStyle:'solid', justifyContent:'space-between', marginBottom:30, borderColor:'grey'}}>
                <AnimalApp picture={require('./img/elephant.jpg')} answer="elephant" ansSelect={answer} index={4} />
            </View>
            <Button
                color='green'
                onPress={checkAnswers}
                title="Submit Answer"
            />
        </ScrollView>
    );
};

export default ShowImg;
