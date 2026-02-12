import { formatEther } from "viem";
import { HiOutlineTrash } from "react-icons/hi";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="flex items-center gap-4 border-b border-ink/10 py-4">


      {/* Thumbnail */}
      <img
        src={item.image}
        alt={item.name}
        className="h-16 w-16 rounded-lg object-cover bg-ink/5"
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium">
          {item.name}
        </p>
        <p className="text-xs text-ink/50">
          {item.slug}
        </p>
      </div>
      <div className="flex flex-col items-end">
        {/* Qty controls */}
        <div className="flex items-center rounded-lg border border-ink/20">
          <button
            onClick={onDecrease}
            className="px-2 py-1 text-sm hover:bg-ink/5"
          >
            −
          </button>

          <span className="px-2 text-center text-sm">
            {item.qty > 99 ? "99+" : item.qty}
          </span>

          <button
            onClick={onIncrease}
            className="px-2 py-1 text-sm hover:bg-ink/5"
          >
            +
          </button>
        </div>

        {/* Line price */}
        <span className=" text-right text-sm font-medium">
          {formatEther((item.price * item.qty))} {item.currency}
        </span>


      </div>

      {/* Remove */}
      <button
        onClick={onRemove}
        className="ml-2 text-ink/40 hover:text-burgundy transition cursor-pointer"
        aria-label="Remove item"
      >

        <HiOutlineTrash size={20} className="text-rose-500" />
      </button>
    </div>
  );
}

export default CartItem;
