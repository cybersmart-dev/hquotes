import React, { useEffect, useState, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    ImageBackground,
    ImageSourcePropType,
    Image,
    BackHandler,
    Alert,
    Dimensions
} from "react-native";

import { useFocusEffect, useRoute } from "@react-navigation/native";
import { IconButton, Button, useTheme } from "react-native-paper";
import { useNavigation } from "expo-router";
import { Categories } from "../Utils/Quets";
import { StatusBar } from "expo-status-bar";

const {width, height} = Dimensions.get("screen")

interface CategoryCompProps {
    title: String;
    quotes: [];
    onPress?: () => void;
    image?: ImageSourcePropType;
}
const CategoryComp: React.FC<CategoryCompProps> = ({
    title,
    quotes,
    onPress,
    image
}) => {
    const theme = useTheme();
    return (
        <TouchableOpacity
            onPress={onPress}
            className="w-[50%] px-2 mt-2 p-3 h-auto"
        >
            <View
                style={{ backgroundColor: theme.colors.primaryContainer }}
                className=" bg-purple-300  h-40 w-fit p-1"
            >
                <ImageBackground
                    resizeMode="stretch"
                    style={{ borderColor: theme.colors.background,}}
                    className="h-40 w-fit rounded-[12px] border border-2 rounded px-5 items-center"
                    source={image}
                >
                    <View className="h-auto absolute bottom-0 mb-3 py-1 w-full rounded-full bg-transparent border border-white rounded bg-center bg-no-repeat">
                        <Text className="text-white text-center text-white">
                            {title}
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
};
const Index = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const theme = useTheme();
    const [currentTab, setCurrentTab] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [tabCategories, setTabCategories] = useState(Categories);

    const handleRefresh = () => {
        let count = 0;
        setRefreshing(true);
        setInterval(() => {
            if (count >= 5) {
                setRefreshing(false);
            } else {
                count++;
            }
        }, 1000);
    };
    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", () => {
                if (navigation.canGoBack()) {
                    navigation.goBack();
                } else {
                    Alert.alert(
                        "Exit App",
                        "Are you sure do you want to exit",
                        [
                            { text: "No", onPress: () => null },
                            {
                                text: "Yes",
                                onPress: () => BackHandler.exitApp()
                            }
                        ]
                    );
                }
                return true;
            });
        }, [])
    );

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View className="flex-row">
                    <IconButton
                        onPress={() => [navigation.navigate("settings")]}
                        icon="cog"
                    />
                </View>
            )
        });

        return () => {};
    }, []);
    return (
        <View style={{backgroundColor:theme.colors.background}} className="flex-1">
        
        <View style={{backgroundColor:theme.colors.background}} className="flex-row justify-around w-screen space-x-3 px-5 bg-white shadow shadow-black h-min">
                <View
                    style={{
                        borderColor:
                            currentTab == 1
                                ? theme.colors.primary
                                : "transparent"
                    }}
                    className="border-4 w-2/4 border-t-0 border-r-0 border-l-0"
                >
                    <Button
                        className="uppercase rounded-none "
                        onPress={() => [
                            setCurrentTab(1),
                            setTabCategories(Categories)
                        ]}
                    >
                        OFFLINE
                    </Button>
                </View>

                <View
                    style={{
                        borderColor:
                            currentTab == 2
                                ? theme.colors.primary
                                : "transparent"
                    }}
                    className="border-4 w-2/4 border-t-0 border-r-0 border-l-0"
                >
                    <Button
                        className="uppercase rounded-none "
                        onPress={() => [setCurrentTab(2), setTabCategories([])]}
                    >
                        ONLINE
                    </Button>
                </View>
            </View>
            <RefreshControl
                refreshing={refreshing}
                onRefresh={() => handleRefresh()}
            >
                <View className="mb-5">
                    <FlatList
                        data={tabCategories}
                        className="mb-5"
                        renderItem={({ item }) => (
                            <CategoryComp
                                image={item.image}
                                quotes={item.quotes}
                                onPress={() =>
                                    navigation.navigate({
                                        name: "view/[id]",
                                        params: { id: item.id }
                                    })
                                }
                                title={item.title.toUpperCase()}
                            />
                        )}
                        ListEmptyComponent={() => (
                            <View className="items-center  justify-center h-[80vh]">
                                <IconButton
                                    size={80}
                                    
                                    icon="connection"
                                />
                                <Text style={{color:theme.colors.title}} className="text-[20px] mb-1 font-light">
                                    Oops!
                                </Text>
                                <Text style={{color:theme.colors.title}} className="text-[13px] mb-3 font-light">
                                    Server Connection Fail
                                </Text>

                                <Button
                                    mode="contained-tonal"
                                    onPress={() => setTabCategories([])}
                                    icon={"sync"}
                                >
                                    Retry
                                </Button>
                               
                            </View>
                        )}
                        numColumns={2}
                        keyExtractor={item => item.id}
                    />
                </View>
            </RefreshControl>
            
            <StatusBar backgroundColor="white" style="dark" />
        </View>
    );
};

export default Index;
