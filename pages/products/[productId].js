import { useRouter } from "next/router";

function Product({ product }) {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  if (router.isFallback) {
    return <h1>Loading....</h1>;
  }

  return (
    <>
      <button onClick={goBack}>Back</button>
      <h3>
        {product.id} {product.title}
      </h3>
      <div>Value: {product.value}</div>
      <div>{product.description}</div>
    </>
  );
}

export default Product;

export async function getStaticPaths() {
  // const response = await fetch(`http://localhost:4000/products`);
  // const posts = await response.json();

  return {
    paths: [
      {
        params: { productId: "1" },
      },
    ],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const response = await fetch(
    `http://localhost:4000/products/${params.productId}`
  );
  const data = await response.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  console.log(`Generating page for /products/${params.productId}`);

  return {
    props: {
      product: data,
    },
    revalidate: 10, // we need to mention the number of seconds to wait to regnerate the page with the server.
  };
}
