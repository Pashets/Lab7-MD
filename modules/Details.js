import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text, StyleSheet, SafeAreaView, ScrollView, Image, ActivityIndicator } from 'react-native';
import { styleConfig } from "../style";

import { addBookInfo } from "../redux/actions";
import { useSelector, useDispatch } from 'react-redux';

import * as Network from 'expo-network';


const window = Dimensions.get("window");
const screen = Dimensions.get("screen");



export default function Details({ route }) {

    const { bookInfoData } = useSelector(state => state.bookReducer);
    const dispatch = useDispatch();

    const addToStorage = books => dispatch(addBookInfo(books));

    const handleAddBookInfo = books => {
        addToStorage(books);
    };


    const { id } = route.params;
    const [dimensions, setDimensions] = useState({ window, screen });
    const [isLoading, setLoading] = useState(true);

    const onChange = ({ window, screen }) => {
        setDimensions({ window, screen });
    };

    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange);
        };
    });

    const getUniqueInfoList = (arr, key) => {
            return [...new Map(arr.map(item => [item[key], item])).values()]
        }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetch(`https://api.itbook.store/1.0/books/${id}`)
                    .then((response) => response.json())
                    .then( (data) => {
                                const filteredBookInfo =
                                    getUniqueInfoList(
                                        [data, ...bookInfoData],
                                        'isbn13'
                                    )
                                handleAddBookInfo(filteredBookInfo)
                            }
                    )
                    .finally(() => setLoading(false));
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
        
    }, []);
    
    const orientation = () => {
        const dim = Dimensions.get('screen');
        if (dim.height >= dim.width) {
            return styles
        } else {
            return landscape
        }
    }

    let check = []

    return (
        <SafeAreaView>
            <ScrollView style={{ backgroundColor: styleConfig.bg }}>
                {
                    bookInfoData.map((item, i) => {
                        if ( isLoading ) {
                            return (
                                <View key={item.isbn13} style={orientation().loading}><ActivityIndicator size='large' /></View>
                            )
                        } else if (id === item.isbn13) {
                            check.push('')
                            return (
                                <View style={orientation().infoScreen} key={item.isbn13}>
                                    <View style={orientation().infoImageSection}>
                                        <Image
                                            style={orientation().infoImage}
                                            source={ item.image === 'N/A' ? require('../assets/posters/no-poster.jpg') : { uri: item.image } }
                                        />
                                    </View>
                                    <View style={orientation().infoScreenTextView}>
                                        <Text style={orientation().baseText}>
                                            Title:
                                    <Text style={orientation().innerText}> {item.title}</Text>
                                        </Text>
                                        <Text style={orientation().baseText}>
                                            Subtitle:
                                    <Text style={orientation().innerText}> {item.subtitle}</Text>
                                        </Text>
                                        <Text style={orientation().baseText}>
                                            Description:
                                    <Text style={orientation().innerText}> {item.desc}{'\n'}</Text>
                                        </Text>
                                        <Text style={orientation().baseText}>
                                            Authors:
                                    <Text style={orientation().innerText}> {item.authors}</Text>
                                        </Text>
                                        <Text style={orientation().baseText}>
                                            Publisher:
                                    <Text style={orientation().innerText}> {item.publisher}{'\n'}</Text>
                                        </Text>
                                        <Text style={orientation().baseText}>
                                            Pages:
                                    <Text style={orientation().innerText}> {item.pages}</Text>
                                        </Text>
                                        <Text style={orientation().baseText}>
                                            Year:
                                    <Text style={orientation().innerText}> {item.year}</Text>
                                        </Text>
                                        <Text style={orientation().baseText}>
                                            Rating:
                                    <Text style={orientation().innerText}> {item.rating}</Text>
                                        </Text>


                                    </View>
                                </View>
                            )
                        }
                    })
                }
                
            </ScrollView>
            {
                check.length === 0 ?
                <View style={{backgroundColor: styleConfig.bg, justifyContent: 'center', alignItems: 'center', }}>
                    <Text>No Data In Database</Text>
                </View> : null
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        backgroundColor: styleConfig.bg,
    },
    
     textStyle: {
        textAlign: 'center', 
        color: styleConfig.color,
        fontSize: 20,
    },

    baseText: {
        color: styleConfig.color,
        fontWeight: '600',
        fontSize: 20,
        marginVertical: 2,
    },

    innerText: {
        color: styleConfig.color,
        fontWeight: '400',
        marginTop: 2,
        marginBottom: 8,
        fontSize: 18,
    },

    infoScreen: {
        paddingHorizontal: 13,
        paddingTop: 10,
        paddingBottom: 40,
        backgroundColor: styleConfig.bg
    },

    infoImageSection: {
        alignItems: 'center'
    },

    infoImage: {
        width: 180,
        height: 270,
    },
    infoScreenTextView: {
        marginTop: 30,
    },

    loading: {
        position: 'absolute',
        marginTop: 50,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: styleConfig.bg,
        color: styleConfig.color
    }


});


const landscape = StyleSheet.create({

    infoScreen: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 40,
        backgroundColor: styleConfig.bg,
        flex: 1,
        flexDirection: 'row',
    },

    infoImage: {
        width: 170,
        height: 300,
        borderWidth: 2,
        borderColor: styleConfig.color,
        marginTop: 6,
    },

    infoScreenTextView: {
        paddingLeft: 14,
        flexShrink: 1 
    },

    titleText: {
        color: styleConfig.color,
        fontWeight: '600',
        fontSize: 21,
        marginVertical: 1,
    },

    subText: {
        color: styleConfig.color,
        fontWeight: '400',
        fontSize: 19,
    },

    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: styleConfig.bg,
        color: styleConfig.color

    }
    

})