import React, { useEffect,useState } from "react";
import { View, Text, ToastAndroid, Platform } from "react-native";
import { useNavigation } from "expo-router";
import { IconButton, useTheme, Button, Dialog, List, PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Settings = () => {
    const navigation = useNavigation();
    const [dialogVisible, setDialogVisible] = useState(false)
    const theme = useTheme()
    
    const handleClear = async () => {
        try {
            await AsyncStorage.clear()
            if (Platform.OS == "android"){
              setDialogVisible(false)
              ToastAndroid.show("Data clear successful", ToastAndroid.LONG)
            }else{
              alert("Data clear successful")
            }
        } catch (e) {
            alert(e);
        }
    };
    
    const clear = () => {
      
    }
    
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View>
                    <IconButton
                        
                        onPress={() => navigation.goBack()}
                        icon="arrow-left"
                    />
                </View>
            )
        });
        return () => {};
    }, []);
    const toast = (text:string) => {
      if(Platform.OS == "android"){
        ToastAndroid.show(text, ToastAndroid.LONG)
      }else{
        alert(text)
      }
    }
    return (
        <View style={{ backgroundColor: theme.colors.background,}} className="p-3 space-y-5 flex-1">
            <List.Section>
                <List.Subheader>General</List.Subheader>
                <List.Item
                    onPress={() => setDialogVisible(true)}
                    title="Clear Data"
                    description="clear all app data"
                    left={() => <List.Icon icon="delete" />}
                />
                <List.Subheader>More</List.Subheader>
                <List.Item
                    onPress={() => toast("You are using updated version")}
                    title="Version"
                    description="1.0.0"
                    left={() => <List.Icon icon="android" />}
                    right={() => <List.Icon icon="update" />}
                />
            </List.Section>
            
            <Dialog visible={dialogVisible}>
              <Dialog.Title>Clear Data</Dialog.Title>
              <Dialog.Content><Text style={{color:theme.colors.title}}>Are you sure do you want to clear app data</Text></Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setDialogVisible(false)}>No</Button>
                <Button onPress={() => handleClear()}>Yes</Button>
              </Dialog.Actions>
            </Dialog>
            
        </View>
    );
};

export default Settings;
