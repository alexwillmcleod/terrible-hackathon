import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function GET(request: Request) {
	const textCompletion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: "Greet me in french",
		temperature: 0.6,
	});

  const text = completion.data.choices[0].text;

  const imageGen = await openai.create({

	return new Response(text);
}
