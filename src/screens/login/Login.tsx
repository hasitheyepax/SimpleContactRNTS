import React, { FC, useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { InputField, Button } from "../../components";
import ThemeContext from "../../contexts/ThemeContext";
import { Theme } from "../../config/colors";
import { HideKeyboard } from "../../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamsList } from "../../navigation/Types";
import { loginCredentialsType } from "../../types/user";
import { getUsers } from "../../helpers/asyncStorage";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/slices/authSlice";
import { Base64 } from "js-base64";
import Toast from "react-native-toast-message";

const validationSchema = yup.object({
  email: yup.string().email().required("An email is needed"),
  password: yup.string().required("A password is needed"),
});

const Login: FC<NativeStackScreenProps<AuthStackParamsList, "LOGIN">> = (
  props
): JSX.Element => {
  const { navigation } = props;
  const { theme } = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const passwordInputRef = useRef<TextInput>(null);
  const styles = themeStyles(theme);

  const handleRegisterPress: Function = () => {
    navigation.navigate("REGISTER");
  };

  const handleLogin = async (credentials: loginCredentialsType) => {
    const users = await getUsers();
    if (users) {
      const result = users.filter((user) => {
        return (
          user.email.toLowerCase() === credentials.email.toLowerCase() &&
          Base64.decode(user.password) === credentials.password
        );
      });
      if (result.length > 0) {
        Toast.show({
          type: "success",
          text1: "Open sesame!",
          text2: "You may enter! 😎",
        });
        dispatch(login());
      } else {
        Toast.show({
          type: "error",
          text1: "Invalid credentials!",
          text2: "Check your email and password again! 🤨",
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "No registered users!",
        text2: "Register yourself as a user first! 🤣",
      });
    }
  };

  const handleEmailSubmitEditing = (): void => {
    if (passwordInputRef.current) passwordInputRef.current.focus();
  };

  return (
    <HideKeyboard>
      <View style={styles.pageContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{"🪙 Coin Trick"}</Text>
        </View>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={async ({ email, password }) => {
            const credentials: loginCredentialsType = {
              email,
              password,
            };
            await handleLogin(credentials);
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            handleBlur,
            touched,
            resetForm,
            isValid,
            validateForm,
          }) => (
            <>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.inputContainer}
                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : -150}
              >
                <InputField
                  label={"Email"}
                  value={values.email}
                  isPassword={false}
                  onChangeText={handleChange("email")}
                  error={touched.email ? errors.email : undefined}
                  placeholder={"Your email address"}
                  onBlur={handleBlur("email")}
                  keyboardType={"email-address"}
                  onSubmitEditing={handleEmailSubmitEditing}
                />
                <InputField
                  label={"Password"}
                  value={values.password}
                  isPassword={true}
                  onChangeText={handleChange("password")}
                  error={touched.password ? errors.password : undefined}
                  placeholder={"Enter your password"}
                  onBlur={handleBlur("password")}
                  onSubmitEditing={handleSubmit}
                  innerRef={passwordInputRef}
                />
                <View style={styles.buttonContainer}>
                  <Button
                    label={"Login"}
                    onPress={handleSubmit}
                    disabled={!isValid}
                  />
                  <View style={styles.margin} />
                  <Button
                    label={"Register"}
                    onPress={async () => {
                      resetForm();
                      await validateForm();
                      handleRegisterPress();
                    }}
                  />
                </View>
              </KeyboardAvoidingView>
            </>
          )}
        </Formik>
      </View>
    </HideKeyboard>
  );
};

const themeStyles = (theme: Theme) =>
  StyleSheet.create({
    pageContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    headerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 40,
    },
    headerText: {
      fontSize: 40,
      fontWeight: "700",
      letterSpacing: 4,
      color: theme.colors.text,
    },
    inputContainer: {
      flex: 1,
      width: "85%",
      marginBottom: 40,
    },
    buttonContainer: {},
    margin: {
      height: theme.verticalMargin,
    },
  });

export default Login;
