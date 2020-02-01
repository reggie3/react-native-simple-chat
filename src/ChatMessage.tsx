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

export default class ChatMessage extends React.Component<ChatMessageProps> {
  opacityValue: Animated.Value;

  constructor(props: ChatMessageProps) {
    super(props);
    this.opacityValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.fadeIn();
  }

  fadeIn = () => {
    this.opacityValue.setValue(0);
    Animated.timing(this.opacityValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear
    }).start();
  };

  render() {
    const { message, isLastMessage, setLastMessageRef } = this.props;
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
            opacity: this.opacityValue
          }}
        >
          <Text style={styles.messageText}>{message.text}</Text>
        </Animated.View>
      </View>
    );
  }
}

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
