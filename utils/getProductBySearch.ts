import { getStoryblokApi } from "./storyBlok";

export const getProductBySearch = async (
  searchString: string,
  category?: string
) => {
  const storyBlokClient = getStoryblokApi();
  const filter_query: any = {
    meno: {
      like: `*${searchString}*`,
    },
  };

  if (category) {
    filter_query.kategoria = {
      in: category,
    };
  }

  const { data } = await storyBlokClient.get("cdn/stories", {
    version: "draft",
    starts_with: "produkty/",
    filter_query,
  });

  return data.stories;
};
