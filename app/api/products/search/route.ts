import { NextResponse } from "next/server";
import { getProductBySearch } from "@/utils/getProductBySearch";

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
    const { query, category } = await request.json();

    // Validate query
    if (query && typeof query === "string") {
      if (query.length > 100) {
        return NextResponse.json(
          { error: "Vyhľadávací dotaz je príliš dlhý" },
          { status: 400 }
        );
      }
    }

    // Validate category
    if (category && !VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: "Neplatná kategória" },
        { status: 400 }
      );
    }

    const products = await getProductBySearch(query?.trim() || "", category);

    return NextResponse.json({ products });
  } catch (error) {
    console.error("[products/search] Failed to search products", error);
    return NextResponse.json(
      { error: "Nastala chyba pri vyhľadávaní produktov" },
      { status: 500 }
    );
  }
}
