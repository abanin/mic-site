export type Project = {
  status: "completed" | "WIP" | "order";
  name: string;
  description: string;
  content: string;
  Slug: string;
  previewImage: {
    data: {
      id: number;
      attributes: {
        url: string;
        name: string;
      };
    };
  };
  image: {
    data: {
      id: number;
      attributes: {
        url: string;
        name: string;
      };
    };
  };
};
