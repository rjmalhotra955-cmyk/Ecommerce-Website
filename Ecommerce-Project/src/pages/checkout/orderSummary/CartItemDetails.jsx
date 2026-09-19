import { formatMoney } from "../../../utils/money";
import axios from "axios";
import { useState } from "react";

export function CartItemDetails({ cartItem, loadCart }) {
  const [isEditingQuantity, setIsEditingQuantity] = useState(false);
  const [newQuantity, setNewQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);

    await loadCart();
  };

  const updateCartItem = () => {
    setNewQuantity(cartItem.quantity);
    setIsEditingQuantity(true);
  };

  const saveQuantity = async () => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity: Number(newQuantity),
    });
    setIsEditingQuantity(false);
    await loadCart();
  };

  const cancelQuantity = () => {
    setIsEditingQuantity(false);
  };

  const handleQuantityKeyDown = (e) => {
    if (e.key === "Enter") {
      saveQuantity();
    } else if (e.key === "Tab") {
      cancelQuantity();
    }
  };

  return (
    <div className="cart-item-details">
      <div className="product-name">{cartItem.product.name}</div>
      <div className="product-price">
        {formatMoney(cartItem.product.priceCents)}
      </div>
      <div className="product-quantity">
        {isEditingQuantity ? (
          <input
            type="number"
            min="1"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            onKeyDown={handleQuantityKeyDown}
          />
        ) : (
          <span>
            Quantity:{" "}
            <span className="quantity-label">{cartItem.quantity}</span>
          </span>
        )}

        {isEditingQuantity ? (
          <span
            className="save-quantity-link link-primary"
            onClick={saveQuantity}
          >
            Save
          </span>
        ) : (
          <span
            className="update-quantity-link link-primary"
            onClick={updateCartItem}
          >
            Update
          </span>
        )}
        <span
          className="delete-quantity-link link-primary"
          onClick={deleteCartItem}
        >
          Delete
        </span>
      </div>
    </div>
  );
}
