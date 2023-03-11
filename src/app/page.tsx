async function getData() {
  const res = await fetch('http://localhost:3000/api/rss');
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Page() {
  const articles = (await getData()) as {
    title: string;
    content: string;
    thumbnail: string;
  }[];

  return (
    <main className="min-h-full grid">
      <header></header>
      <div>
        <a>Things News</a>
      </div>
      <div>
        {articles.map((article, index) => (
          <div key={index}>
            <h1>{article.title}</h1>
            <img
              src={article.thumbnail}
              width="400rem"
            ></img>
            <p>{article.content}</p>
            <br></br>
            ----
          </div>
        ))}
      </div>
    </main>
  );
}
