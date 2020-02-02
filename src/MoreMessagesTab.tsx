import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export interface MoreMessagesTabProps {
  isVisible: boolean;
  onPress: () => void;
}

export interface MoreMessagesTabState {}

export default class MoreMessagesTab extends React.Component<
  MoreMessagesTabProps,
  MoreMessagesTabState
> {
  constructor(props: MoreMessagesTabProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const { onPress, isVisible } = this.props;
    return (
      <>
        {isVisible ? (
          <TouchableOpacity
            onPress={onPress}
            style={styles.newMessageIndicator}
          >
            <Text style={styles.newMessageIndicatorText}>new messages</Text>
          </TouchableOpacity>
        ) : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  newMessageIndicator: {
    backgroundColor: "rgba(30,144,255, .75)",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: "absolute"
  },
  newMessageIndicatorText: {
    color: "white"
  }
});
