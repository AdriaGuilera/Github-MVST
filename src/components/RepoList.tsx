import React from 'react';
import { Star, GitFork } from 'lucide-react';
import type { GitHubRepo } from '../types';
import { clsx } from 'clsx';

interface RepoListProps {
  repos: GitHubRepo[];
  filter: string;
  languageFilter: string;
}

const languageColors: Record<string, string> = {
  JavaScript: 'bg-yellow-300',
  TypeScript: 'bg-blue-500',
  Python: 'bg-green-500',
  Java: 'bg-red-500',
  'C++': 'bg-pink-500',
  Ruby: 'bg-red-600',
  PHP: 'bg-purple-500',
  Go: 'bg-cyan-500',
  Rust: 'bg-orange-500',
};

export function RepoList({ repos, filter, languageFilter }: RepoListProps) {
  const filteredRepos = repos.filter(repo => {
    const nameMatch = repo.name.toLowerCase().includes(filter.toLowerCase());
    const languageMatch = !languageFilter || repo.language === languageFilter;
    return nameMatch && languageMatch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full max-w-5xl space-y-4">
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
            
            {repo.stargazers_count > 0 && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>{repo.stargazers_count}</span>
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