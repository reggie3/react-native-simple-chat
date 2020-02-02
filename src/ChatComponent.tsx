import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Button,
  findNodeHandle,
  TouchableOpacity
} from "react-native";
import { LoremIpsum } from "lorem-ipsum";
import ChatMessage, { Message } from "./ChatMessage";
import MoreMessagesTabComponent from "./MoreMessagesTab";
import MoreMessagesTab from "./MoreMessagesTab";
const isEqual = require("lodash.isequal");

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

type Layout = {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX?: number;
  pageY?: number;
};

export interface ChatContainerProps {}

export interface ChatContainerState {
  scrollViewPortBottomY: number;
  doShowNewMessageTab: boolean;
  inputText: string;
  isManuallyOffset: boolean;
  isLastItemVisible: boolean;
  lastMessageLayout: Layout;
  messages: Message[];
  scrollViewLayout: Layout;
}

export default class ChatContainer extends React.Component<
  ChatContainerProps,
  ChatContainerState
> {
  private lastMessageRef: View = null;
  private scrollViewRef: ScrollView = null;
  constructor(props: ChatContainerProps) {
    super(props);
    this.state = {
      scrollViewPortBottomY: 0,
      doShowNewMessageTab: false,
      inputText: "",
      isLastItemVisible: true,
      isManuallyOffset: false,
      lastMessageLayout: null,
      messages: [],
      scrollViewLayout: null
    };
  }

  checkVisible = (isVisible: boolean) => {
    if (isVisible) {
      this.setState({ doShowNewMessageTab: false });
    } else {
      this.setState({ doShowNewMessageTab: true });
    }
  };

  componentDidMount = () => {
    setInterval(this.addIncomingMessage, 1200);
  };

  componentDidUpdate = (
    prevProps: ChatContainerProps,
    prevState: ChatContainerState
  ) => {
    const {
      isLastItemVisible,
      lastMessageLayout,
      scrollViewPortBottomY
    } = this.state;

    if (
      lastMessageLayout &&
      scrollViewPortBottomY !== prevState.scrollViewPortBottomY
    ) {
      if (scrollViewPortBottomY > lastMessageLayout.y && !isLastItemVisible) {
        this.setState({ isLastItemVisible: true, doShowNewMessageTab: false });
      } else if (
        scrollViewPortBottomY <= lastMessageLayout.y &&
        isLastItemVisible
      ) {
        this.setState({ isLastItemVisible: false, doShowNewMessageTab: true });
      }
    }
  };

  addIncomingMessage = () => {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          id: Math.random().toString(),
          fromUser: Math.random() < 0.6 ? false : true,
          text:
            Math.random() < 0.6
              ? lorem.generateSentences(2)
              : lorem.generateWords(3)
        }
      ]
    });
  };

  MessageItem = ({ item, index }: { item: Message; index: number }) => {};

  onSubmitInput = () => {
    this.setState((prevState, props) => {
      return {
        messages: [
          ...this.state.messages,
          {
            id: Math.random().toString(),
            fromUser: true,
            text: prevState.inputText
          }
        ],
        inputText: ""
      };
    });
  };

  onChangeInputText = (inputText: string) => {
    this.setState({ inputText });
  };

  onScrollViewContentSizeChange = (
    contentWidth: number,
    contentHeight: number
  ) => {
    if (this.state.isLastItemVisible) {
      this.scrollViewRef.scrollToEnd({ animated: true });
    }
  };

  onScrollViewLayout = (e: any) => {
    this.setState({
      scrollViewLayout: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height,
        x: e.nativeEvent.layout.x,
        y: e.nativeEvent.layout.y
      }
    });
  };

  onScrollViewScroll = ({ nativeEvent }) => {
    this.setState({
      scrollViewPortBottomY:
        nativeEvent.contentOffset.y + this.state.scrollViewLayout.height
    });

    // update the position of the last message
    this.lastMessageRef.measureLayout(
      findNodeHandle(this.scrollViewRef),
      (xPos, yPos, Width, Height) => {
        this.setState({
          lastMessageLayout: { x: xPos, y: yPos, width: Width, height: Height }
        });
      },
      null
    );
  };

  public render() {
    const { doShowNewMessageTab, inputText, messages } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.scrollContainer}>
          <ScrollView
            ref={ref => (this.scrollViewRef = ref)}
            onContentSizeChange={this.onScrollViewContentSizeChange}
            onLayout={this.onScrollViewLayout}
            onScroll={this.onScrollViewScroll}
            scrollEventThrottle={400}
          >
            {this.state.messages.map((message, index) => {
              return (
                <ChatMessage
                  key={message.id}
                  isLastMessage={index === messages.length - 1}
                  message={message}
                  setLastMessageRef={ref => {
                    this.lastMessageRef = ref;
                  }}
                />
              );
            })}
          </ScrollView>
          <MoreMessagesTab
            isVisible={doShowNewMessageTab}
            onPress={() => this.scrollViewRef.scrollToEnd()}
          />
        </View>
        <View style={styles.textInputRow}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.onChangeInputText(text)}
            value={inputText}
          />
          <Button
            disabled={!inputText.length}
            onPress={this.onSubmitInput}
            title="Submit"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    /*     padding: 10,
     */ width: "100%"
  },

  textInput: {
    borderColor: "lightgray",
    borderRadius: 5,
    borderWidth: 1,
    flex: 1,
    height: 40,
    marginRight: 10
  },
  textInputRow: {
    flexDirection: "row",
    marginHorizontal: 5
  },
  scrollContainer: {
    backgroundColor: "aliceblue",
    flex: 1,
    margin: 10
  }
});
