import React, { useState } from "react";
import { Image, Text, View, Alert, ScrollView, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const AnimalApp = ({ picture, answer, ansSelect, index }) => {
    const checkSelect = (value) => {
        ansSelect(index, value === answer); // Pass index and if answer is correct
    };

    return (
        <View style={{ marginBottom: 20 }}>
            <Image source={picture} style={{ width: 400, height: 400 }} />
            <Text>What is the animal?</Text>
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
            />
        </View>
    );
};

const ShowImg = () => {
    // Initialize results with fixed length, filled with `null` (to represent unanswered questions)
    const [results, setResults] = useState(Array(5).fill(null));

    const answer = (index, isCorrect) => {
        setResults((prevResults) => {
            const newResults = [...prevResults];
            newResults[index] = isCorrect; // Update only the index of the specific question
            return newResults;
        });
    };

    const checkAnswers = () => {
        const correctAnswersCount = results.filter((result) => result === true).length;
        const incorrectAnswersCount = results.filter((result) => result === false).length;

        if (results.every((result) => result === true)) {
            Alert.alert("All answers are correct!");
        } else {
            Alert.alert(`You have ${incorrectAnswersCount} wrong answer(s)!`);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <AnimalApp picture={require('./img/rabbit.jpg')} answer="rabbit" ansSelect={answer} index={0} />
            <AnimalApp picture={require('./img/deer.jpg')} answer="deer" ansSelect={answer} index={1} />
            <AnimalApp picture={require('./img/crocodile.jpg')} answer="crocodile" ansSelect={answer} index={2} />
            <AnimalApp picture={require('./img/owl.jpg')} answer="owl" ansSelect={answer} index={3} />
            <AnimalApp picture={require('./img/elephant.jpg')} answer="elephant" ansSelect={answer} index={4} />
            <Button
                onPress={checkAnswers}
                title="Submit Answer"
            />
        </ScrollView>
    );
};

export default ShowImg;
