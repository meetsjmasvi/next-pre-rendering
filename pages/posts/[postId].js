import { useRouter } from "next/router";

function Post({ post }) {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  // if (router.isFallback) {
  //   return <h1>Loading....</h1>;
  // }

  return (
    <>
      <button onClick={goBack}>Back</button>
      <h3>
        {post.id} {post.title}
      </h3>
      <div>{post.body}</div>
    </>
  );
}

export default Post;

export async function getStaticPaths() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  // const paths = posts.map(post => {
  //   return {
  //     params: { postId: `${post.id}` }
  //   }
  // })

  // this method is mostly useful with fallback: true
  // when you don't want to loadd all the the post at once
  // and load once the user require to see a different page
  // when required
  return {
    paths: [
      {
        params: { postId: "1" },
      },
      {
        params: { postId: "2" },
      },
      {
        params: { postId: "3" },
      },
    ],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const data = await response.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  console.log(`Generating page for /posts/${params.postId}`);

  return {
    props: {
      post: data,
    },
  };
}
