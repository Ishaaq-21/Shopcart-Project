"use client";
import React, { useEffect, useState } from "react";
import { Category, Product } from "../../../../sanity.types";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import Loader from "@/components/ui/customUI/Loader";
import NoProductAvailable from "@/components/ui/customUI/NoProductsAvailable";
import ProductCard from "@/components/ui/customUI/ProductCard";

type CategoriesProductsProps = {
  categories: Category[];
  slug: string;
};
const CategoriesProducts = ({ categories, slug }: CategoriesProductsProps) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleCategoryChange = (newSlug: string) => {
    if (currentSlug === newSlug) return;
    setCurrentSlug(newSlug);
    router.push(`${newSlug}`, { scroll: false });
  };

  useEffect(() => {
    const fetchProducts = async (categorySlug: string) => {
      setIsLoading(true);
      try {
        const query = `
          *[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc){
          ...,"categories": categories[]->title}
        `;
        const data = await client.fetch(query, { categorySlug });
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts(currentSlug);
  }, [router]);

  return (
    <div className="flex flex-col md:flex-row gap-10">
      <div className="flex flex-col  flex-1 border border-black/10 max-h-fit">
        {categories?.map((category: Category) => {
          console.log(category.slug?.current);
          return (
            <button
              className={`category-link text-left px-4 py-2.5 text-sm font-semibold  hover-effect ${category.slug?.current === currentSlug ? "bg-shop-orange text-white" : "hover:bg-shop-orange text-black hover:text-white"}`}
              key={category._id}
              onClick={() =>
                handleCategoryChange(category.slug?.current as string)
              }
            >
              {category.title}
            </button>
          );
        })}
      </div>
      <div className="flex-6 bg-amber">
        {isLoading && <Loader />}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 ">
            {products.map((product: Product, index) => (
              <ProductCard
                key={product?._id}
                product={product}
                index={index}
                className="h-full"
              />
            ))}
          </div>
        ) : (
          <NoProductAvailable className="mt-0" />
        )}
      </div>
    </div>
  );
};

export default CategoriesProducts;
