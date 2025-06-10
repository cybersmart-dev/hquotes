import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { IconButton, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface QoutesProps {
    qoute: String;
    author: String;
    showActions?: Boolean;
    cid?: number;
    qid?: number;
    border?: { shown: Boolean };
    onCopyPress?: () => void;
    onSharePress?: () => void;
    onBookPress?: () => void;
    onContainerPress?: () => void;
    onLongPress?: () => void
}

export default QuoteComp = ({
    qoute,
    author,
    onLongPress,
    cid,
    qid,
    onCopyPress,
    onSharePress,
    onBookPress,
    onContainerPress,
    border,
    showActions = true
}: QoutesProps) => {
    const [copyIcon, setCopyIcon] = useState("content-copy");
    const [isAddedToBookmark, setisAddedToBookmark] = useState(false);
    const theme = useTheme()
    
    const isAdded = async () => {
        try {
            const sData = await AsyncStorage.getItem("book");
            const data = JSON.parse(sData);
            if (data) {
                const added = data.find(
                    item => item.id == cid && item.qid == qid
                );
                if (added) {
                    setisAddedToBookmark(true);
                } else {
                    setisAddedToBookmark(false);
                }
            } else {
                setisAddedToBookmark(false);
            }
        } catch (e) {
            alert(e);
        }
    };
    useEffect(() => {
        isAdded();
        return () => {};
    }, []);
    isAdded();
    const handleCopy = () => {
        setCopyIcon("check-circle-outline");

        setInterval(() => {
            setCopyIcon("content-copy");
        }, 2000);

        //clearInterval(interval);
    };
    return (
        <View className="w-screen  px-4 mt-3">
            <TouchableOpacity
                onLongPress={onLongPress}
                onPress={onContainerPress}
                className={
                    border?.shown
                        ? `h-auto border border-white border-2 bg-[#5c5c5caf] py-3 w-fit  rounded-2xl px-3`
                        : "h-auto bg-[#5c5c5caf] py-3 w-fit  rounded-2xl px-3"
                }
            >
                <Text selectable={true} className="text-xl text-white">
                    {qoute}
                </Text>
                <Text style={{color:theme.colors.title }} className="text-right text-[15px]">
                    ~ {author}
                </Text>
                {showActions ? (
                    <View className="flex-row w-fit mt-3 items-center justify-left bg-transparent  border-white rounded-full">
                        <IconButton
                            iconColor="white"
                            onPress={onSharePress}
                            icon="share-variant"
                        />
                        <IconButton
                            iconColor="white"
                            onPress={() => [handleCopy(), onCopyPress()]}
                            icon={copyIcon}
                        />
                        <IconButton
                            iconColor="white"
                            onPress={onBookPress}
                            icon={
                                isAddedToBookmark
                                    ? "book-check"
                                    : "book-outline"
                            }
                        />
                    </View>
                ) : (
                    ""
                )}
            </TouchableOpacity>
        </View>
    );
};
