type Tender = {
  id: string;
  title: string;
  organization: string;
  createdAt: string;
  imageUrl: string;
};

type Vacancy = {
  id: string;
  title: string;
  description: string;
  organization: string;
  deadline: string;
  createdAt: string;
  imageUrl: string;
};

export type TVacancy = {
  tender: Tender;
  vacancy: Vacancy;
};
