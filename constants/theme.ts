const COLORS = {
  primary: "#37b24d",
  secondary: "#f59f00",
  tertiary: "#1c7ed6",
  gray: "#83829A",
  gray1: "#f1f3f5",
  gray2: "#C1C0C8",
  gray3: "#dee2e6",
  gray4: "#ced4da",
  gray6: "#868e96",
  gray7: "#495057",
  gray8: "#343a40",
  white: "#FFFFFF",
  lightWhite: "#FAFAFC",
  green9: "#2b8a3e",
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

/**
 *xxSmall: 8
 *xSmall: 10
 *small: 12
 *medium: 16
 *large: 20
 *xLarge: 24
 *xxLarge: 32
 */
const SIZES = {
  xxSmall: 8,
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
