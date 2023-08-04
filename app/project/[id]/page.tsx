import { ProjectInterface } from '@/common.types';
import Modal from '@/components/Modal';
import ProjectActions from '@/components/ProjectActions';
import RelatedProjects from '@/components/RelatedProjects';
import { getProjectDetails } from '@/lib/actions';
import { getCurrentUser } from '@/lib/session';
import Image from 'next/image';
import Link from 'next/link';

export default async function Project({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getCurrentUser();
  const result = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };

  if (!result?.project) {
    return <p className="no-result-text">Failed to fetch project info</p>;
  }

  const projectDetails = result?.project;

  const renderLink = () => `/profile/${projectDetails?.createdBy?.id}`;
  return (
    <Modal>
      <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
        <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
          <Link href={renderLink()}>
            <Image
              src={projectDetails.createdBy.avatarUrl}
              alt=""
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>
          <div className="flex-1 flexStart flex-col gap-1">
            <p className="self-start text-lg font-semibold">
              {projectDetails.title}
            </p>
            <div className="user-info items-center">
              <Link href={renderLink()}>{projectDetails.createdBy.name}</Link>
              <Image
                src="/dot.svg"
                alt=""
                width={0}
                height={0}
                className="w-1 h-1"
              />
              <Link
                href={`/?category=${projectDetails.category}`}
                className="text-primary-purple font-semibold"
              >
                {projectDetails.category}
              </Link>
            </div>
          </div>
        </div>

        {session?.user?.email === projectDetails.createdBy.email ? (
          <div className="flex justify-end items-center gap-2">
            <ProjectActions projectId={projectDetails.id} />
          </div>
        ) : null}
      </section>
      <section className="mt-14">
        <Image src={projectDetails.image} alt="" width={1000} height={752} />
      </section>
      <section className="flexCenter flex-col mt-20">
        <p className="max-w-5xl text-xl font-normal">
          {projectDetails.description}
        </p>
        <div className="flex flex-wrap items-center mt-5 gap-5">
          <Link
            href={projectDetails?.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🖥 <span className="underline">Github</span>
          </Link>
          <Image
            src="/dot.svg"
            width={0}
            height={0}
            alt="dot"
            className="w-1 h-1"
          />
          <Link
            href={projectDetails?.liveSiteUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🚀 <span className="underline">Live Site</span>
          </Link>
        </div>
      </section>
      <section className="flexCenter w-full gap-8 mt-28">
        <span className="w-full h-0.5 bg-light-white-200" />
        <Link href={renderLink()} className="min-w-[82px] h-[82px]">
          <Image
            src={projectDetails.createdBy.avatarUrl}
            alt=""
            width={82}
            height={82}
          />
        </Link>
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>

      <RelatedProjects
        userId={projectDetails.createdBy.id}
        projectId={projectDetails.id}
      />
    </Modal>
  );
}
