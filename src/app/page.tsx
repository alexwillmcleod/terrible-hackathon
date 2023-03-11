'use client';

import { useState, useEffect } from 'react';

async function getData() {
  const res = await fetch('http://localhost:3000/api/rss');
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default function Page() {
  const [articles, setArticles] = useState<
    {
      title: string;
      content: string;
      thumbnail: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchArticles = async () => {
      setArticles(await getData());
    };
    fetchArticles();
  });

  return (
    <main className="min-h-full grid">
      <header></header>
      <div>
        <a>Things News</a>
      </div>
      <div>
        <ul>
          {articles.map((article, index) => {
            // console.log(article);
            // console.log(typeof article.content);
            return (
              <li key={index}>
                <div>
                  <h1>{article.title}</h1>
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    width="400rem"
                  ></img>
                  <p>{article.content}</p>
                  <br></br>
                  ----
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
