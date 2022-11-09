import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Image,
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
      <View style={styles.renderComponentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.cardText}>{item.asset_id}</Text>
        </View>
        <View style={styles.imageContainer}>
          <View style={styles.imageFrame}>
            <Image source={{ uri: item.url }} style={styles.image} />
          </View>
        </View>
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

  const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={coins}
        keyExtractor={(value, index) => index.toString()}
        renderItem={({ item, index }) => _renderItem(item, index)}
        ListEmptyComponent={ListEmptyComponent}
        style={styles.listStyle}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={ItemSeparatorComponent}
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
      flex: 1,
      justifyContent: "center",
    },
    listStyle: {
      flex: 1,
      width: "90%",
      borderRadius: theme.borderRadius,
    },
    listContent: {
      backgroundColor: theme.colors.navigatorHeaderBackground,
      padding: 10,
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
    itemSeparator: {
      marginVertical: 5,
      height: 1,
      backgroundColor: theme.colors.background,
    },
    renderComponentContainer: {
      backgroundColor: theme.colors.cardBackground,
      width: "100%",
      height: 100,
      borderRadius: theme.borderRadius,
      padding: theme.verticalMargin,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    imageContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    imageFrame: {
      backgroundColor: "white",
      height: 80,
      width: 80,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: theme.borderRadius,
    },
    textContainer: {
      // backgroundColor: "yellow",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      height: "auto",
      width: 50,
      aspectRatio: 1,
    },
    cardText: {
      fontSize: 32,
      fontWeight: "bold",
      color: theme.colors.labelText,
      shadowColor: "black",
      shadowRadius: 1,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.1,
    },
  });

export default CoinSelector;
