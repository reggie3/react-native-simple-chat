import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TimeStampSeperatorProps {
  timeStamp: number;
}

const TimeStampSeperator: React.SFC<TimeStampSeperatorProps> = ({
  timeStamp
}) => {
  return (
    <View style={styles.timeStampContainer}>
      <Text>{new Date(timeStamp).toLocaleTimeString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timeStampContainer: {
    alignItems: "center"
  }
});

export default TimeStampSeperator;
