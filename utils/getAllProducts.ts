import { getStoryblokApi } from "./storyBlok";

export const getAllProducts = async () => {
  const storyBlokClient = getStoryblokApi();
  const { data, total } = await storyBlokClient.get("cdn/stories", {
    version: "draft",
    starts_with: "produkty/",
    per_page: 10,
    page: 1,
  });

  return {
    products: data.stories,
    total: total ?? total ?? 0,
  };
};
