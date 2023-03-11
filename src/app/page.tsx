"use client";

import { Article } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Divider from "../assets/divider.png";

async function getData() {
	const res = await fetch("/api/rss");
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

export default function Page() {
	const [articles, setArticles] = useState<Article[]>([]);

	useEffect(() => {
		const fetchArticles = async () => {
			const data = (await getData()) as Article[];
			setArticles(
				data.map((article) => ({
					...article,
					content: article.content.slice(0, 100) + "...",
				}))
			);
		};
		fetchArticles();
	}, []);

	return (
		<main className="grid grid-cols-[2fr_auto_1fr] mx-auto px-8 gap-4 max-w-7xl pb-36">
			<div className="max-w-3xl flex flex-col gap-8">
				<h1 className="text-4xl font-bold mb-12">Recent articles</h1>
				{articles.map((article, i) => {
					return (
						<article className="flex gap-4 h-64" key={i}>
							<img
								className="h-64"
								src={article.thumbnail}
								alt={article.title}
								loading="lazy"
							/>
							<div className="overflow-hidden">
								<Link href={`/article/${article.id}`}>
									<h1 className="text-lg font-bold">{article.title}</h1>
								</Link>
								<p className="whitespace-normal">{article.content}</p>
							</div>
						</article>
					);
				})}
			</div>
			<Image src={Divider} alt="" className="h-full" />
			<aside className="bg-red-300">
				<h1>Aside</h1>
			</aside>
		</main>
	);
}
