/**
 * Interface representing a GitHub user's profile information
 * @interface
 * @property {string} login - The user's GitHub username
 * @property {string} avatar_url - URL to the user's profile picture
 * @property {string} name - The user's full name
 * @property {string} bio - The user's biography
 * @property {number} followers - Number of followers
 * @property {number} following - Number of users being followed
 * @property {number} public_repos - Number of public repositories
 * @property {string} location - User's geographical location
 * @property {string} company - User's company or organization
 */
export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  location: string;
  company: string;
}

/**
 * Interface representing a GitHub repository
 * @interface
 * @property {number} id - Unique identifier for the repository
 * @property {string} name - Name of the repository
 * @property {string} description - Repository description
 * @property {string} language - Primary programming language used
 * @property {number} stars - Number of stars
 * @property {number} forks_count - Number of forks
 * @property {string} html_url - URL to the repository on GitHub
 * @property {string} updated_at - Last update timestamp
 * @property {string} visibility - Repository visibility status (public/private)
 */
export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks_count: number;
  html_url: string;
  updated_at: string;
  visibility: string;
}