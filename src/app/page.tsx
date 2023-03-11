"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Divider from "../assets/divider.png";
import InfoIcon from "../assets/info.png";
import Logo from "../assets/logo.png";

async function getData() {
	const res = await fetch("/api/rss");
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

type Article = {
	title: string;
	content: string;
	thumbnail: string;
};

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
		<main className="min-h-full grid">
			<header className="relative flex justify-center my-8 border-b-2 mx-auto max-w-3xl w-full mb-12">
				<Image src={Logo} alt="" />
				<Image className="absolute top-0 right-0" src={InfoIcon} alt="" />
			</header>
			<main className="grid grid-cols-[2fr_auto_1fr] mx-auto px-8 gap-4">
				<div className="max-w-3xl flex flex-col gap-8">
					<h1 className="text-4xl font-bold mb-12">Recent articles</h1>
					{articles.map((article, i) => {
						return (
							<article className="flex gap-4 h-64" key={i}>
								<img
									className="h-64"
									src={article.thumbnail}
									alt={article.title}
								/>
								<div className="overflow-hidden">
									<h1 className="text-lg font-bold">{article.title}</h1>
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
		</main>
	);
}
