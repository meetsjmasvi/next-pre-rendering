function ArticlesByCategory({ articles, category }) {
  return (
    <>
      <h1>List of articles by Category: {category}</h1>
      {articles.map((article) => {
        return (
          <>
            <p key={article.id}>
              {article.id} - {article.title}
            </p>
            <p>{article.description}</p>
          </>
        );
      })}
    </>
  );
}

export default ArticlesByCategory;

export async function getServerSideProps(context) {
  const {
    params: { category },
  } = context;

  const response = await fetch(
    `http://localhost:4000/news?category=${category}`
  );
  const data = await response.json();

  return {
    props: {
      articles: data,
      category,
    },
  };
}
