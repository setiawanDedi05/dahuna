import { motion } from "framer-motion";
import { CartContent } from "./CartContent";
import { Cart } from "@/@types";

const variants = {
  close: { y: 0, opacity: 0 },
  open: { y: 10, opacity: 1 },
};

type CartProps = {
  show: boolean;
  setShow: (value: boolean) => void;
  data: Cart[];
};

export function CartComponent({ show, setShow, data }: CartProps) {
  return (
    <motion.div
      key="chart"
      initial={"close"}
      animate={show ? "open" : "close"}
      variants={variants}
      className="w-[500px] h-auto shadow-lg rounded-sm absolute right-5 top-16 z-20 border bg-primary-foreground p-5"
    >
      <CartContent data={data!} setShow={setShow} />
    </motion.div>
  );
}
