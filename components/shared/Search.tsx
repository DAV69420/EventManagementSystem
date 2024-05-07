"use client"

import Image from 'next/image';
import { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { StringUtils, formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

const Search = ({ placeholder = 'Search title...', buyer = false }: { placeholder?: string, buyer?: boolean }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = '';
      if (buyer) {
        if (query) {
          newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: 'query',
            value: query
          })
        } else {
          newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['query']
          })
        }
      } else {
        const myurl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://ems-beta-six.vercel.app/'
        if (query.length > 1) {
          newUrl = myurl + '?query=' + query
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn);

  }, [query, router])

  return (
    <div className="flex-center w-full overflow-hidden rounded-full bg-grey-50 px-4 py-1">
      <Image src="/assets/icons/search.svg" alt="search" width={20} height={20} />
      <Input
        type="search"
        placeholder={placeholder}
        // onChange={(e) => setQuery(e.target.value)}
        onChange={(e) => {
          if (StringUtils.isAlphabetic(e.target.value)) {
            setQuery(e.target.value);
          }
        }}
        pattern='[A-Za-z0-9 ]*'
        className="p-regular-14 border-0 bg-transparent outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 ps-2 h-9"
      />
    </div>
  )
}

export default Search