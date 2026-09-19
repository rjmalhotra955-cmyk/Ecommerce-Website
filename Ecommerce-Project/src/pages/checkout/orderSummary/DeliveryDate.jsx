import dayjs from "dayjs";

export function DeliveryDate({ selectedDeliveryOption }) {
  if (!selectedDeliveryOption) {
    return null; // or a fallback like "Select a delivery option"
  }
  return (
    <div className="delivery-date">
      Delivery date:{" "}
      {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
        "dddd,MMMM D",
      )}
    </div>
  );
}
