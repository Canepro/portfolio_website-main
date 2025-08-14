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
import SEO from '../components/SEO/SEO';
import { personStructuredData, websiteStructuredData } from '../lib/structuredData';

// ... (keep the Home component and getStaticProps function as they are)
const Home = ({ githubStats }) => {
  const combinedStructuredData = [personStructuredData, websiteStructuredData];

  return (
    <>
      <SEO
        title="Vincent Mogah - DevOps Engineer & Frontend Developer"
        description="Professional portfolio of Vincent Mogah, a multifaceted DevOps Engineer, Cloud Architect, and Frontend Developer specializing in Microsoft Azure, AWS, and React.js development."
        canonical="https://portfolio.canepro.me"
        structuredData={combinedStructuredData}
      />
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
    </>
  );
};

// This function runs at build time to fetch your live GitHub data with resiliency
export async function getStaticProps() {
  try {
    const headers = process.env.GITHUB_TOKEN
      ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
      : undefined;

    const [userResponse, reposResponse] = await Promise.all([
      fetch('https://api.github.com/users/Canepro', { headers }),
      fetch('https://api.github.com/users/Canepro/repos?per_page=100', { headers }),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error('GitHub API responded with a non-200 status');
    }

    const [user, repos] = await Promise.all([
      userResponse.json(),
      reposResponse.json(),
    ]);

    const totalStars = Array.isArray(repos)
      ? repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)
      : 0;

    return {
      props: {
        githubStats: {
          followers: user.followers || 0,
          stars: totalStars,
          repos: user.public_repos || 0,
        },
      },
      revalidate: 86400,
    };
  } catch (error) {
    return {
      props: {
        githubStats: {
          followers: 0,
          stars: 0,
          repos: 0,
        },
      },
      revalidate: 86400,
    };
  }
}

export default Home;