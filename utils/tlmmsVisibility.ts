const INVISIBLE_CHAR = "\u200B\u200B\u200B"; // Zero-width spaces

export const transformTLMMSToInvisible = (input: string): string => {
  return input.replace(
    /@tlmms(.*?)@tlmme/g,
    (_, mention) => `@${INVISIBLE_CHAR}${mention.trim()}${INVISIBLE_CHAR}`
  );
};

export const recoverTLMMSFromInvisible = (input: string): string => {
  return input.replace(
    new RegExp(
      `@${INVISIBLE_CHAR}([^${INVISIBLE_CHAR}]*)${INVISIBLE_CHAR}`,
      "g"
    ),
    "@tlmms$1@tlmme"
  );
};

// NOTE: tlmms stands for "tulime messages"
// @tlmms stands for tulime message start
// @tlmme stands for tulime message end
