'use client';

import { FormState, ProjectInterface, SessionInterface } from '@/common.types';
import { createNewProject, fetchToken, updateProject } from '@/lib/actions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FormField from './FormField';
import CustomMenu from './CustomMenu';
import { categoryFilters } from '@/constants/constants';
import Button from './Button';

interface Props {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
}
export default function ProjectForm({ type, session, project }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setform] = useState<FormState>({
    title: project?.title || '',
    description: project?.description || '',
    image: project?.image || '',
    liveSiteUrl: project?.liveSiteUrl || '',
    githubUrl: project?.githubUrl || '',
    category: project?.category || '',
  });

  const handleStateChange = (fieldName: keyof FormState, value: string) => {
    setform((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes('image')) {
      return alert('Please upload an image');
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange('image', result);
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === 'create') {
        await createNewProject(form, session.user.id as string, token);
        router.push('/');
      }
      if (type === 'edit') {
        await updateProject(form, project?.id as string, token);
        router.push('/');
      }
    } catch (error) {
      alert(
        `Failed to ${
          type === 'create' ? 'create' : 'edit'
        } a project. Try again later.`
      );
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && 'Choose a poster for your project'}
        </label>
        <input
          type="file"
          id="poster"
          accept="image/*"
          required={type === 'create'}
          className="form_image-input"
          onChange={(e) => handleChangeImage(e)}
        />
        {form.image && (
          <Image
            src={form.image}
            alt=""
            fill
            className="sm:p-10 object-contain z-20"
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange('title', value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects"
        isTextArea
        setState={(value) => handleStateChange('description', value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://www.example.com"
        setState={(value) => handleStateChange('liveSiteUrl', value)}
      />
      <FormField
        type="url"
        title="Github URL"
        state={form.githubUrl}
        placeholder="http://github.com/usernamehere/projectnamehere"
        setState={(value) => handleStateChange('githubUrl', value)}
      />

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />

      <div className="flexStart w-full">
        <Button
          type="submit"
          submitting={submitting}
          leftIcon={submitting ? '' : '/plus.svg'}
          title={
            submitting
              ? `${type === 'create' ? 'Creating' : 'Editting'}`
              : `${type === 'create' ? 'Create' : 'Edit'}`
          }
        />
      </div>
    </form>
  );
}
