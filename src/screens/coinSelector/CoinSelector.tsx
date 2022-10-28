import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { FC, useContext } from "react";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import ThemeContext from "../../contexts/ThemeContext";
import { Theme } from "../../config/colors";

const CoinSelector: FC = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const styles = themeStyles(theme);
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleLogOut}>
        <Text>Logout!</Text>
      </Pressable>
    </View>
  );
};

const themeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default CoinSelector;
