import Link from "next/link";

const CustomLink = (props) => <Link prefetch={false} {...props} />;

function PostList({ posts }) {
  const handleMouseOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h1>List of Posts</h1>
      <div>
        {posts.map((post) => {
          const href = `posts/${post.id}`;
          return (
            <div key={post.id}>
              <CustomLink onMouseOver={handleMouseOver} href={href}>
                <h3>
                  {post.id} {post.title}
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

export default PostList;

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  return {
    props: {
      posts: posts,
    },
  };
}
