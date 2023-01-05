import Link from "next/link";

const CustomLink = (props) => <Link prefetch={false} {...props} />;

function ProductList({ products }) {
  const handleMouseOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h1>List of Products</h1>
      <div>
        {products.map((product) => {
          const href = `products/${product.id}`;
          return (
            <div key={product.id}>
              <CustomLink onMouseOver={handleMouseOver} href={href}>
                <h3>
                  {product.id} {product.title}
                </h3>
              </CustomLink>
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ProductList;

export async function getStaticProps() {
  const response = await fetch("http://localhost:4000/products");
  const data = await response.json();

  return {
    props: {
      products: data,
    },
  };
}
