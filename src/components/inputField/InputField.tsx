import React, { FC, Ref, RefObject, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardType,
  Platform,
} from "react-native";
import { Theme } from "../../config/colors";
import ThemeContext from "../../contexts/ThemeContext";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface inputFieldProps {
  label: string;
  value: string;
  isPassword: boolean;
  onChangeText: Function;
  placeholder: string;
  error?: string;
  disableAutoCapitalize?: boolean;
  onBlur?: Function;
  keyboardType?: KeyboardType;
  onSubmitEditing?: Function;
  innerRef?: RefObject<TextInput>;
}

const InputField: FC<inputFieldProps> = (props): JSX.Element => {
  const {
    label,
    value,
    isPassword = false,
    onChangeText,
    placeholder,
    error,
    disableAutoCapitalize = false,
    onBlur,
    keyboardType,
    onSubmitEditing,
    innerRef,
  } = props;

  const { theme } = useContext(ThemeContext);
  const styles = themeStyles(theme);

  const animatedHeight = useSharedValue(70);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height:
        Platform.OS === "android"
          ? animatedHeight.value + 20
          : animatedHeight.value,
    };
  });

  return (
    <Animated.View style={[styles.topContainer, animatedStyles]}>
      <Animated.View style={styles.container}>
        <View style={styles.labelRow}>
          <Text style={styles.labelText}>{label}</Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : undefined}
        </View>
        <TextInput
          value={value}
          onChangeText={(value) => onChangeText(value)}
          secureTextEntry={isPassword}
          style={styles.inputText}
          placeholder={placeholder}
          autoCapitalize={
            disableAutoCapitalize || keyboardType ? "none" : "sentences"
          }
          onBlur={(e) => {
            animatedHeight.value = withTiming(70);
            onBlur?.(e);
          }}
          keyboardType={keyboardType}
          autoCorrect={false}
          spellCheck={false}
          onSubmitEditing={() => onSubmitEditing?.()}
          ref={innerRef}
          onFocus={() => {
            animatedHeight.value = withTiming(90);
          }}
        />
      </Animated.View>
    </Animated.View>
  );
};

const themeStyles = (theme: Theme) =>
  StyleSheet.create({
    topContainer: {
      backgroundColor: theme.colors.primary,
      width: "100%",
      marginBottom: 10,
      borderRadius: 5,
      justifyContent: "center",
    },
    container: {
      margin: 10,
    },
    labelText: {
      color: theme.colors.labelText,
      fontSize: 18,
      marginBottom: 10,
      fontWeight: "bold",
    },
    inputText: {
      fontSize: 18,
      color: theme.colors.text,
      marginHorizontal: 20,
    },
    errorText: {
      fontSize: 12,
      color: theme.colors.textSub,
      textTransform: "capitalize",
      marginTop: 5,
      textAlign: "right",
    },
    labelRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: Platform.OS === "android" ? 15 : undefined,
    },
  });

export default InputField;
