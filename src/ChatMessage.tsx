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
  animatedValue: Animated.Value;

  constructor(props: ChatMessageProps) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.doMountAnimation();
  }

  doMountAnimation = () => {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.quad
    }).start();
  };

  render() {
    const { message, isLastMessage, setLastMessageRef } = this.props;
    const scaleY = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
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
            opacity: this.animatedValue,
            transform: [{ scaleY }]
          }}
        >
          <Animated.Text
            style={{ ...styles.messageText, opacity: this.animatedValue }}
          >
            {message.text}
          </Animated.Text>
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
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
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
