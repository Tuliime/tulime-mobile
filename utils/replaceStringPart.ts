export const replaceStringPart = (
  stringValue: string,
  stringPartToBeReplaced: string,
  ReplacingStringPart: string
): string => {
  return stringValue.split(stringPartToBeReplaced).join(ReplacingStringPart);
};
