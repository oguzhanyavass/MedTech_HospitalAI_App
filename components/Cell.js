import React from "react";
import { View,Text,StyleSheet,TouchableOpacity } from "react-native";
import {Ionicons} from '@expo/vector-icons';
import { AppColors } from "../config/constans";
import { Card } from "react-native-paper";

const Cell = ({tittle,icon,endIcon,iconColor,onPress,style}) =>{
return(
    <TouchableOpacity style={[styles.cell, style]} onPress={onPress}>
                <Card mode="contained" style={[styles.iconContainer, {backgroundColor: iconColor}] }>
                <Ionicons 
                    name={icon}
                    size={26} 
                    color='white'/>
                </Card>
                <Text style={styles.tittle}>{tittle}</Text>
                <Ionicons 
                name={endIcon}
                size ={20}/>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cell:{
        paddingHorizontal:16,
        paddingVertical: 12,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        bordorColor: AppColors.border
    },
    tittle:{
        fontSize:16,
        marginStart:10,
        flex:1,
    },
    iconContainer:{
        width: 32,
        height:32,
        backgroundColor:AppColors.purple,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Cell;