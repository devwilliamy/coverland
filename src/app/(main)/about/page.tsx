import AboutPage from '@/components/policy/AboutPage';

export async function generateMetadata() {
  return {
    title: `About – Coverland`,
    description: `Discover our story and mission at Coverland. Learn about our commitment to providing high-quality car covers and seat covers that combine style, durability, and protection. Get to know the team behind the brand.`,
  };
}
function About() {
  return <AboutPage />;
}

export default About;
