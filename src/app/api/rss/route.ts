import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const articles = await prisma.article.findMany();
  return new Response(JSON.stringify(articles));
}
