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
import "@testing-library/jest-native/extend-expect";
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

    // we expect the submit button to be disabled on chat component mounting
    expect(messageSubmitButton).toBeDisabled();

    // type our text message in the input box
    fireEvent.changeText(messageInput, testMessage);

    // submit button should be enabled now that there is text in the input box
    expect(messageSubmitButton).toBeEnabled();

    // press the submit button
    fireEvent.press(messageSubmitButton);

    // we expect to find the test text message on the page
    expect(getByText(testMessage)).toBeTruthy();

    // in fact, we expect the scroll view to have a child element containing
    // the test message as text
    expect(messageScrollView).toContainElement(getByText(testMessage));

    // also expect the input box to be empty and the submit button to be disabled
    expect(messageInput).toBeEmpty();
    expect(messageSubmitButton).toBeDisabled();
  });
});
