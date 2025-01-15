import fakeEnv from './fakeEnv';

const debug = true;
export default function TrueEnv() {
    if(!debug){
        const GH_KEY = process.env.REACT_APP_GITHUB_KEY;
        return {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${GH_KEY}`,
            'X-GitHub-Api-Version': '2022-11-28',
        }
        };
    }
    else{
        return fakeEnv();
    }
  }