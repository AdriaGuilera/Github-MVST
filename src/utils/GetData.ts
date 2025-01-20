
import type { GitHubUser, GitHubRepo } from './types';
import axios from 'axios';

export async function fetchGitHubUserData(
    username: string,
): Promise<GitHubUser> {
    try {
        const headers = {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_KEY}`,
            'X-GitHub-Api-Version': '2022-11-28',
        };

        const response = await axios.get<GitHubUser>(
            `https://api.github.com/users/${username}`,
            { method: `GET`, headers }
        );

        if(response.status == 404) throw new Error(`User not found`)

        return response.data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if(error.status == 404) throw new Error(`User not found`);
            else throw new Error(`GitHub API Error: ${error.response?.data.message || error.message}`);
        }
        throw error;
    }
}

export async function fetchGitHubRepos(
    username: string,
): Promise<GitHubRepo[]> {
    try {
        const headers = {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_KEY}`,
            'X-GitHub-Api-Version': '2022-11-28',
        };

        const response = await axios.get<GitHubRepo[]>(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
            { method: `GET`, headers }
        );

        if(response.status == 404) throw new Error(`User not found`)

        return response.data;
    }
    
    catch (error) {
        if (axios.isAxiosError(error)) {
            if(error.status == 404) throw new Error(`User not found`);
            else throw new Error(`GitHub API Error: ${error.response?.data.message || error.message}`);
        }
        throw error;
    }
}