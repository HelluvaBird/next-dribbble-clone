import Link from 'next/link';
import Image from 'next/image';
import { NavLinks } from '@/constants/constants';
import ProfileMenu from './ProfileMenu';
import AuthProviders from './AuthProviders';
import { getCurrentUser } from '@/lib/session';

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" alt="" width={119} height={31} priority />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((navLink) => (
            <Link key={navLink.key} href={navLink.href}>
              {navLink.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        {session ? (
          <>
            <ProfileMenu session={session} />
            <Link href="/create-project">
              <button type="button">Share Work</button>
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};
export default Navbar;
