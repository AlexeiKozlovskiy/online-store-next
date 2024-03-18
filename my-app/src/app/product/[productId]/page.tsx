export default function Product({ params }: { params: { productId: string } }) {
  return <div>Product {params.productId}</div>;
}
