import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "expo-router";
import { IconButton, useTheme } from "react-native-paper";
const About = () => {
    const navigation = useNavigation();
    const theme = useTheme()
    
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View>
                    <IconButton onPress={() => navigation.goBack()} icon="arrow-left" />
                </View>
            )
        });
        return () => {};
    }, []);

    return (
        <View style={{ backgroundColor: theme.colors.background}} className="flex-1 items-center pt-5">
            <View className="justify-center items-center">
              <Image className="rounded-full w-20 h-20" source={require("../assets/icon.png")} />
              <Text style={{ color: theme.colors.title}} className="font-light text-[20px] mt-2">HQuotes</Text>
              <Text style={{ color: theme.colors.title}} className="font-light">Developer: <Text className="font-bold">Cybersmart</Text></Text>
            </View>
            <View className="absolute bottom-0 mb-20">
            <Text style={{ color: theme.colors.title}} className="font-light">Powered By: <Text className="font-bold font-[Popins]">NT Tech</Text></Text>
            </View>
        </View>
    );
};

export default About;
