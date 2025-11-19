import { GoogleGenAI, Type } from "@google/genai";
import type { ChatMessage, User, Post } from '../types';

// Per instructions, API key must come from process.env.API_KEY
// Assuming process.env.API_KEY is available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// FIX: Removed non-standard 'required' property and added 'propertyOrdering' for better schema definition.
const chatHistorySchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            id: { type: Type.STRING },
            text: { type: Type.STRING },
            sender: { type: Type.STRING, description: "The user's ID or 'me'." },
            timestamp: { type: Type.STRING, description: "e.g., '10:30 PM'" },
        },
        propertyOrdering: ['id', 'text', 'sender', 'timestamp'],
    },
};

export const generateChatHistory = async (contactUser: User): Promise<ChatMessage[]> => {
    try {
        const prompt = `You are a helpful assistant on Xelar, a social platform for academics. Generate a short, friendly, and plausible chat history of 5 messages between me (the user) and ${contactUser.name} (${contactUser.handle}), who is a ${contactUser.role}. The conversation should be about a topic relevant to academia, like a recent publication, a conference, or a shared research interest. My user ID is 'me' and their user ID is '${contactUser.id}'. Alternate speakers.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: chatHistorySchema,
            },
        });

        const jsonString = response.text.trim();
        const history = JSON.parse(jsonString) as ChatMessage[];
        return history.map(msg => ({...msg, sender: msg.sender === contactUser.id.toString() ? contactUser.id : 'me' }));
    } catch (error) {
        console.error("Error generating chat history:", error);
        // Fallback to mock data on error
        return [
            { id: '1', text: `Hi ${contactUser.name}, loved your latest paper on quantum computing!`, sender: 'me', timestamp: '10:30 PM' },
            { id: '2', text: 'Thank you! I am glad you enjoyed it.', sender: contactUser.id, timestamp: '10:31 PM' },
            { id: '3', text: 'I had a question about the methodology on page 5, are you free for a quick chat sometime this week?', sender: 'me', timestamp: '10:32 PM' },
        ];
    }
};


export const generatePostSuggestion = async (topic: string): Promise<string> => {
    try {
        const prompt = `Write a short, engaging social media post for an academic platform called Xelar about the following topic: "${topic}". The post should be concise and spark discussion. Maximum 280 characters.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating post suggestion:", error);
        return "Could not generate a suggestion at this time.";
    }
};

// FIX: Added 'propertyOrdering' to all object schemas for better definition and consistency.
const searchSchema = {
    type: Type.OBJECT,
    properties: {
        users: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    handle: { type: Type.STRING },
                    avatarUrl: { type: Type.STRING },
                    role: { type: Type.STRING },
                    bio: { type: Type.STRING },
                },
                propertyOrdering: ["id", "name", "handle", "avatarUrl", "role", "bio"],
            },
        },
        posts: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    content: { type: Type.STRING },
                    imageUrl: { type: Type.STRING },
                    author: {
                        type: Type.OBJECT,
                        properties: {
                             id: { type: Type.STRING },
                             name: { type: Type.STRING },
                             handle: { type: Type.STRING },
                             avatarUrl: { type: Type.STRING },
                             role: { type: Type.STRING },
                        },
                        propertyOrdering: ["id", "name", "handle", "avatarUrl", "role"],
                    },
                    timestamp: { type: Type.STRING },
                },
                propertyOrdering: ["id", "content", "imageUrl", "author", "timestamp"],
            }
        }
    },
    propertyOrdering: ["users", "posts"],
};

export const searchXelar = async (query: string): Promise<{ users: Partial<User>[], posts: Partial<Post>[] }> => {
    try {
        const prompt = `You are a search engine for Xelar, a social platform for academics. A user has searched for "${query}". Provide a list of 3 fictional but plausible user profiles and 3 fictional but plausible posts that match this query. Provide realistic-looking data.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: searchSchema,
            },
        });

        const jsonString = response.text.trim();
        const searchResults = JSON.parse(jsonString);

        return {
            users: searchResults.users || [],
            posts: searchResults.posts || [],
        };

    } catch (error) {
        console.error("Error during search:", error);
        return { users: [], posts: [] };
    }
}