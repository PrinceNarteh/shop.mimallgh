export default function (items: any[]) {
  return items.reduce(
    (amt, curItem) => amt + curItem.price * curItem.quantity,
    0
  );
}
