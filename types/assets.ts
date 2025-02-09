type TFile = {
  name: string;
  mimeType: string;
  arrayBuffer: Uint8Array;
  base64: string;
  uri: string;
};

export type Asset = {
  file: TFile;
};
