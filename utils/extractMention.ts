export const extractMention = (strInput: string) => {
  const regex = /@(\w*)/g;
  let match;

  while ((match = regex.exec(strInput)) !== null) {
    const mention = match[1];

    if (mention === "tlmms" || mention === "tlmme") continue;

    if (mention === "") return { hasMention: true, mention: "" };

    return { hasMention: true, mention };
  }

  return { hasMention: false, mention: null };
};
