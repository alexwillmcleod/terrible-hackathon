import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
	const articles = await prisma.article.findMany();
	return new Response(JSON.stringify(articles));
}
