type Tender = {
  id: string;
  title: string;
  organization: string;
  createdAt: string;
  imageUrl: string;
};

export type TVacancy = {
  tender: Tender;
};
