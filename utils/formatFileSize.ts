export const formatFileSize = (size: number): string => {
  const units = ["b", "kb", "mb", "gb", "tb"];
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${Math.floor(size)}${units[unitIndex]}`;
};
