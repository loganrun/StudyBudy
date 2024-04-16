import dotenv from 'dotenv';

dotenv.config();


export default async function getSummarization(data){
    const response = await fetch(
		"https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
		{
			headers: { Authorization: `Bearer ${process.env.Hugging_Face}` },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return JSON.stringify(result);
}

