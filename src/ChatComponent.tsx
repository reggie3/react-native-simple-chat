import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity
} from "react-native";
import { LoremIpsum } from "lorem-ipsum";
import { Viewport } from "@skele/components";
const ViewportAwareView = Viewport.Aware(View);

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

const INCOMING_MESSAGE_COLOR = "lightblue";
const OUTGOING_MESSAGE_COLOR = "lightgreen";

type Message = {
  id: string;
  fromUser: boolean;
  text: string;
};

export interface ChatContainerProps {}

export interface ChatContainerState {
  doShowNewMessageTab: boolean;
  inputText: string;
  isManuallyOffset: boolean;
  isLastItemVisible: boolean;
  messages: Message[];
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
      doShowNewMessageTab: false,
      inputText: "",
      isLastItemVisible: true,
      isManuallyOffset: false,
      messages: []
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
    setInterval(this.addIncomingMessage, 1000);
  };

  componentDidUpdate = (
    prevProps: ChatContainerProps,
    prevState: ChatContainerState
  ) => {
    const { isLastItemVisible, messages } = this.state;
    if (isLastItemVisible !== prevState.isLastItemVisible) {
      console.log(isLastItemVisible);
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

  MessageItem = ({ item, index }: { item: Message; index: number }) => {
    const isLastItem = index === this.state.messages.length - 1;

    const message = (
      <View
        ref={ref => {
          if (isLastItem) {
            this.lastMessageRef = ref;
          }
        }}
        key={item.id}
        style={{
          ...styles.messageRowContainer,
          alignItems: item.fromUser ? "flex-end" : "flex-start"
        }}
      >
        <View
          style={
            item.fromUser
              ? messageStyles.messageViewOutgoing
              : messageStyles.messageViewIncoming
          }
        >
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      </View>
    );

    return isLastItem ? (
      <ViewportAwareView
        key={item.id}
        preTriggerRatio={0.5}
        onViewportEnter={() => {
          debugger;
          if (!this.state.isLastItemVisible) {
            this.setState({ isLastItemVisible: true });
          }
        }}
        onViewportLeave={() => {
          debugger;
          if (this.state.isLastItemVisible) {
            this.setState({ isLastItemVisible: false });
          }
        }}
      >
        {message}
      </ViewportAwareView>
    ) : (
      message
    );
  };

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
    // this.scrollViewRef.scrollToEnd({ animated: true });
  };

  public render() {
    const { inputText, messages } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.scrollContainer}>
          <Viewport.Tracker>
            <ScrollView
              ref={ref => (this.scrollViewRef = ref)}
              onContentSizeChange={this.onScrollViewContentSizeChange}
            >
              {this.state.messages.map((message, index) => {
                return this.MessageItem({ item: message, index });
              })}
            </ScrollView>
          </Viewport.Tracker>
          <TouchableOpacity style={styles.newMessageIndicator}>
            <Text style={styles.newMessageIndicatorText}>new messages</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputRow}>
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
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "100%"
  },
  inputRow: {
    flexDirection: "row"
  },
  messageRowContainer: {
    marginHorizontal: 5
  },
  messageView: {
    borderRadius: 5,
    marginVertical: 10,
    maxWidth: "70%",
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  messageText: {
    fontSize: 14
  },
  newMessageIndicator: {
    backgroundColor: "rgba(255,0,155, .5)",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: "absolute"
  },
  newMessageIndicatorText: {
    color: "white"
  },
  textInput: {
    borderColor: "lightgray",
    borderRadius: 5,
    borderWidth: 1,
    flex: 1,
    height: 40,
    marginRight: 10
  },
  scrollContainer: {
    backgroundColor: "aliceblue",
    flex: 1,
    margin: 10,
    width: "100%"
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
