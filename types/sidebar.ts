export type TSidebar = {
  isOpen: boolean;
};

// export type TSidebarAction = {
//   openSidebar: (isOpen: TSidebar["isOpen"]) => void;
//   closeSidebar: (isOpen: TSidebar["isOpen"]) => void;
// };
export type TSidebarAction = {
  openSidebar: () => void;
  closeSidebar: () => void;
};
