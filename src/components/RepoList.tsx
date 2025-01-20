import React from 'react';
import { Star, GitFork } from 'lucide-react';
import type { GitHubRepo } from '../utils/types';
import { clsx } from 'clsx';
import { languageColors } from '../constants/languageColors';

/**
 * Props interface for the RepoList component
 * @interface
 * @property {GitHubRepo[]} repos - Array of GitHub repositories to display
 * @property {string} filter - Text string to filter repositories by name
 * @property {string} languageFilter - Programming language to filter repositories by
 */
interface RepoListProps {
  repos: GitHubRepo[];
  filter: string;
  languageFilter: string;
}



/**
 * Component that displays a list of GitHub repositories with filtering capabilities
 * @component
 * @param {RepoListProps} props - The props for the RepoList component
 * @returns {JSX.Element} A list of repository cards with repository information
 */
export function RepoList({ repos, filter, languageFilter }: RepoListProps) {
  const filteredRepos = repos.filter(repo => {
    const nameMatch = repo.name.toLowerCase().includes(filter.toLowerCase());
    const languageMatch = !languageFilter || repo.language === languageFilter;
    return nameMatch && languageMatch;
  });

  /**
   * Formats a date string into a localized date format
   * @param {string} dateString - ISO date string to format
   * @returns {string} Formatted date string
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric', 
    });
  };

  return (
    <div className="w-full max-w-5xl space-y-4">
      {/* Iterate through the map of repositories that fit in the filtering criteria */}
      {filteredRepos.map(repo => (
        <div key={repo.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                 className="text-xl font-semibold text-blue-400 hover:underline">
                {repo.name}
              </a>
              <p className="text-gray-400 mt-2">{repo.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
            {repo.language && (
              <div className="flex items-center gap-1">
                <span className={clsx(
                  'w-3 h-3 rounded-full',
                  languageColors[repo.language] || 'bg-gray-400'
                )} />
                <span>{repo.language}</span>
              </div>
            )}
            
            {repo.stars > 0 && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>{repo.stars}</span>
              </div>
            )}
            
            {repo.forks_count > 0 && (
              <div className="flex items-center gap-1">
                <GitFork className="h-4 w-4" />
                <span>{repo.forks_count}</span>
              </div>
            )}
            
            <span>Updated on {formatDate(repo.updated_at)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}