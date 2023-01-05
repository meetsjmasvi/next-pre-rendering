function NewsList({ articles }) {
  return (
    <>
      <h1>News Headings</h1>
      {articles.map((article) => {
        return (
          <>
            <div key={article.id}>
              {article.id} - {article.title} | {article.category}
            </div>
            <hr />
          </>
        );
      })}
    </>
  );
}

export default NewsList;

export async function getServerSideProps() {
  const response = await fetch("http://localhost:4000/news");
  const data = await response.json();

  return {
    props: {
      articles: data,
    },
  };
}
