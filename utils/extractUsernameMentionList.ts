const INVISIBLE_CHAR = "\u200B\u200B\u200B"; // Zero-width spaces

export const extractUsernameMentionList = (input: string): string[] => {
  const mentions: string[] = [];
  const regex = new RegExp(`@${INVISIBLE_CHAR}(.*?)${INVISIBLE_CHAR}`, "g");
  let match;

  while ((match = regex.exec(input)) !== null) {
    const mention = match[1].trim(); // Extract mention inside the pattern '@tlmms...@tlmme'
    if (mention) mentions.push(mention);
  }

  return mentions;
};

// Note
// @tlmms stands for tulime message start
// @tlmme stands for tulime message end
