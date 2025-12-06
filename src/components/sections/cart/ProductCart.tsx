import Image from "next/image";
import React from "react";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/types/types";
import IncrementDecrementQuantity from "@/components/atoms/cart/IncrementDecrementQuantity";
import RemoveEntireItem from "@/components/atoms/cart/RemoveEntireItemBtn";
import AddToWishlistBtn from "@/components/atoms/wishList/AddToWishlistBtn";

// I need to fix the layout of this.
const ProductCart = ({ cartItem }: { cartItem: CartItem }) => {
  return (
    <div className="flex flex-col md:flex-row gap-5 bg-white p-5 border-b">
      {cartItem.product.images && (
        <div className="image relative size-44 border p-5">
          <Image
            src={urlFor(cartItem.product.images[0]).url()}
            alt="productImage"
            fill={true}
            loading="lazy"
          />
        </div>
      )}
      <div className="flex flex-col gap-y-10 justify-between items-start self-start flex-1">
        <div className="flex justify-between w-full">
          <div>
            <h3 className="font-semibold text-lg ">{cartItem.product.name}</h3>
            <span className="text-gray-600 block my-3">
              variant :{" "}
              <span className="font-semibold text-black">
                {cartItem.product.variant}
              </span>
            </span>
            <span className="text-gray-600 block">
              Statue :{" "}
              <span className="font-semibold text-black">
                {cartItem.product.status}
              </span>
            </span>
          </div>
          <p className="price font-semibold text-lg">
            $
            {cartItem.product.price &&
              cartItem.product.price * cartItem.quantity}
          </p>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex gap-x-5">
            <AddToWishlistBtn product={cartItem.product} />
            <RemoveEntireItem product={cartItem.product} />
          </div>
          <IncrementDecrementQuantity product={cartItem.product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
