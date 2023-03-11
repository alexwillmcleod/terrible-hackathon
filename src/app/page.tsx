"use client";

import { Article } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Divider from "../assets/divider.png";
import Scribble1 from "../assets/scribble1.png";
import Scribble2 from "../assets/scribble2.png";
import Scribble3 from "../assets/scribble3.png";
import TerribleHack from "../assets/terribleHack.png";

async function getData() {
	const res = await fetch("/api/rss");
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

const scribbles = [Scribble1, Scribble2, Scribble3];

export default function Page() {
	const [articles, setArticles] = useState<Article[]>([]);

	useEffect(() => {
		const fetchArticles = async () => {
			const data = (await getData()) as Article[];
			setArticles(
				data.map((article) => ({
					...article,
					content: article.content.slice(0, 250) + "...",
				}))
			);
		};
		fetchArticles();
	}, []);

	return (
		<main className="grid lg:grid-cols-[2fr_auto_1fr] mx-auto px-8 gap-4 max-w-7xl pb-36">
			<div className="max-w-3xl flex flex-col gap-16">
				<h1 className="text-4xl font-bold">Recent articles</h1>
				{articles.map((article, i) => {
					const scribble = scribbles[i % scribbles.length];

					return (
						<Link key={i} href={`/article/${article.id}`}>
							<article className="flex gap-4 group">
								<img
									className="h-64 clip-cartoon"
									src={article.thumbnail}
									alt={article.title}
									loading="lazy"
								/>
								<div className="relative h-full flex flex-col">
									<Image
										src={scribble}
										alt=""
										className="absolute inset-0 h-full w-full transition-transform group-hover:scale-110 group-hover:rotate-3 -z-10 -translate-y-6 pointer-events-none"
									/>
									<h1 className="text-lg font-bold mb-2">{article.title}</h1>
									<p className="whitespace-normal">{article.content}</p>
									<span className="ml-auto mt-auto text-blue-400">
										Read more
									</span>
								</div>
							</article>
						</Link>
					);
				})}
			</div>
			<Image src={Divider} alt="" className="h-full hidden lg:block" />
			<aside className=" hidden lg:block">
				<div className="sticky top-8 mb-auto">
					<Image src={TerribleHack} alt="" />
					<h3 className="text-2xl text-bold text-center">
						Join us at Terrible Hackathon!
					</h3>
				</div>
			</aside>
		</main>
	);
}
