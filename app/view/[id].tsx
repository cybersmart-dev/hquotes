import QuoteComp from "../../Components/QuoteComp";

import React, {
    useEffect,
    useLayoutEffect,
    useState,
    useRef,
    useCallback
} from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ToastAndroid,
    Platform,
    ImageBackground,
    Share,
    Alert,
    BackHandler
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Categories } from "../../Utils/Quets";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
    IconButton,
    Dialog,
    PaperProvider,
    Button,
    TextInput,
    TextInputAffix,
    useTheme
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const q = () => {
    const theme = useTheme()
    const [refresh, setRefresh] = useState(0);
    const navigation = useNavigation();
    const { id, qid } = useLocalSearchParams();
    const flatListRef = useRef<FlatList>(null);
    const [userQuote, setUserQuote] = useState("");
    const [userAuthor, setUserAuthor] = useState("");
    const [userAddDialogVisible, setUserAddDialogVisible] = useState(false);
    const [bookmarkIcon, setBookmarkIcon] = useState("book");
    const category = Categories.find(item => item.id == id);
    const { quotes, title, image } = category;

    const clear = async () => {
        await AsyncStorage.clear();
    };
    //clear()
    const recreate = () => {
        setRefresh(prev => prev + 1);
    };
    const scrollTo = (index: number) => {
        setTimeout(() => {
            try {
                flatListRef.current?.scrollToIndex({
                    index: index,
                    animated: true
                });
            } catch (e) {
                Alert.alert("Error Occur", e.toString(), [
                    { text: "Report", onPress: () => null },
                    { text: "Ignore", onPress: () => null }
                ]);
            }
        }, 500); // delay ensures FlatList is rendered
    };
    const bookmarkRemoveAlert = (data: [], qid: number) => {
        const ndata = [];
        Alert.alert(
            "Remove from bookmark",
            `Do you want to remove this quote to bookmark?`,
            [
                { text: "No" },
                {
                    text: "Yes",
                    onPress: async () => {
                        data.forEach(item => {
                            if (item.id == id && item.qid == qid) {
                                return;
                            }
                            ndata.push(item);
                        });
                        await AsyncStorage.setItem(
                            "book",
                            JSON.stringify(ndata)
                        );
                        recreate();
                        scrollTo(qid - 1);
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
    const bookmarkAddAlert = (data: [], qid: number) => {
        Alert.alert(
            "Add to boookmark",
            `Do you want to add this quote to bookmark?`,
            [
                { text: "No" },
                {
                    text: "Yes",
                    onPress: async () => {
                        data.push({
                            id: id,
                            qid: qid
                        });
                        await AsyncStorage.setItem(
                            "book",
                            JSON.stringify(data)
                        );
                        recreate();
                        scrollTo(qid - 1);
                        if (Platform.OS == "android") {
                            ToastAndroid.show(
                                "Added to bookmark",
                                ToastAndroid.LONG
                            );
                            return;
                        }
                        Alert.alert("Added", " added to bookmark");
                    }
                }
            ]
        );
    };

    const addBookmark = async (qid: number) => {
        try {
            const sData = await AsyncStorage.getItem("book");
            const data: [] = JSON.parse(sData);

            if (data != undefined) {
                const isAdded = data.find(
                    item => item.id == id && item.qid == qid
                );
                if (isAdded) {
                    bookmarkRemoveAlert(data, qid);
                } else {
                    bookmarkAddAlert(data, qid);
                }
            } else {
                const new_data = [];
                bookmarkAddAlert(new_data, qid);
            }
        } catch (e) {
            alert(e);
        }
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: title.toUpperCase(),
            headerLeft: () => (
                <View>
                    <IconButton
                        
                        onPress={() =>
                            qid
                                ? navigation.navigate("bookmark")
                                : navigation.goBack()
                        }
                        icon="arrow-left"
                    />
                </View>
            ),
            headerRight: () => (
                <View className="flex-row">
                    <IconButton
                        
                        onPress={() => setUserAddDialogVisible(true)}
                        icon={"plus"}
                    />
                    <IconButton
                        
                        onPress={() => navigation.navigate("bookmark")}
                        icon={"book-check-outline"}
                    />
                </View>
            )
        });
        return () => {};
    }, [id]);
    const copy = (data: string) => {
        if (Platform.OS == "android") {
            ToastAndroid.show("Copied", ToastAndroid.LONG);
        } else {
            alert("Copied");
        }
    };
    const share = async (data: string) => {
        try {
            Share.share(
                {
                    message: data,
                    title: "Share Quote with"
                },
                { dialogTitle: "Share Quote with", subject: "Quotes" }
            );
        } catch (e) {
            alert(e);
        }
    };

    BackHandler.addEventListener("hardwareBackPress", () => {
        if (qid != undefined) {
            navigation.navigate("bookmark");
        } else {
            if (navigation.canGoBack()) {
                navigation.goBack();
            }
            navigation.navigate("index");
        }
        return true;
    });

    useFocusEffect(
        useCallback(() => {
            if (qid !== undefined) {
                scrollTo(qid - 1);
            }
        }, [id, qid])
    );

    return (
        <ImageBackground
            className="flex-1 pb-5"
            blurRadius={0}
            resizeMode="stretch"
            source={image}
            key={refresh}
        >
            <FlatList
                data={quotes}
                renderItem={({ item }) => (
                    <QuoteComp
                        border={{ shown: item.id == qid ? true : false }}
                        onCopyPress={() => copy(item.quote)}
                        onSharePress={() => share(item.quote)}
                        onBookPress={() => addBookmark(item.id)}
                        qoute={item.quote}
                        author={item.author}
                        cid={id}
                        qid={item.id}
                    />
                )}
                ref={flatListRef}
            />
            <Dialog visible={userAddDialogVisible}>
                <Dialog.Title>Add Your Quote</Dialog.Title>
                <Dialog.Content>
                    <Text style={{ color: theme.colors.title}}>All fields is require</Text>

                    <TextInput
                        mode="outlined"
                        label="Author"
                        multiline={false}
                        className="mt-3"
                        maxLength={15}
                        onChangeText={text => {
                            userAuthor.length <= 15
                                ? setUserAuthor(text)
                                : alert("author length limit");
                        }}
                        right={
                            <TextInput.Affix text={`${userAuthor.length}/15`} />
                        }
                        left={<TextInput.Icon icon="account" />}
                    />
                    <TextInput
                        mode="outlined"
                        label="Quote"
                        multiline={true}
                        className="h-32 mt-3"
                        maxLength={100}
                        onChangeText={text => {
                            userQuote.length <= 100
                                ? setUserQuote(text)
                                : alert("quote length limit");
                        }}
                        right={
                            <TextInput.Affix text={`${userQuote.length}/100`} />
                        }
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => setUserAddDialogVisible(false)}>
                        Cancel
                    </Button>
                    <Button onPress={() => setUserAddDialogVisible(false)}>
                        Add
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </ImageBackground>
    );
};

export default q;
