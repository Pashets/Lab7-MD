import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import SwitchSelector from 'react-native-switch-selector';
import { VictoryPie } from "victory-native";

import { styleConfig } from "../style";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function Diagram() {

    const [toggle, setToggle] = useState(true)
    const [dimensions, setDimensions] = useState({ window, screen });
    

    const onChange = ({ window, screen }) => {
        setDimensions({ window, screen });
    };

    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange);
        };
    });

    const orientation = () => {
        const dim = Dimensions.get('screen');
        if (dim.height >= dim.width) {
            return portrait
        } else {
            return landscape
        }
    }

    function ChartShow() {
        if (toggle) {
            return (
                <View>
                    <LineChart
                        data={{ fromZero: true,
                                datasets: 
                                [
                                    {strokeWidth: 2, color: (opacity = 1) => `rgba(1, 1, 1, ${opacity})`,
                                        data: [
                                            Math.sin(-3, 3), Math.sin(-2.9, 3), Math.sin(-2.8, 3), Math.sin(-2.7, 3), Math.sin(-2.6, 3), Math.sin(-2.5, 3), Math.sin(-2.4, 3), Math.sin(-2.3, 3), Math.sin(-2.2, 3), Math.sin(-2.1, 3),
                                            Math.sin(-2, 3), Math.sin(-1.9, 3), Math.sin(-1.8, 3), Math.sin(-1.7, 3), Math.sin(-1.6, 3), Math.sin(-1.5, 3), Math.sin(-1.4, 3), Math.sin(-1.3, 3), Math.sin(-1.2, 3), Math.sin(-1.1, 3),
                                            Math.sin(-1, 3), Math.sin(-0.9, 3), Math.sin(-0.8, 3), Math.sin(-0.7, 3), Math.sin(-0.6, 3), Math.sin(-0.5, 3), Math.sin(-0.4, 3), Math.sin(-0.3, 3), Math.sin(-0.2, 3), Math.sin(-0.1, 3),
                                            Math.sin(0, 3), Math.sin(0.1, 3), Math.sin(0.2, 3), Math.sin(0.3, 3), Math.sin(0.4, 3), Math.sin(0.5, 3), Math.sin(0.6, 3), Math.sin(0.7, 3), Math.sin(0.8, 3), Math.sin(0.9, 3),
                                            Math.sin(1, 3), Math.sin(1.1, 3), Math.sin(1.2, 3), Math.sin(1.3, 3), Math.sin(1.4, 3), Math.sin(1.5, 3), Math.sin(1.6, 3), Math.sin(1.7, 3), Math.sin(1.8, 3), Math.sin(1.9, 3),
                                            Math.sin(2, 3), Math.sin(2.1, 3), Math.sin(2.2, 3), Math.sin(2.3, 3), Math.sin(2.4, 3), Math.sin(2.5, 3), Math.sin(2.6, 3), Math.sin(2.7, 3), Math.sin(2.8, 3), Math.sin(2.9, 3), Math.sin(3, 3),
                                        ],
                                }
                                ]
                            }}
                        width={dimensions.window.width - 10}
                        chartConfig={{
                                backgroundGradientFrom: styleConfig.bg,
                                backgroundGradientTo: styleConfig.bg,
                                color: (opacity = 1) => `rgba(1, 1, 1, ${opacity})`,

                                propsForDots: {
                                    r: "1",
                                    strokeWidth: "2",
                                }
                            }}
                        height={240}
                        zIndex={1}
                        style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}
                    />
                </View>
            )
        } else {
            return (
                <View >
                    <VictoryPie
                        width={dimensions.window.width -15 } height={dimensions.window.height * 0.7}
                        innerRadius={({ datum }) =>  dimensions.window.height * 0.1}
                        colorScale={["#996633", "#00FFFF", "orange", "blue" ]}
                        data={[
                            { x: " ", y: 5 },
                            { x: " ", y: 5 },
                            { x: " ", y: 10 },
                            { x: " ", y: 80 },
                        ]}
                    />
                </View >
            )
        }
    }

    return (
        <View style={styles.screen}>
            <View style={styles.toggle}>
                <SwitchSelector
                    options={[
                        { label: 'Графік', value: true },
                        { label: 'Діаграма', value: false },
                    ]}
                    initial={0}
                    textColor={"#999"}
                    selectedColor={styleConfig.color}
                    buttonColor={styleConfig.bg}
                    backgroundColor={styleConfig.toggleBg}
                    borderColor={"#000"}
                    borderRadius={10}
                    onPress={value => setToggle(value)}
                    style={{ paddingTop: 10 }}
                    buttonMargin={1}
                />
            </View>

            <View style={styles.container}>
                <ChartShow isSwitched={toggle} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: styleConfig.bg
    },

    container: {
        flex: 10,
        alignItems: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: styleConfig.bg,
        
    },

    toggle: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },

    image: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1, 
        position: 'absolute',
    },

    
    chart: {
        flex: 1
    }
});