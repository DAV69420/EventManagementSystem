'use client';

import { headerLinks } from '@/constants'
import { CircleUserRound, Home, ImagePlus, RadioTower, ShieldQuestion, Ticket } from 'lucide-react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavItems = ({ size = headerLinks.length }) => {
  const pathname = usePathname();
  const iconsize = 18;

  return (
    <ul className="flex w-full flex-row items-start justify-between lg:justify-start gap-5 md:flex-row">
      {headerLinks.map((link, count) => {
        if (count > size - 1) return;
        const isActive = pathname === link.route;
        const isLast = count === headerLinks.length - 2; //increase this number according to the items you want in the end
        return (
          <li
            key={link.route}
            className={`${isActive ? 'text-primary-500 border-b-2 border-primary' : 'opacity-40 md:opacity-100'
              } ${isLast && 'lg:ms-auto'}  flex-center text-xs font-semibold whitespace-nowrap w-full md:w-fit lg:px-5 xl:px-10 pb-3 uppercase`}
          >
            <Link href={link.route} className='md:hidden'>
              {link.label == "Home" ? <Home size={iconsize} /> :
                link.label == "Create Event" ? <ImagePlus size={iconsize} /> :
                  link.label == "Tickets" ? <Ticket size={iconsize} /> :
                    link.label == "Profile" ? <CircleUserRound size={iconsize} /> :
                      <ShieldQuestion size={iconsize} />}
            </Link>
            <Link href={link.route} className='hidden md:block'>{link.label}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavItems