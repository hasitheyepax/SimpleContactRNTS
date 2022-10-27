import React, { FC, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { InputField, Button } from "../../components";
import ThemeContext from "../../contexts/ThemeContext";
import { Theme } from "../../config/colors";
import { HideKeyboard } from "../../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamsList } from "../../navigation/Types";

const validationSchema = yup.object({
  email: yup.string().email().required("An email is needed"),
  password: yup.string().required("A password is needed"),
});

const Login: FC<NativeStackScreenProps<AuthStackParamsList, "LOGIN">> = (
  props
): JSX.Element => {
  const { navigation } = props;
  const { theme } = useContext(ThemeContext);
  const styles = themeStyles(theme);

  const handleRegisterPress: Function = () => {
    navigation.navigate("REGISTER");
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
          onSubmit={(values) => {
            console.log(values);
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
          }) => (
            <>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.inputContainer}
              >
                <InputField
                  label={"Email"}
                  value={values.email}
                  isPassword={false}
                  onChangeText={handleChange("email")}
                  error={touched.email ? errors.email : undefined}
                  placeholder={"Your email address"}
                  disableAutoCapitalize
                  onBlur={handleBlur("email")}
                />
                <InputField
                  label={"Password"}
                  value={values.password}
                  isPassword={true}
                  onChangeText={handleChange("password")}
                  error={touched.password ? errors.password : undefined}
                  placeholder={"Enter your password"}
                  onBlur={handleBlur("password")}
                />
              </KeyboardAvoidingView>
              <View style={styles.buttonContainer}>
                <Button label={"Login"} onPress={handleSubmit} />
                <View style={styles.margin} />
                <Button
                  label={"Register"}
                  onPress={() => {
                    resetForm();
                    handleRegisterPress();
                  }}
                />
              </View>
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
      flex: 2,
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
      width: "85%",
      marginBottom: 40,
    },
    buttonContainer: {
      flex: 2,
      width: "70%",
    },
    margin: {
      height: theme.verticalMargin,
    },
  });

export default Login;
