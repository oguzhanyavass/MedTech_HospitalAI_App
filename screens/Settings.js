import React, {useEffect,useState,useContext} from "react";
import { View, Text,StyleSheet,TouchableOpacity,ScrollView} from "react-native";
import { AppColors } from "../config/constans";
import { Avatar,List, RadioButton ,Switch,Card, Drawer, Divider} from "react-native-paper";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import {Ionicons} from '@expo/vector-icons';
import { colors } from "../config/theme";

const Settings = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isActive, setIsActive] = useState(true);
    const theme = isActive ? "dark" : "light"; // switch'in değerine göre tema belirle
    let activeColors = colors[theme]; // tema renklerini al
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setName(user?.displayName ?? "");
            setEmail(user?.email ?? "");
        });
    }, []);

    return (
        <ScrollView  style={{backgroundColor: activeColors.primary,flex: 1,}}>
            <View style={{ alignItems: "center", marginTop: 16,marginBottom:16,}}>
                <Avatar.Text 
                label= {name.split(' ').reduce((prev, current) => prev+current[0],'')} />
                <Text style={{color:activeColors.tint, fontWeight:"bold",fontSize:24,}}>{name}</Text>
                <Text style={{color:activeColors.text, }}>{email}</Text>
            </View>

            <TouchableOpacity style={[styles.cell,{backgroundColor: activeColors.tertiary,marginHorizontal:8}]}   
                onPress= {() => {
                getAuth().signOut()}}>
                <Card mode="contained" style={[styles.iconContainer, {backgroundColor: AppColors.red}] }>
                <Ionicons 
                    name="log-out-outline"
                    size={26} 
                    color='white'/>
                </Card>
                <Text style={[styles.tittle,{color:activeColors.tint}]}>Logout</Text>
                <Ionicons 
                name="chevron-forward-outline"
                size ={20}/>
            </TouchableOpacity>


            <TouchableOpacity style={[styles.cell,{backgroundColor:activeColors.tertiary,marginHorizontal:8,marginTop:18}]}
                onPress= {() => {
                    alert("Ne yardım lazım knkam")
                }}>
                <Card mode="contained" style={[styles.iconContainer, {backgroundColor: AppColors.lightTurquoise}] }>
                <Ionicons 
                    name="help-circle-outline"
                    size={26} 
                    color='white'/>
                </Card>
                <Text style={[styles.tittle,{color:activeColors.tint}]}>Help</Text>
                <Ionicons 
                name="chevron-forward-outline"
                size ={20}/>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.cell,{backgroundColor: activeColors.tertiary,marginHorizontal:8}]}     
                onPress= {() => {
                    alert("Çok yakında mağaza linkimizi koyacağım")
                }}>
                <Card mode="contained" style={[styles.iconContainer, {backgroundColor: AppColors.pink}] }>
                <Ionicons 
                    name="happy-outline"
                    size={26} 
                    color='white'/>
                </Card>
                <Text style={[styles.tittle,{color:activeColors.tint}]}>Tell a Friend</Text>
                <Ionicons 
                name="chevron-forward-outline"
                size ={20}/>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.cell,{backgroundColor: activeColors.tertiary,marginHorizontal:8,marginTop:18}]}     
                onPress= {() => {
                    alert("Chat Ayarları burada olacak")
                }}>
                <Card mode="contained" style={[styles.iconContainer, {backgroundColor: AppColors.yellow}] }>
                <Ionicons 
                    name="chatbubble-ellipses-outline"
                    size={26} 
                    color='white'/>
                </Card>
                <Text style={[styles.tittle,{color:activeColors.tint}]}>Chats</Text>
                <Ionicons 
                name="chevron-forward-outline"
                size ={20}/>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.cell,{backgroundColor: activeColors.tertiary,marginHorizontal:8}]}     
                onPress= {() => {}}>
                <Card mode="contained" style={[styles.iconContainer, {backgroundColor: AppColors.darkTurquoise}] }>
                <Ionicons 
                    name="heart-half-outline"
                    size={26} 
                    color='white'/>
                </Card>
                <Text style={[styles.tittle,{color:activeColors.tint}]}>Change Theme</Text>
                <Switch
                /> 
            </TouchableOpacity>
            
            <List.Section>
                <List.Subheader 
                style={{ color: activeColors.tint , fontSize:16}} 
                >Theme Settings
                </List.Subheader>
                <Divider inset/>
                <List.Item 
                style={[styles.miniCell,{backgroundColor: activeColors.tertiary,marginHorizontal:8}]}
                title="Light"  
                titleStyle={{ color: activeColors.tint }}
                left={() => <Ionicons 
                name="sunny-outline"
                size={26} 
                color='white'/>} 
                onPress= {() => {}}
                right={() => <RadioButton  style ={{color:activeColors.tint}}></RadioButton>}/>
                <List.Item 
                style={[styles.miniCell,{backgroundColor: activeColors.tertiary,marginHorizontal:8}]}
                title="Dark"  
                titleStyle={{ color: activeColors.tint }}
                left={() => <Ionicons 
                name="moon-outline"
                size={26} 
                color='white'/>} 
                onPress= {() => {}}
                right={() => <RadioButton  style ={{color:activeColors.tint}}></RadioButton>}/>
                <List.Item 
                style={[styles.miniCell,{backgroundColor: activeColors.tertiary,marginHorizontal:8}]}
                title="System"  
                titleStyle={{ color: activeColors.tint }}
                left={() => <Ionicons 
                name="color-filter-outline"
                size={26} 
                color='white'/>} 
                onPress= {() => {}}
                right={() => <RadioButton  style ={{color:activeColors.tint}}></RadioButton>}/>
            </List.Section> 
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    
    cell:{
        paddingHorizontal:26,
        paddingVertical: 8,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderRadius:36,
    },
    miniCell:{
        paddingHorizontal:26,
        paddingVertical: 1,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderRadius:36,
        marginLeft:16,
        marginRight:16,
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
});

export default Settings;  