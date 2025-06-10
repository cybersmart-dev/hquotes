import React, { useEffect, useRef } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useNavigation } from "expo-router";
import { IconButton, Button, useTheme } from "react-native-paper";
import { WebView } from "react-native-webview";

const Privacy = () => {
    const navigation = useNavigation();
    const webViewRef = useRef<WebView>(null);
    const theme = useTheme();
    const URL = "https://www.nowtimes.com.ng/privacy/";

    const reloadPage = () => {
        webViewRef?.current.reload();
        webViewRef?.current.clearHistory();
    };

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View>
                    <IconButton
                        onPress={() => navigation.goBack()}
                        icon="arrow-left"
                    />
                </View>
            ),
            headerRight: () => (
                <View>
                    <IconButton onPress={() => reloadPage()} icon="sync" />
                </View>
            )
        });
        return () => {};
    }, []);

    return (
        <View
            style={{ backgroundColor: theme.colors.background }}
            className="flex-1 justify-center items-center"
        >
            <WebView
                ref={webViewRef}
                className="flex-1 w-screen"
                source={{ uri: URL }}
                startInLoadingState={true}
                renderLoading={() => (
                    <View
                        style={{ backgroundColor: theme.colors.background }}
                        className="absolute bg-white w-screen h-screen justify-center items-center flex-1"
                    >
                        <ActivityIndicator size={50} />
                        <Text
                            style={{ color: theme.colors.title }}
                            className="text-[20px] font-light mt-3"
                        >
                            Loading Privacy
                        </Text>
                        <Text
                            style={{ color: theme.colors.title }}
                            className="font-light mt-1"
                        >
                            place wait...
                        </Text>
                    </View>
                )}
                renderError={errorName => (
                    <View
                        style={{ backgroundColor: theme.colors.background }}
                        className="items-center flex-1 absolute h-screen w-screen justify-center"
                    >
                        <IconButton size={90} icon="connection" />
                        <Text
                            style={{ color: theme.colors.title }}
                            className="text-[20px] mb-1 font-light"
                        >
                            Oops!
                        </Text>
                        <Text
                            style={{ color: theme.colors.title }}
                            className="text-[13px] mb-3 font-light"
                        >
                            Connection Lost
                        </Text>

                        <Button
                            mode="contained-tonal"
                            onPress={() => reloadPage()}
                            icon="sync"
                        >
                            Reload
                        </Button>
                    </View>
                )}
            />
        </View>
    );
};

export default Privacy;
