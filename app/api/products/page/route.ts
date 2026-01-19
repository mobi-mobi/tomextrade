import { NextResponse } from "next/server";
import { getStoryblokApi } from "@/utils/storyBlok";

const VALID_CATEGORIES = [
  "dávkovače",
  "servítky",
  "rúška",
  "zdravotnícke-rolky",
  "industriálne-rolky",
  "skladané-papierové-utierky",
  "papierové-utierky",
  "toaletné-papiere",
];

export async function POST(request: Request) {
  try {
    const { page, perPage = 10, category } = await request.json();

    if (!page || typeof page !== "number" || page < 1) {
      return NextResponse.json(
        { error: "Valid page number is required" },
        { status: 400 }
      );
    }

    // Validate category
    if (category && !VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: "Neplatná kategória" },
        { status: 400 }
      );
    }

    const storyBlokClient = getStoryblokApi();

    const filter_query: any = {};
    if (category) {
      filter_query.kategoria = {
        in: category,
      };
    }

    const { data, total } = await storyBlokClient.get("cdn/stories", {
      version: "draft",
      starts_with: "produkty/",
      per_page: perPage,
      page: page,
      filter_query,
    });

    return NextResponse.json({
      products: data.stories,
      total: total ?? 0,
      hasMore: data.stories.length === perPage && page * perPage < total,
    });
  } catch (error) {
    console.error("[products/page] Failed to fetch products", error);
    return NextResponse.json(
      { error: "Nastala chyba pri načítaní produktov" },
      { status: 500 }
    );
  }
}
