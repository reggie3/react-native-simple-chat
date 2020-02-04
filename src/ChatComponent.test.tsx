import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import {
  cleanup,
  fireEvent,
  render,
  wait,
  queryByText
} from "@testing-library/react-native";
import ChatContainer from "./ChatComponent";

afterEach(cleanup); // <-- add this

describe("ChatComponent", () => {
  it(`should take a value from input, and show it in the chat window & remove the input text from the input box upon submit`, async () => {
    const testMessage = "test message";
    const {
      debug,
      getByTestId,
      getByText,
      queryByTestId,
      queryByText,
      baseElement
    } = render(<ChatContainer />);

    const messageScrollView = getByTestId("messageScrollView");
    const messageInput = getByTestId("messageInput");
    const messageSubmitButton = getByTestId("messageSubmitButton");

    fireEvent.changeText(messageInput, testMessage);
    expect(queryByText(testMessage)).toBeFalsy();
    fireEvent.press(messageSubmitButton);
    expect(getByText(testMessage)).toBeTruthy();
  });
});
