"use client";

import { Article } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
	const { id } = params;
	const [article, setArticle] = useState<Article | null>(null);

	useEffect(() => {
		const fetchArticle = async () => {
			const res = await fetch(`/api/article?id=${id}`);
			if (!res.ok) {
				// This will activate the closest `error.js` Error Boundary
				throw new Error("Failed to fetch data");
			}

			setArticle(await res.json());
		};
		fetchArticle();
	}, [id]);

	if (!article) {
		return <div>Loading...</div>;
	}

	const date = new Date(article.pubDate);

	return (
		<main>
			<section className="flex flex-col items-center text-center mb-12 after:h-screen after:w-full after:absolute after:bg-yellow-100 after:top-0 after:left-0 after:-z-10">
				<time className="text-gray-500 text-3xl mb-2">
					{new Intl.DateTimeFormat("en-US").format(date)}
				</time>
				<h1 className=" text-6xl text-bold max-w-7xl mb-12 px-12">
					{article.title}
				</h1>
				<img className="h-full" src={article.thumbnail} alt="" loading="lazy" />
			</section>
			<article className="max-w-3xl mx-auto text-lg leading-relaxed pb-36 px-8">
				<p className="whitespace-pre-line">{article.content}</p>
			</article>
		</main>
	);
}
