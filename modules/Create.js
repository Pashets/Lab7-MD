import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import { DATA } from "../screens/Book";

let newPosterCounter = 0

import { styleConfig } from "../style";

const inputColor = styleConfig.searchColor

export default function Create({ navigation, route }) {
    const [title, onChangeTitle] = useState('');
    const [price, onChangePrice] = useState('');
    const [subtitle, onChangeSubtitle] = useState('');
    const [show, setShow] = useState(false)

    const newItem = () => {
        onChangeTitle('')
        onChangePrice('')
        onChangeSubtitle('')
        if (title != '') {
            const obj = {
                "title": title,
                "price": price,
                "subtitle": subtitle,
                "isbn13": newPosterCounter + 1,
            }

            DATA.push(obj)
            newPosterCounter++
            navigation.navigate('Book')
        } else {
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 4000);
        }
    }
const arr = []
    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps='handled'
            >


                <Text style={styles.textStyle}>Title</Text>
                <View style={styles.sectionStyle}>
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={(text) => onChangeTitle(text)}
                        value={title}
                        clearButtonMode={'while-editing'}
                    />
                </View>
                <View style={{ padding: 2 }}>
                    {show ? (<Text style={styles.textTipStyle}>This field must be filled!</Text>) : null}
                </View>


                <Text style={styles.textStyle}>Price</Text>
                <View style={styles.sectionStyle}>
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={(text) => onChangePrice(text)}
                        value={price}
                        clearButtonMode={'while-editing'}
                    />
                </View>
                <View style={{ padding: 2 }}></View>


                <Text style={styles.textStyle}>Subtitle</Text>
                <View style={styles.sectionStyle}>
                    <TextInput
                        keyboardType={'numeric'}
                        style={styles.textInputStyle}
                        onChangeText={(text) => {
                            onChangeSubtitle(text)
                            let arr = text.split('')
           
                            arr.forEach(function(item, index, array) {
                                if(item === ',') {
                                    onChangeYear(subtitle)
                                }
                            })
                                                        
                        }}
                        value={subtitle}
                        clearButtonMode={'while-editing'}
                        maxLength={4}
                    />
                </View>
                <View style={{ padding: 2 }}></View>

                <View style={styles.buttonStyleContainer}>
                    <Button
                        style={styles.buttonStyle}
                        title="Add new Book"
                        onPress={newItem}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        backgroundColor: styleConfig.bg,
        paddingHorizontal: 20,
        paddingVertical: 0,
    },

    textInputStyle: {
        flex: 1,
        height: 40,
        marginLeft: 10,
        borderRadius: 10,
        color: inputColor.color
        
    },

    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: inputColor.bg,

        height: 40,
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 8,

        borderColor: '#808082',
        borderWidth: 1,
    },

    

    buttonStyleContainer: {
        marginVertical: 16,
        
    },

    buttonStyle: {
        color: styleConfig.color,

    },

    textStyle: {
        marginLeft: 16,
        color: styleConfig.color,
        marginTop: 20,
        fontSize: 16,
    },

    textTipStyle: {
        paddingTop: 6,
        marginLeft: 16,
        position: 'absolute',
        fontSize: 12,
        color: 'blue',
    },

});

