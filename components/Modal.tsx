'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useRef } from 'react';

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onClose = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlay.current) {
        onClose();
      }
    },
    [onClose]
  );
  return (
    <div ref={overlay} className="modal" onClick={(e) => handleClick(e)}>
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-8"
      >
        <Image src="/close.svg" alt="" width={20} height={20} />
      </button>
      <div ref={wrapper} className="modal_wrapper">
        {children}
      </div>
    </div>
  );
}
