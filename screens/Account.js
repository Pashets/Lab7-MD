import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { styleConfig } from "../style";

export default function Account() {
    
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>
                Дровнін Павло Андрійович{"\n"}
                Група ІВ-83
                {"\n"}ЗК ІВ-8309
            </Text>
        </View>
    );
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
    }
})
