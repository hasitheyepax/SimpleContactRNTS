import { TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { FC, ReactNode } from "react";

export interface hideKeyboardProps {
  children: ReactNode;
}

const HideKeyboard: FC<hideKeyboardProps> = (props): JSX.Element => {
  const { children } = props;
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default HideKeyboard;
