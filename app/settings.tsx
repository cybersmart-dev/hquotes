import React, { useEffect, useState, useCallback } from "react";
import { View, ToastAndroid, Platform, useColorScheme } from "react-native";
import {
    useNavigation,
    useFocusEffect,
    useLocalSearchParams
} from "expo-router";
import {
    IconButton,
    useTheme,
    Button,
    Dialog,
    List,
    Switch,
    Text
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Settings = () => {
    const navigation = useNavigation();
    const [dialogVisible, setDialogVisible] = useState(false);
    const theme = useTheme();
    const { navType } = useLocalSearchParams();
    const colorScheme = useColorScheme();

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const handleClear = async () => {
        try {
            await AsyncStorage.clear();
            if (Platform.OS == "android") {
                setDialogVisible(false);
                ToastAndroid.show("Data clear successful", ToastAndroid.LONG);
            } else {
                alert("Data clear successful");
            }
        } catch (e) {
            alert(e);
        }
    };

    const clear = () => {};

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
        if (navType == "clear") {
            handleClear();
        }

        return () => {};
    }, []);
    const toast = (text: string) => {
        if (Platform.OS == "android") {
            ToastAndroid.show(text, ToastAndroid.LONG);
        } else {
            alert(text);
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (colorScheme == "dark") {
                setIsSwitchOn(true);
            } else {
                setIsSwitchOn(false);
            }
        }, [])
    );
    return (
        <View
            style={{ backgroundColor: theme.colors.background }}
            className="p-3 -mt-8 space-y-5 flex-1"
        >
            <List.Section>
                <List.Subheader>General</List.Subheader>
                <List.Item
                    onPress={() => setDialogVisible(true)}
                    title="Clear Data"
                    description="clear all app data"
                    left={() => <List.Icon icon="delete" />}
                />
                <List.Item
                    title="Dark Mode"
                    onPress={onToggleSwitch}
                    left={() => <List.Icon icon="theme-light-dark" />}
                    right={() => (
                        <Switch
                            onValueChange={onToggleSwitch}
                            value={isSwitchOn}
                        />
                    )}
                />
                <List.Subheader>More</List.Subheader>
                <List.Item
                    onPress={() => toast("You are using updated version")}
                    title="Version"
                    description="1.0.1"
                    left={() => <List.Icon icon="android" />}
                    right={() => <List.Icon icon="update" />}
                />
            </List.Section>

            <Dialog visible={dialogVisible}>
                <Dialog.Title>Clear Data</Dialog.Title>
                <Dialog.Content>
                    <Text>
                        Are you sure do you want to clear app data
                    </Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => setDialogVisible(false)}>No</Button>
                    <Button onPress={() => handleClear()}>Yes</Button>
                </Dialog.Actions>
            </Dialog>
        </View>
    );
};

export default Settings;
