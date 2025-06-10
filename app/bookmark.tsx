import QuoteComp from "../Components/QuoteComp";
import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ToastAndroid,
    BackHandler,
    Alert,
    Platform
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Categories } from "../Utils/Quets";
import { useNavigation } from "expo-router";
import { IconButton, Button, useTheme } from "react-native-paper";

const Bookmark = () => {
    const navigation = useNavigation();
    const [refresh, setRefresh] = useState(1)
    const [data, setData] = useState([]);
    const [sData, setSData] = useState([]);
    const theme = useTheme()
    const recreate = () => {
        setRefresh(prev => prev + 1);
    };
    const renderData = (): void => {
        const qu = [];
        sData.forEach(data => {
            const id = Number(data.id).valueOf();
            Categories.forEach(item => {
                if (item.id == id) {
                    item.quotes.forEach(q => {
                        if (q.id == data.qid) {
                            q["cid"] = id;
                            qu.push(q);
                        }
                    });
                }
            });
        });
        setData(qu);
    };
    const loadData = async (): Promise<void> => {
        try {
            const asData = await AsyncStorage.getItem("book");
            const mdata: [] = JSON.parse(asData);
            //console.log(mdata);
            if (mdata == null) {
                setSData([]);
                renderData();
                return;
            }
            setSData(mdata);
            renderData();
        } catch (e) {
            alert(e);
        }
    };
    useFocusEffect(
        useCallback(() => {
            loadData();
            BackHandler.addEventListener("hardwareBackPress", () => {
                if (navigation.canGoBack()) {
                    navigation.goBack();
                } else {
                    navigation.navigate("index");
                }
                return true;
            });
        }, [data])
    );
    const remove = async () => {};
    const handleLongPress = (cid: Number, qid: Number) => {
        const ndata = []
        Alert.alert(
            "Remove from bookmark",
            `Do you want to remove this quote from bookmark?`,
            [
                { text: "No" },
                {
                    text: `Yes`,
                    onPress: async () => {
                        sData.forEach(item => {
                            if (item.id == cid && item.qid == qid) {
                                return
                            }
                            ndata.push(item);
                        });
                        await AsyncStorage.setItem(
                            "book",
                            JSON.stringify(ndata)
                        );
                        recreate();
                        // scrollTo(qid - 1);
                        if (Platform.OS == "android") {
                            ToastAndroid.show(
                                "Removed from bookmark",
                                ToastAndroid.LONG
                            );
                            return;
                        }
                        Alert.alert("Removed", "removed from bookmark");
                    }
                }
            ]
        );
    };
    const handlePress = (id: number, qid: number): void => {
        navigation.navigate({
            name: "view/[id]",
            params: { id: id, qid: qid }
        });
        //console.debug(id, qid);
    };
    return (
        <View style={{ backgroundColor: theme.colors.background}} key={refresh} className="mb-5 flex-1" >
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <QuoteComp
                        onLongPress={() => handleLongPress(item.cid, item.id)}
                        onContainerPress={() => handlePress(item.cid, item.id)}
                        showActions={false}
                        onCopyPress={() => null}
                        author={item.author}
                        qoute={item.quote}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View className="items-center h-[75vh] justify-center">
                        <IconButton
                            
                            size={80}
                            icon={"book-cancel"}
                        />
                        <Text style={{color:theme.colors.title}} className="text-[20px] font-light">
                            Empty Bookmark
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Bookmark;
