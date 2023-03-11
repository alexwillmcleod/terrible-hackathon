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
  }[];
  let item = articles[Math.floor(Math.random() * articles.length)];
  const first5 = articles.slice(0, 5);

  return (
    <main className="min-h-full grid bg-red-500">
      <header></header>
      <div>
        <a>Here is several news</a>
      </div>
      <div>
        {first5.map((article) => (
          <div>
            <div>title: {article.title}</div>
            <div>content: {article.content}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
