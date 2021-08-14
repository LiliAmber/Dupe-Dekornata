export default function priceFormatted(price) {
  return new Intl.NumberFormat("id-IDR", {
    style: "currency",
    currency: "IDR",
  }).format(price);
}
