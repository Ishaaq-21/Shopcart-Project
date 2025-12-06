import Container from "@/components/common/Container";
import { urlFor } from "@/sanity/lib/image";
import { getProductBySlug } from "@/sanity/queries";
import Image from "next/image";
import React, { ReactNode } from "react";
import { Product } from "../../../../../sanity.types";
import Title from "@/components/atoms/Title";
import StartsReview from "@/components/atoms/StartsReview";
import AddToCartBtn from "@/components/atoms/cart/AddToCartBtn";
import AddToWishlistBtn from "@/components/atoms/wishList/AddToWishlistBtn";
import ProductChars from "@/components/ui/customUI/ProductChars";
import {
  CircleQuestionMark,
  Share2,
  SkipBack,
  Square,
  Truck,
} from "lucide-react";
import ProductTabs from "@/components/ui/customUI/ProductTabs";

const subInfo: { icon: ReactNode; info: string }[] = [
  {
    icon: <Square size={25} />,
    info: "Compare Color",
  },
  {
    icon: <CircleQuestionMark size={25} />,
    info: "Ask a question",
  },
  {
    icon: <Truck size={25} />,
    info: "Delivery & Return",
  },
  {
    icon: <Share2 size={25} />,
    info: "Share",
  },
];

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const product: Product = await getProductBySlug(slug);
  return (
    <div className="py-10">
      <Container className="">
        {product && (
          <div className="flex flex-col md:flex-row items-center gap-10 w-full">
            {product.images && (
              <div className="image relative w-full sm:w-3/4 md:w-full flex-2 min-h-96 border border-black/20 rounded-lg md:self-start">
                <Image
                  src={urlFor(product.images[0]).url()}
                  alt={`${product.name} image`}
                  fill={true}
                />
              </div>
            )}

            {/* Title and description */}
            <div className="text-info flex-3 w-full">
              <div className="border-b border-black/10 pb-6">
                <Title>{product.name}</Title>
                <p className="text-gray-500 my-3 text-sm font-semibold tracking-wider">
                  {product.description}
                </p>
                <StartsReview fillAll={true} />
              </div>

              {/* Price and In stock */}
              <div className="border-b border-black/10 py-6">
                <p className="font-bold text-xl mr-2 tracking-widest">
                  ${product.price}{" "}
                  <del className="text-gray-500 ml-1">
                    {product.price?.toFixed(3) &&
                      product.discount &&
                      (
                        product.price +
                        (product.discount * product.price) / 100
                      ).toFixed(2)}
                  </del>
                </p>

                <p
                  className={`px-4 py-1.5 mt-3 text-sm text-center inline-block font-semibold rounded-lg ${product?.stock === 0 ? "bg-red-100 text-red-600" : "text-shop-orange bg-shop-primary/20"}`}
                >
                  {(product?.stock as number) > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>

              <div className="border-b border-black/10 py-6 flex gap-5 items-center">
                <AddToCartBtn
                  product={product}
                  className="w-full flex-center !mt-0 "
                />
                <AddToWishlistBtn
                  product={product}
                  className="rounded-md p-2"
                  iconSize={15}
                />
              </div>

              {/* Product Characteristics */}
              <ProductChars product={product} />

              {/* Sub Infos */}
              <div className="border-b border-black/10 py-6 flex-between gap-5 items-center">
                {subInfo.map((info) => (
                  <div key={info.info} className="flex gap-2">
                    {info.icon}
                    <span className="text-gray-500 text font-semibold">
                      {info.info}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border border-black/20  gap-5 ">
                <div className="flex items-center gap-5 border-b border-black/20 p-5">
                  <Truck size={35} color="#f59e0b" />
                  <div>
                    <h3 className="font-semibold">Free Delivery</h3>
                    <p className="text-gray-500 underline ">
                      Enter your Postal code for Delivey Availability.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-5  p-5">
                  <SkipBack size={35} color="#f59e0b" />
                  <div>
                    <h3 className="font-semibold">Return Delivery</h3>
                    <p className="text-gray-500">
                      Free 30days Delivery Returns.{" "}
                      <span className="underline">Details</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <ProductTabs />
      </Container>
    </div>
  );
};

export default ProductPage;
