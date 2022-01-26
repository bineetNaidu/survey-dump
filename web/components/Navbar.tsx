import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Navbar: FC = () => {
  return (
    <nav className="flex justify-between items-center">
      <h1 className="text-4xl font-extrabold text-blue-600">
        <Link href="/">
          <a>
            <Image
              src="/assets/navBrandLogo.svg"
              alt="Brand logo"
              height={48}
              width={290}
            />
          </a>

          {/* <a className="before:content-[':{'] after:content-['}:'] before:pr-2 after:pl-2">
            Survey Dump
          </a> */}
        </Link>
      </h1>

      <div className="text-lg">
        <Link href="/use-cases">
          <a className="mx-4 text-blue-900 hover:underline transition-all">
            Use Cases
          </a>
        </Link>

        <Link href="/intregations">
          <a className="mx-4 text-blue-900 hover:underline transition-all">
            Integrations
          </a>
        </Link>

        <Link href="/pricing">
          <a className="mx-4 text-blue-900 hover:underline transition-all">
            Pricing
          </a>
        </Link>

        <Link href="/login">
          <a className="mx-4 text-blue-900 hover:underline transition-all">
            Login
          </a>
        </Link>

        <Link href="/signup">
          <a className="mx-4 text-blue-900 hover:text-white hover:bg-blue-900 transition-all py-2 px-4 rounded-2xl border border-blue-900">
            Signup for Free
          </a>
        </Link>
      </div>
    </nav>
  );
};
