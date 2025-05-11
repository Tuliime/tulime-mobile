export type TSlideUpPanelAction = {
  openPanel: () => void;
  closePanel: () => void;
};

export type TSlideUpPanel = {
  isOpen: boolean;
  panelActions: TSlideUpPanelAction;
};
