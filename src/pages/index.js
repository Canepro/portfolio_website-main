// src/pages/index.js

import Accomplishments from '../components/Accomplishments/Accomplishments';
import BgAnimation from '../components/BackgroundAnimation/BackgroundAnimation';
import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';
import Technologies from '../components/Technologies/Technologies';
import Timeline from '../components/TimeLine/TimeLine';
import { Layout } from '../layout/Layout';
import { Section } from '../styles/GlobalComponents';
// 1. Import the new Certifications component
import Certifications from '../components/Certifications/Certifications';

// ... (keep the Home component and getStaticProps function as they are)
const Home = ({ githubStats }) => {
  return (
    <Layout>
      <Section grid>
        <Hero />
        <BgAnimation />
      </Section>
      <Projects />
      <Technologies />
      <Timeline />
      {/* 2. Add the new Certifications component here */}
      <Certifications />
      <Accomplishments stats={githubStats} />
    </Layout>
  );
};

// This function runs at build time to fetch your live GitHub data
export async function getStaticProps() {
  const userResponse = await fetch('https://api.github.com/users/Canepro');
  const user = await userResponse.json();

  const reposResponse = await fetch('https://api.github.com/users/Canepro/repos');
  const repos = await reposResponse.json();

  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

  return {
    props: {
      githubStats: {
        followers: user.followers,
        stars: totalStars,
        repos: user.public_repos,
      },
    },
    // Re-build the page every 24 hours to keep stats fresh
    revalidate: 86400,
  };
}

export default Home;