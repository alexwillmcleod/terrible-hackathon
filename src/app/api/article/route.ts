import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
	// get the id from the request
	const searchId = request.nextUrl.searchParams.get("id");

	const id = parseInt(searchId || "");

	if (isNaN(id)) {
		console.log("Invalid id");

		return new Response("Invalid id", {
			status: 400,
		});
	}

	console.log(id);

	const article = await prisma.article.findUnique({
		where: {
			id: id,
		},
	});
	return new Response(JSON.stringify(article));
}
