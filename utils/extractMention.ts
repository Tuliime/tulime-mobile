export const extractMention = (strInput: string) => {
  const regex = /@tlmms(.*?)@tlmme|@(\w*)/g;
  let match;

  while ((match = regex.exec(strInput)) !== null) {
    // If match[1] is not null, it means it's inside @tlmms...@tlmme, so skip it
    if (match[1] !== undefined) continue;

    // If match[2] exists but is empty, return hasMention: true with an empty mention
    if (match[2] === "") {
      return { hasMention: true, mention: "" };
    }

    // If match[2] has a value, return it as a valid mention
    if (match[2]) {
      return { hasMention: true, mention: match[2] };
    }
  }

  return { hasMention: false, mention: null };
};
