type TFile = {
  name: string;
  mimeType: string;
  base64: string;
  uri: string;
};

export type Asset = {
  file: TFile;
};
