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
    Platform,
    Dimensions,
    Pressable
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Categories } from "../Utils/Quets";
import { useNavigation } from "expo-router";
import { IconButton, Button, useTheme, Menu } from "react-native-paper";
const { width, height } = Dimensions.get("screen");
const Bookmark = () => {
    const navigation = useNavigation();
    const [refresh, setRefresh] = useState(1);
    const [data, setData] = useState([]);
    const [sData, setSData] = useState([]);
    const theme = useTheme();
    const [visibleId, setVisibleId] = useState(0);

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
                setVisibleId(0);
                return true;
            });
            navigation.setOptions({
                headerTitle: "BookMark",
                headerRight: () => (
                    <View>
                        <IconButton
                            onPress={() =>
                                navigation.navigate("settings", {
                                    params: { navType: "clear" }
                                })
                            }
                            icon="delete"
                        />
                    </View>
                )
            });
        }, [data])
    );
    const remove = async () => {};
    const handleLongPress = (cid: Number, qid: number) => {
        const ndata = [];
        setVisibleId(qid);
        /**
         **/
    };
    const view = (id: number, qid: number): void => {
        navigation.navigate({
            name: "view/[id]",
            params: { id: id, qid: qid }
        });
        //console.debug(id, qid);
    };
    const toast = (message: string) => {
        ToastAndroid.show(message, ToastAndroid.LONG);
    };
    const menuItemPress = (itemType: string, data: object) => {
        if (itemType == "share") {
            toast(data?.message);
        }
        if (itemType == "view") {
            view(data.id, data.qid);
        }
        if (itemType == "copy") {
            toast("Copied");
        }
        if (itemType == "delete") {
            const cid = data?.id;
            const qid = data?.qid;
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
                                    return;
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
        }
        setVisibleId(0);
    };
    return (
        <Pressable
            style={[
                { backgroundColor: theme.colors.background },
                styles.container
            ]}
            key={refresh}
            onPress={() => alert()}
        >
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Menu
                        onDismiss={() => null}
                        visible={visibleId == item.id ? true : false}
                        anchor={
                            <QuoteComp
                                onLongPress={() =>
                                    handleLongPress(item.cid, item.id)
                                }
                                onContainerPress={() => setVisibleId(item.id)}
                                showActions={false}
                                author={item.author}
                                qoute={item.quote}
                            />
                        }
                    >
                        <Menu.Item
                            leadingIcon={"share-variant"}
                            title="Share"
                            onPress={() =>
                                menuItemPress("share", { message: item.quote })
                            }
                        />
                        <Menu.Item
                            onPress={() =>
                                menuItemPress("view", {
                                    id: item.cid,
                                    qid: item.id
                                })
                            }
                            leadingIcon={"eye"}
                            title="View"
                        />
                        <Menu.Item
                            onPress={() =>
                                menuItemPress("copy", { content: item.quote })
                            }
                            leadingIcon={"content-copy"}
                            title="copy"
                        />

                        <Menu.Item
                            onPress={() =>
                                menuItemPress("delete", {
                                    id: item.cid,
                                    qid: item.id
                                })
                            }
                            leadingIcon={"book-cancel"}
                            title="Remove"
                            trailingIcon={"close"}
                            disabled={true}
                        />
                    </Menu>
                )}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <IconButton size={80} icon={"book-cancel"} />
                        <Text
                            style={[
                                { color: theme.colors.title },
                                styles.emptyText
                            ]}
                        >
                            Empty Bookmark
                        </Text>
                    </View>
                )}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
        height: "100%"
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: height / 1.5
    },
    emptyText: {
        fontSize: 20,
        fontWeight: "300"
    }
});

export default Bookmark;
