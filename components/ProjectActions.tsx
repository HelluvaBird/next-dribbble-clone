'use client';

import { deleteProject, fetchToken } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  projectId: string;
}

export default function ProjectActions({ projectId }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);

    const { token } = await fetchToken();

    try {
      await deleteProject(projectId, token);
      router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action_btn"
      >
        <Image src="/pencile.svg" alt="" width={24} height={24} />
      </Link>
      <button
        type="button"
        disabled={isDeleting}
        className={`${
          isDeleting ? 'bg-gray' : 'bg-primary-purple'
        } flexCenter delete-action_btn`}
        onClick={handleDelete}
      >
        <Image src="/trash.svg" alt="" width={24} height={24} />
      </button>
    </>
  );
}
