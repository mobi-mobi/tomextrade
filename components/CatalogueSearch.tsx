"use client";

import { useState, FormEvent } from "react";
import { Search } from "lucide-react";

export interface ProductContent {
  meno: string;
  obrazok?: {
    filename: string;
    alt?: string;
    title?: string;
  };
  kategoria?: string[];
  popis?: string;
  component: "products";
}

export interface ProductStory {
  id: number;
  uuid: string;
  slug: string;
  total: number;
  full_slug: string;
  content: ProductContent;
}

interface CatalogueSearchProps {
  initialProducts: ProductStory[];
  total: number;
}

const CATEGORIES = [
  "dávkovače",
  "servítky",
  "rúška",
  "zdravotnícke-rolky",
  "industriálne-rolky",
  "skladané-papierové-utierky",
  "papierové-utierky",
  "toaletné-papiere",
];

const CatalogueSearch = ({ initialProducts, total }: CatalogueSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState(initialProducts);
  const [isSearching, setIsSearching] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(2); // Start at 2 since initialProducts is page 1
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialProducts.length < total);
  const [totalProducts, setTotalProducts] = useState(total);

  const handleSearch = async (
    e?: FormEvent<HTMLFormElement>,
    categoryOverride?: string | null
  ) => {
    if (e) e.preventDefault();

    // Determine the category to use (argument takes precedence, otherwise state)
    // We need to distinguish between "clearing category" (passing null) and "using current state" (undefined)
    const categoryToUse = categoryOverride !== undefined ? categoryOverride : selectedCategory;

    setIsSearching(true);
    setErrorMessage(null);

    const query = searchQuery.trim();

    if (query === "" && !categoryToUse) {
      setProducts(initialProducts);
      setIsFiltered(false);
      setIsSearching(false);
      setCurrentPage(2); // Reset pagination
      setHasMore(initialProducts.length < total);
      setTotalProducts(total);
      return;
    }

    try {
      // If we have a category but no search query, we should use the page endpoint to allow pagination for the category
      // BUT for simplicity given the current structure where "search" returns everything, let's look at the flow.
      // If we use /api/products/search regardless, we get all results. 
      // If we want pagination for categories, we should use /api/products/page with filter.

      let endpoint = "/api/products/search";
      let body: any = { query, category: categoryToUse };

      if (query === "" && categoryToUse) {
        endpoint = "/api/products/page";
        body = { page: 1, perPage: 10, category: categoryToUse };
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Search request failed");
      }

      const data = await response.json();

      if (endpoint.includes("page")) {
        setProducts(data.products || []);
        setIsFiltered(true); // Treat category filter as a "filtered" state
        setCurrentPage(2);
        setHasMore(data.hasMore);
        setTotalProducts(data.total);
      } else {
        setProducts(data.products || []);
        setIsFiltered(true);
        setCurrentPage(2);
        setHasMore(false); // Search endpoint returns all matches usually, or we need to align behaviors
        setTotalProducts(data.products?.length || 0);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Nepodarilo sa načítať výsledky. Skúste to znova.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore || isFiltered) return;

    setIsLoadingMore(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/products/page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: currentPage,
          perPage: 10,
          category: selectedCategory // Pass selected category for pagination
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to load more products");
      }

      const data: {
        products: ProductStory[];
        total: number;
        hasMore: boolean;
      } = await response.json();

      setProducts((prev) => [...prev, ...(data.products || [])]);
      setCurrentPage((prev) => prev + 1);
      setHasMore(data.hasMore);
      setTotalProducts(data.total);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Nepodarilo sa načítať ďalšie produkty. Skúste to znova."
      );
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Katalóg Produktov
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Prehľadajte našu kompletnú ponuku kvalitných hygienických produktov
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => {
              setSelectedCategory(null);
              // We need to trigger a "search" (fetch) with null category
              handleSearch(undefined, null);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === null
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
          >
            Všetky
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => {
                const newCategory = selectedCategory === category ? null : category;
                setSelectedCategory(newCategory);
                handleSearch(undefined, newCategory);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
            >
              {category.replace(/-/g, " ")}
            </button>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Hľadať produkty..."
                className="block w-full pl-12 pr-32 py-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="absolute inset-y-0 right-0 px-6 py-2 m-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isSearching ? "Hľadám..." : "Hľadať"}
              </button>
            </div>
          </form>
        </div>

        <div className="mb-8 text-center">
          {errorMessage ? (
            <p className="text-red-600 font-medium">{errorMessage}</p>
          ) : (
            <p className="text-gray-600">
              {isFiltered
                ? `Nájdené produkty: ${products.length}`
                : `Zobrazené ${products.length} z ${totalProducts} produktov`}
            </p>
          )}
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const image = product.content.obrazok;
              const categories = product.content.kategoria ?? [];

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 flex flex-col w-full"
                >
                  <div className="relative h-48 w-full ">
                    {image?.filename ? (
                      <img
                        src={image.filename}
                        alt={image.alt || image.title || product.content.meno}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-blue-400 text-sm font-medium">
                        Bez obrázku
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {product.content.meno || "Produkt bez názvu"}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {product.content.popis || "Bez popisu"}
                    </p>
                    {categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {categories.map((category) => (
                          <span
                            key={`${product.id}-${category}`}
                            className="text-xs font-medium px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-4">
              Žiadne produkty neboli nájdené
            </p>
            <p className="text-gray-500">Skúste zmeniť vyhľadávací dotaz</p>
          </div>
        )}

        {!isFiltered && hasMore && products.length > 0 && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLoadingMore ? "Načítavam..." : "Zobrazit viac"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogueSearch;
