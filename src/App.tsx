import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { UserProfile } from './components/UserProfile';
import { RepoList } from './components/RepoList';
import { Header } from './components/Header';
import type { GitHubUser, GitHubRepo } from './utils/types';
import { fetchGitHubUserData, fetchGitHubRepos } from './utils/GetData';


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
        fetchGitHubUserData(username),
        fetchGitHubRepos(username)
      ]);

      const userData = await userResponse;
      const reposData = await reposResponse;

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
      <Header onreset ={resetscreen} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <SearchBar onSearch={fetchUserData} />

            {start && (
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
              <p className='text-sm text-gray-400'> Task given on MVST interview for full stack developer open positon</p>
              <p className='text-sm text-gray-400 mt-10'> Type in a GitHub username to see their profile & all their repositories</p>
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
      {start &&
            <footer className="absolute bottom-0 w-full">
                <div className="container mx-auto px-4 py-8 text-center text-gray-400">
                    <p> Made by <a href="https://github.com/AdriaGuilera" className="text-blue-400 hover:underline">Adrià Guilera</a></p>
                </div>
            </footer>
      }
      
    </div>

  );
}

export default App;