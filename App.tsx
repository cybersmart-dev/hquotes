import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Appbar, PaperProvide, FAB } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const App = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView className="">
                <Appbar.Header>
                    <Appbar.BackAction />
                    <Appbar.Content title="My App" />
                    <Appbar.Action icon="dots-vertical" />
                </Appbar.Header>
                <FAB icon="pen" size="small" className="w-20" />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default App;
