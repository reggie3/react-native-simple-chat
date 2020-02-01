import * as React from "react";
import { StyleSheet, Text, View, Animated, Image, Easing } from "react-native";
import { useEffect } from "react";

export type Message = {
  id: string;
  fromUser: boolean;
  text: string;
};

interface ChatMessageProps {
  isLastMessage: boolean;
  message: Message;
  setLastMessageRef: (ref: View) => void;
}

const INCOMING_MESSAGE_COLOR = "lightblue";
const OUTGOING_MESSAGE_COLOR = "lightgreen";

const ChatMessage: React.SFC<ChatMessageProps> = ({
  message,
  isLastMessage,
  setLastMessageRef
}) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500
    }).start();
  }, []);

  const messageStyle = message.fromUser
    ? messageStyles.messageViewOutgoing
    : messageStyles.messageViewIncoming;
  return (
    <View
      ref={ref => {
        if (isLastMessage) {
          setLastMessageRef(ref);
        }
      }}
      style={{
        ...styles.messageRowContainer,
        alignItems: message.fromUser ? "flex-end" : "flex-start"
      }}
    >
      <Animated.View
        style={{
          ...messageStyle,
          opacity
        }}
      >
        <Text style={styles.messageText}>{message.text}</Text>
      </Animated.View>
    </View>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  messageRowContainer: {
    marginHorizontal: 5
  },

  messageText: {
    fontSize: 14
  },
  messageView: {
    borderRadius: 5,
    marginVertical: 10,
    maxWidth: "70%",
    paddingHorizontal: 10,
    paddingVertical: 5
  }
});
const messageStyles = StyleSheet.create({
  messageViewIncoming: {
    ...styles.messageView,
    backgroundColor: INCOMING_MESSAGE_COLOR
  },
  messageViewOutgoing: {
    ...styles.messageView,
    backgroundColor: OUTGOING_MESSAGE_COLOR
  }
});
