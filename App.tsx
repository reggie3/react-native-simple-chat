import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  SafeAreaView
} from "react-native";
import ChatContainer from "./src/ChatComponent";

export default function App() {
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Simple Chat Window Example</Text>
        </View>
        <ChatContainer />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  header: {
    backgroundColor: "dodgerblue",
    paddingTop: 40,
    paddingHorizontal: 15,
    paddingBottom: 10,
    width: "100%"
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600"
  }
});
