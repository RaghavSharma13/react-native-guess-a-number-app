import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../constants/Colors'

const StyledButton = ({title, onPress, style}) => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
            <View style={{...style, ...styles.button}}>
                <Text style={styles.btnText}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    btnText:{
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    }
})

export default StyledButton
