import React from 'react';
import { View, StyleSheet } from 'react-native';
import Image from 'react-native-image-progress';
import { styleConfig } from "../style";


const Layout = ({ layout, width, height }) => {

    const imageBoxStyle = (size = 1) => {
        if (size === 1) {
            return(
                {
                    width: width,
                    height: height,
                    borderWidth: 1,
                    borderColor: styleConfig.bg,
                }
            )
        } else if (size === 2) {
            return(
                {
                    width: width * 3,
                    height: height * 3,
                    borderWidth: 1,
                    borderColor: styleConfig.bg,
                }
            )
        }
    }

    const ImageBox = (uri, style = imageBoxStyle()) => (
        <View style={style}>
            <Image
                style={styles.imageStyle}
                source={uri}
            />
        </View>
    );


    return (
        <View>
            <View style={styles.row}>
                <View style={styles.column}>
                    {layout[0] && ImageBox(layout[0])}
                    {layout[3] && ImageBox(layout[3])}
                    {layout[5] && ImageBox(layout[5])}
                </View>
                {layout[1] && ImageBox(layout[1], imageBoxStyle(2))}
                <View style={styles.column}>
                    {layout[2] && ImageBox(layout[2])}
                    {layout[4] && ImageBox(layout[4])}
                    {layout[6] && ImageBox(layout[6])}
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },

    column: {
        flexDirection: "column",
    },

    imageStyle: {
        height: "100%",
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    }
})

export default Layout
