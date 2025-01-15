
export default function TrueEnv() {
    const GH_KEY = import.meta.env.VITE_GITHUB_KEY;
    return {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${GH_KEY}`,
        'X-GitHub-Api-Version': '2022-11-28',
    }
    };
}