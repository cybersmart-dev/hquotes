import { Drawer, Divider, useTheme, Text } from "react-native-paper";
import { useNavigation } from "expo-router";
import { View, ImageBackground } from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import React, { useState } from "react";
function PaperDrawer(props: DrawerContentComponentProps) {
    const { navigation } = props;
    const [tab, setTab] = useState("h");
    const theme = useTheme();

    return (
        <Drawer.Section
            showDivider={false}
            theme={theme}
            style={{ backgroundColor: theme.colors.background, flex: 1 }}
        >
            <ImageBackground
                blurRadius={10}
                resizeMode="stretch"
                source={require("../assets/icon.png")}
                className="p-14 mb-5 items-center justify-center font-bold bg-amber-700"
            >
                <Text className="text-white text-2xl font-bold">HQuotes</Text>
                <Text className="text-white">Hausa Quotes</Text>
            </ImageBackground>

            <Drawer.Item
                icon="home-outline"
                onPress={() => [navigation.navigate("index"), setTab("h")]}
                active={tab == "h" ? true : false}
                label="Home"
            />
            <Drawer.Item
                onPress={() => [navigation.navigate("bookmark"), setTab("b")]}
                icon="book-check-outline"
                active={tab == "b" ? true : false}
                label="Bookmarks"
            />
            <Drawer.Item
                onPress={() => [navigation.navigate("settings"), setTab("h")]}
                icon="cog-outline"
                active={false}
                label="Settings"
            />
            <View className="px-4  w-fit">
                <Divider /> 
                <Text className="opacity-50 ml-2 mt-1">More</Text>
            </View>

            <Drawer.Item
                onPress={() => [navigation.navigate("about"), setTab("h")]}
                icon="information-outline"
                active={false}
                label="About Us"
            />
            <Drawer.Item
                onPress={() => [navigation.navigate("privacy"), setTab("h")]}
                icon="lock-outline"
                active={false}
                label="Privacy"
            />
        </Drawer.Section>
    );
}

export default PaperDrawer;
