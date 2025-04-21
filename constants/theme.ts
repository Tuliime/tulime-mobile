const COLORS = {
  primary: "#37b24d",
  secondary: "#f59f00",
  tertiary: "#1c7ed6",
  primaryTransparent: "rgba(55,178,77,0.5)",
  gray: "#83829A",
  gray1: "#f1f3f5",
  gray2: "#e9ecef",
  gray3: "#dee2e6",
  gray4: "#ced4da",
  gray5: "#adb5bd",
  gray6: "#868e96",
  gray7: "#495057",
  gray8: "#343a40",
  gray9: "#212529",
  white: "#FFFFFF",
  lightWhite: "#FAFAFC",
  green0: "#ebfbee",
  green1: "#d3f9d8",
  green2: "#b2f2bb",
  green3: "#8ce99a",
  green4: "#69db7c",
  green5: "#51cf66",
  green9: "#2b8a3e",
  red2: "#ffc9c9",
  red5: "#ff6b6b",
  red6: "#fa5252",
  red7: "#f03e3e",
  blue3: "#74c0fc",
  blue4: "#4dabf7",
  blue5: "#339af0",
  blue7: "#1c7ed6",
  blue8: "#1971c2",
  blue9: "#1864ab",
  yellow4: "#ffd43b",
  yellow5: "#fcc419",
  yellow6: "#fab005",
  yellow7: "#f59f00",
  yellow8: "#f08c00",
  yellow9: "#e67700",
  pink8: "#c2255c",
  teal7: "#0ca678",
  violet5: "#845ef7",
  violet6: "#7950f2",
  violet7: "#7048e8",
  violet8: "#6741d9",
  violet9: "#5f3dc4",
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
