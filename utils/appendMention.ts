export const appendMention = (stringValue: string, mention: string): string => {
  return stringValue.replace(/@[^@]*$/, mention);
};
