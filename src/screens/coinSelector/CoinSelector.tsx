import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { FC, useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import ThemeContext from "../../contexts/ThemeContext";
import { Theme } from "../../config/colors";
import {
  coinType,
  loadCoinsAsync,
  selectCoins,
  selectStatus,
} from "../../store/slices/coinSlice";

const CoinSelector: FC = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const styles = themeStyles(theme);
  const dispatch = useAppDispatch();

  const coins = useAppSelector(selectCoins);
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    dispatch(loadCoinsAsync());
  }, []);

  const handleLogOut = () => {
    dispatch(logout());
  };

  const _renderItem = (item: coinType, index: number) => {
    return (
      <View>
        <Text>{item.asset_id}</Text>
      </View>
    );
  };

  const ListEmptyComponent = () => {
    return status === "loading" ? (
      <ActivityIndicator />
    ) : (
      <View style={styles.listEmptyStyle}>
        <Text>Nothing to see here...</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={coins}
        keyExtractor={(value, index) => index.toString()}
        renderItem={({ item, index }) => _renderItem(item, index)}
        ListEmptyComponent={ListEmptyComponent}
        style={styles.listStyle}
        contentContainerStyle={styles.listContent}
      />
      <Pressable onPress={handleLogOut} style={styles.button}>
        <Text style={styles.buttonText}>Logout!</Text>
      </Pressable>
    </SafeAreaView>
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
    listEmptyStyle: {
      backgroundColor: theme.colors.navigatorHeaderBackground,
      alignSelf: "center",
    },
    listStyle: {
      flex: 1,
      width: "90%",
      borderRadius: theme.borderRadius,
    },
    listContent: {
      backgroundColor: theme.colors.navigatorHeaderBackground,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      backgroundColor: theme.colors.buttonBody,
      padding: 20,
      marginTop: theme.verticalMargin,
      borderRadius: theme.borderRadius,
    },
    buttonText: {
      color: theme.colors.labelText,
    },
  });

export default CoinSelector;
