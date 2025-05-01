import React, { ReactNode, useEffect, useState } from "react";
import { View, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { COLORS } from "@/constants";
import { SearchForm } from "../UI/SearchForm";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { TSearch } from "@/types/search";
import { AppModal } from "@/components/shared/UI/Modal";
import { MaterialIcons } from "@expo/vector-icons";
import { SearchResults } from "../UI/SearchResults";

type SecondaryLayoutProps = {
  parameters?: string[];
  searchLabel?: ReactNode;
};

const screenWidth = Dimensions.get("window").width * 0.999;
const screenHeight = Dimensions.get("window").height * 0.999;

export const SearchLayout: React.FC<SecondaryLayoutProps> = (props) => {
  // const [searchResults, setSearchResults] = useState<TSearch["results"] | null>(
  //   null
  // );
  const [searchResults, setSearchResults] = useState<TSearch["results"]>();
  const [closeModal, setCloseModal] = useState<boolean>(false);
  const closeModalHandler = () => setCloseModal(() => true);
  const parameters = props.parameters !== undefined ? props.parameters : ["*"];

  const searchLabel =
    props.searchLabel !== undefined ? (
      props.searchLabel
    ) : (
      <View style={styles.iconButton}>
        <MaterialIcons name="search" size={24} color={COLORS.white} />
      </View>
    );

  const onResultUpdateHandler = (results: TSearch["results"]) => {
    // console.log("search results : ", results);
    setSearchResults(() => {
      return results;
    });
  };

  useEffect(() => {
    return () => {
      setCloseModal(() => false);
      // setSearchResults();
    };
  }, [closeModal, searchResults, setSearchResults]);

  return (
    <AppModal
      openModalElement={searchLabel}
      modalViewStyles={styles.modalView}
      modalChildrenStyles={styles.modalChildrenView}
      positionViewStyles={styles.positionView}
      showCloseModalIcon={false}
      closeModal={closeModal}
    >
      <View style={styles.searchLayoutView}>
        <View style={styles.searchFormView}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={closeModalHandler}
          >
            <FontAwesome6 name="arrow-left" size={20} color={COLORS.gray6} />
          </TouchableOpacity>
          <SearchForm
            parameters={parameters}
            onResultUpdate={onResultUpdateHandler}
          />
        </View>
        <SearchResults results={searchResults!} />
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: screenWidth,
    minHeight: screenHeight * 0.2,
    height: screenHeight,
    maxHeight: screenHeight,
    borderRadius: 0,
  },
  modalChildrenView: {
    padding: 0,
    flex: 1,
  },
  positionView: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  searchLayoutView: {
    position: "relative",
    // backgroundColor: COLORS.blue5,
    flex: 1,
  },
  searchFormView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 16,
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    position: "fixed",
    top: 8,
    left: 0,
    marginBottom: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
