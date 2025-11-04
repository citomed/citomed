import Image from "next/image";
import Link from "next/link";

const SharedBasketIcon = ({ params, totalQuantityInCart }) => {
  return (
    <>
      <Link
        href={`/${params}/sebet`}
        className="bg-[--color-blue] w-[80px] h-[80px] rounded-full border border-[#fff] flex items-center justify-center fixed bottom-6 z-30 right-16"
      >
        <Image width={32} height={32} src={`/basket.svg`} alt="Basket icon" />
        {totalQuantityInCart > 0 && (
          <p className="absolute top-[-1rem] right-[.5rem] bg-[--bg-red] rounded-full text-[#fff] flex items-center justify-center p-[5px] w-[24px] h-[24px] text-[14px]">
            {totalQuantityInCart}
          </p>
        )}
      </Link>
    </>
  );
};

export default SharedBasketIcon;
