import React, { FC } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { ColorsType } from "../../config/index";

interface inputFieldProps {
  label: string;
  value: string;
  isPassword: boolean;
  onChangeText: Function;
  error?: string;
  placeholder: string;
}

const InputField: FC<inputFieldProps> = (props): JSX.Element => {
  const {
    label,
    value,
    isPassword = false,
    onChangeText,
    error,
    placeholder,
  } = props;
  const { colors, dark } = useTheme();

  return (
    <View style={styles(colors).container}>
      <Text style={styles(colors).labelText}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={(value) => onChangeText(value)}
        secureTextEntry={isPassword}
        style={styles(colors).inputText}
        placeholder={placeholder}
      />
      {error ? (
        <Text style={styles(colors, dark).errorText}>{error}</Text>
      ) : undefined}
    </View>
  );
};

const styles = (colors: ColorsType, dark?: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      width: "100%",
      marginBottom: 20,
      height: 60,
    },
    labelText: {
      color: colors.textSub,
      fontSize: 18,
      marginBottom: 10,
    },
    inputText: {
      fontSize: 16,
      color: colors.text,
      marginLeft: 20,
    },
    errorText: {
      fontSize: 12,
      color: colors.notification,
      textTransform: "capitalize",
      marginLeft: 20,
      paddingTop: 5,
    },
  });

export default InputField;
