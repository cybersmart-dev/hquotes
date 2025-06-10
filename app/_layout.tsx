import PaperDrawer from "../Components/PaperDrawer";
import { Drawer } from "expo-router/drawer";
import React, { useCallback } from "react";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { PaperProvider, useTheme } from "react-native-paper";
import {
    SafeAreaProvider,
    MD3LightTheme,
    MD3DarkTheme
} from "react-native-safe-area-context";
import { LightScheme, DarkScheme } from "../Themes/ThemeSchemes";
import { useColorScheme, View } from "react-native";

const LightTheme = {
    ...MD3LightTheme,
    colors: LightScheme
};
const DarkTheme = {
    ...MD3DarkTheme,
    colors: DarkScheme
};

export default function Layout() {
    const colorScheme = useColorScheme();
    const theme = colorScheme == "dark" ? DarkTheme : LightTheme;
    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme}>
                <Drawer
                    screenOptions={{
                        headerShown: true,
                        headerTintColor:
                            colorScheme == "dark" ? "white" : "#000",
                        headerBackground: () => (
                            <View
                                style={{
                                    backgroundColor:
                                        colorScheme == "dark"
                                            ? "rgb(29, 27, 30)"
                                            : "white"
                                }}
                                className="w-fit h-full"
                            ></View>
                        )
                    }}
                    drawerContent={props => <PaperDrawer {...props} />}
                >
                    <Drawer.Screen
                        name="index"
                        options={{
                            headerTitle: "HQuotes".toUpperCase(),
                            headerShadowVisible: false
                        }}
                    />
                    <Drawer.Screen
                        name="bookmark"
                        options={{ headerTitle: "Bookmark".toUpperCase() }}
                    />
                    <Drawer.Screen
                        name="settings"
                        options={{
                            headerTitle: "Settings".toUpperCase(),
                            headerShown: true,
                            swipeEnabled: false
                        }}
                    />
                    <Drawer.Screen
                        name="about"
                        options={{
                            headerTitle: "About Us".toUpperCase(),
                            headerShown: true,
                            swipeEnabled: false
                        }}
                    />
                    <Drawer.Screen
                        name="privacy"
                        options={{
                            headerTitle: "privacy Policy".toUpperCase(),
                            headerShown: true,
                            swipeEnabled: false
                        }}
                    />
                    <Drawer.Screen
                        name="view/[id]"
                        options={{
                            headerTitle: "View".toUpperCase(),
                            headerShown: true,
                            swipeEnabled: false
                        }}
                    />
                </Drawer>
            </PaperProvider>
        </SafeAreaProvider>
    );
}
