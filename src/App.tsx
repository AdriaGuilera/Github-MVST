import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { UserProfile } from './components/UserProfile';
import { RepoList } from './components/RepoList';
import type { GitHubUser, GitHubRepo } from './types';
import { Github } from 'lucide-react'

function App() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [start, setStart] = useState(true);

  const fetchUserData = async (username: string) => {
    setLoading(true);
    setStart(false);
    setError('');
    try {
      const [userResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
      ]);

      if (!userResponse.ok || !reposResponse.ok) {
        throw new Error('User not found');
      }

      const userData = await userResponse.json();
      const reposData = await reposResponse.json();

      setUser(userData);
      setRepos(reposData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setUser(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };
  const resetscreen = () => {
    setStart(true);
    setUser(null);
    setRepos([]);
    setError('');
    setLoading(false);
    setFilter('');
    setLanguageFilter('');
  }

  const languages = [...new Set(repos.map(repo => repo.language).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 border-b-gray-700 py-4 mb-8">
        <div className="container mx-auto px-4" onClick={resetscreen}>
          <div className="flex flex-row gap-1 items-center">
            <Github className="text-blue-100 h-8 w-8" />
            <h1 className="text-2xl font-bold text-blue-100">GitHub Profile Viewer</h1>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <SearchBar onSearch={fetchUserData} />

          {start && (
            <div className='text-center mt-40'>
              <p className='text-sm text-gray-400'> Task given on MVST interview for full stack developer</p>
            </div>
          )}

          {loading && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-100"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded">
              {error}
            </div>
          )}

          {user && (
            <>
              <UserProfile user={user} />
              
              <div className="w-full max-w-5xl space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <input
                    type="text"
                    placeholder="Find a repository..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg 
                             text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 
                             focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  <select
                    value={languageFilter}
                    onChange={(e) => setLanguageFilter(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg 
                             text-gray-100 focus:outline-none focus:ring-2 
                             focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All languages</option>
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <RepoList
                  repos={repos}
                  filter={filter}
                  languageFilter={languageFilter}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <footer>
        <div className="container mx-auto px-4 py-8 text-center text-gray-400">
          <p>Created by <a href="
      </footer>
    </div>

  );
}

export default App;