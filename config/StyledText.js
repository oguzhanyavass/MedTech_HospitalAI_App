import { Text } from "react-native-paper";
import { themes } from "./Colors";
import React from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

const StyledText = ({children, style,small,big,bold, ...props}) =>{


    const {theme} = useContext(ThemeContext);
    let activeColors = colors[theme.mode];
    return(
        <Text
            style={[
                { 
                color:activeColors.tint,
                fontSize: small ? 14: big? 24 : 16,
                fontWeight: bold || big? "bold":"normal",
                },
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};

export default StyledText;