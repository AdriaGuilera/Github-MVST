import React from 'react';
import { MapPin, Building2, Users, User2 } from 'lucide-react';
import type { GitHubUser } from '../utils/types';

/**
 * Props interface for the UserProfile component
 * @interface
 * @property {GitHubUser} user - GitHub user data to display in the profile
 */
interface UserProfileProps {
  user: GitHubUser;
}

/**
 * Component that displays a GitHub user's profile information
 * @component
 * @param {UserProfileProps} props - The props for the UserProfile component
 * @returns {JSX.Element} A card containing the user's profile information including avatar, name, bio, and stats
 */
export function UserProfile(user: GitHubUser) {
  return (
    <div className="w-full max-w-5xl bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="w-32 h-32 rounded-full"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-100">{user.name}</h1>
          <h2 className="text-xl text-gray-400 mb-4">{user.login}</h2>
          {user.bio && <p className="text-gray-300 mb-4">{user.bio}</p>}
          
          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-2 text-gray-300">
              <Users className="h-5 w-5" />
              <span>{user.followers} followers</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <User2 className="h-5 w-5" />
              <span>{user.following} following</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {user.company && (
              <div className="flex items-center gap-2 text-gray-300">
                <Building2 className="h-5 w-5" />
                <span>{user.company}</span>
              </div>
            )}
            {user.location && (
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="h-5 w-5" />
                <a href={`https://www.google.com/maps/search/${user.location}`}>{user.location}</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}