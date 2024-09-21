"use server"
import React from 'react';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

interface Result {
    url: string;
    content: string;
}

console.log("api key", process.env.OPENAI_API_KEY)

const TrackPets: React.FC = () => {
    const results : Result[] = [];


    const fetchPets = async () => {
        const urls = [
            "https://h6tgmhtrk6y53ttb.public.blob.vercel-storage.com/Snap_20240921-113648-0-KYo4nniZTgBpvfNMaWiyntFz0qjKdT.jpg",
            "https://h6tgmhtrk6y53ttb.public.blob.vercel-storage.com/Snap_20240921-120317-0-3AeFQgkuSjl05BD0iKU35pyNJEG7yp.jpg",
            "https://h6tgmhtrk6y53ttb.public.blob.vercel-storage.com/Snap_20240921-130945-0-R5XnydHCwLNBALus0YBO9PLyTZJD6k.jpg",
            "https://h6tgmhtrk6y53ttb.public.blob.vercel-storage.com/Snap_20240921-131149-2-vDpm9h6LHnQV460oS4R2uPY5Nbr8NJ.jpg",
            "https://h6tgmhtrk6y53ttb.public.blob.vercel-storage.com/Snap_20240921-141439-2-5Qt8ZzaBlydCroE6zvDiUxp8rx6Vzx.jpg",
        ];
        const results: Result[] = [];

        for (const url of urls) {
            try {
                const response = await fetch('https://api.red-pill.ai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: 'gpt-4o-mini',
                        messages: [
                            {
                                role: 'user',
                                content: [
                                    {
                                        type: 'text',
                                        text: 'in this image this is a security camera image, pointing down the floor is gray, to the left there are recipients for cats to drink and to the right there are automatic feeders for dry food, the white cat with black pattern is called wasabi, the blackcat with white paws is chiqui, the white cat with black tail is princesa, the yellow cat with 2 ears is pedro, the yellow cat with 1 ear is angel he is also fat, the gray cat is garfito. can you tell me if she is drinking or eating based on this image, if theyre closer to the left they are drinking and if theyre closer to the feeding recipients to the right they are eating, can you only respond with 1 sentence just cat name, action and timestamp',
                                    },
                                    {
                                        type: 'image_url',
                                        image_url: {
                                            url: url,
                                        },
                                    },
                                ],
                            },
                        ],
                        max_tokens: 300,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const content = data.choices[0].message.content;
                console.log('content', content);
                results.push({ url, content });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                console.log('finally');
            }
        }
        console.log('results', results);
        // Update the state with the results
    };

    return (
        <div>
            {results.map((result: any, index: any) => (
                <div key={index}>
                    <img src={result.url} alt="pet" />
                    <p>{result.content}</p>
                </div>
            ))}
        </div>
    );
};

export default TrackPets;