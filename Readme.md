# GitHub Repository Explorer

This project was developed as part of the MVST interview process for a Full Stack Developer position. It provides a clean and efficient interface to search and explore GitHub users and their repositories.

🔗 [Live Demo](https://github-mvst-21b43fc3bf42.herokuapp.com/)

## Features

- 🔍 Search for any GitHub user
- 👤 View user profile information
- 📚 Browse through user repositories
- 🏷️ Filter repositories by name
- 💻 Filter repositories by programming language
- 🎨 Clean and responsive UI
- ⚡ Real-time updates using GitHub's GraphQL API

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- GitHub GraphQL API

- Heroku (Deployment)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Github-MVST.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your GitHub token:
```
VITE_GITHUB_KEY=your_github_token
```

4. Start the development server:
```bash
npm run dev
```

## Environment Variables

- `VITE_GITHUB_KEY`: GitHub Personal Access Token (required for API access)

## API Usage

This project uses GitHub's GraphQL API to fetch:
- User profile information
- Repository data
- Programming languages
- Repository statistics
