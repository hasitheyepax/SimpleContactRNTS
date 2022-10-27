import { FC, useContext } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import ThemeContext from "../../contexts/ThemeContext";
import { Theme } from "../../config/colors";
import { Button, InputField } from "../../components";
import * as yup from "yup";
import { Formik } from "formik";
import { userType } from "../../types/user";
import { registerUser } from "../../helpers/asyncStorage";
import { Base64 } from "js-base64";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
  passwordVerify: yup.string().required("Re-enter the password here"),
});

const Register: FC = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const styles = themeStyles(theme);

  const handleUserRegistration = async (user: userType): Promise<void> => {
    const status = await registerUser(user);
    console.log(status);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
      >
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            passwordVerify: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const user: userType = {
              name: values.name,
              email: values.email.toLowerCase(),
              password: Base64.encode(values.password),
            };
            if (values.password === values.passwordVerify)
              await handleUserRegistration(user);
          }}
        >
          {({
            values,
            errors,
            handleBlur,
            handleSubmit,
            handleChange,
            touched,
          }) => (
            <View style={styles.inputContainer}>
              <InputField
                label={"Name"}
                value={values.name}
                isPassword={false}
                onChangeText={handleChange("name")}
                placeholder={"Your name"}
                error={touched.name ? errors.name : undefined}
                onBlur={handleBlur("name")}
              />
              <InputField
                label={"Email"}
                value={values.email}
                isPassword={false}
                onChangeText={handleChange("email")}
                placeholder={"Your email address"}
                error={touched.email ? errors.email : undefined}
                onBlur={handleBlur("email")}
                keyboardType={"email-address"}
              />
              <InputField
                label={"Password"}
                value={values.password}
                isPassword={true}
                onChangeText={handleChange("password")}
                placeholder={"Password"}
                error={touched.password ? errors.password : undefined}
                onBlur={handleBlur("password")}
              />
              <InputField
                label={"Verify Password"}
                value={values.passwordVerify}
                isPassword={true}
                onChangeText={handleChange("passwordVerify")}
                placeholder={"Password, again"}
                error={
                  touched.passwordVerify ? errors.passwordVerify : undefined
                }
                onBlur={handleBlur("passwordVerify")}
              />
              <Button label={"Register"} onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const themeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    contentContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    inputContainer: {
      width: "85%",
    },
    headerText: {
      color: theme.colors.text,
      fontSize: 24,
    },
  });

export default Register;
