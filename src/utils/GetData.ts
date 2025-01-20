import type { GitHubUser, GitHubRepo } from './types';
import axios from 'axios';

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

/**
 * Fetches both user data and repositories for a given GitHub username using GraphQL API
 * @param {string} username - The GitHub username to fetch data for
 * @returns {user: GitHubUser; repos: GitHubRepo[]}>} Object containing user data and repositories
 * @throws {Error} When API request fails or user is not found
 */
export async function fetchGitHubData(username: string): Promise<{ user: GitHubUser; repos: GitHubRepo[] }> {
    try {
        const query = `
            query($username: String!) {
                user(login: $username) {
                    login
                    name
                    bio
                    avatarUrl
                    followers {
                        totalCount
                    }
                    following {
                        totalCount
                    }
                    repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
                        nodes {
                            name
                            description
                            url
                            stargazerCount
                            forkCount
                            primaryLanguage {
                                name
                            }
                            updatedAt
                        }
                    }
                }
            }
        `;

        const response = await axios.post(
            GITHUB_GRAPHQL_URL,
            { query, variables: { username } },
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_KEY}`,
                }
            }
        );

        if (response.data.errors) {
            const error = response.data.errors[0];
            if (error.type === 'NOT_FOUND') {
                throw new Error('User not found');
            }
            throw new Error(`GitHub API Error: ${error.message}`);
        }

        const userData = response.data.data.user;
        
        const user: GitHubUser = {
            login: userData.login,
            name: userData.name,
            bio: userData.bio,
            avatar_url: userData.avatarUrl,
            followers: userData.followers.totalCount,
            following: userData.following.totalCount,
            public_repos: userData.repositories.nodes.length,
            location: userData.location,
            company: userData.company
        };

        const repos: GitHubRepo[] = userData.repositories.nodes.map((repo: any) => ({
            name: repo.name,
            description: repo.description,
            html_url: repo.url,
            stars: repo.stargazerCount,
            forks_count: repo.forkCount,
            language: repo.primaryLanguage?.name || null,
            updated_at: repo.updatedAt
        }));

        return { user, repos };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`GitHub API Error: ${error.response?.data.message || error.message}`);
        }
        throw error;
    }
}