"use client";
import { useSelector } from "react-redux";
import SharedBasketIcon from "../../Shared/SharedBasketIcon/SharedBasketIcon";

const LabIcon = ({params}) => {
  const carts = useSelector((store) => store.cart.items_checkup);
  const tests = useSelector((store) => store.test.items_tests);

  const totalQuantityInCart =
    (tests?.reduce((acc, item) => acc + (Number(item?.quantity) || 0), 0) ||
      0) +
    (carts?.reduce((acc, item) => acc + (Number(item?.quantity) || 0), 0) || 0);

  return (
    <>
      {totalQuantityInCart > 0 && (
        <SharedBasketIcon
          totalQuantityInCart={totalQuantityInCart}
          params={params}
        />
      )}
    </>
  );
};

export default LabIcon;
