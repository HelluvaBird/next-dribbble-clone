import Categories from '@/components/Categories';
import LoadMore from '@/components/LoadMore';
import ProjectCard from '@/components/ProjectCard';
import Image from 'next/image';

export default function Home() {
  return (
    <section className="flexStart flex-col paddings mb-16">
      <Categories />
      <section className="projects-frid">
        <ProjectCard />
      </section>
      <LoadMore />
    </section>
  );
}
