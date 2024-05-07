import CategoryFilter from '@/components/shared/CategoryFilter';
import CategoryTags from '@/components/shared/CategoryTags';
import { Collection } from '@/components/shared/Collection';
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button'
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';
import Image from 'next/image'
import Link from 'next/link'

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 12
  })

  return (
    <>
      <div className='w-[80%] md:w-[750px] mx-auto mt-3 bg-neutral-100 text-neutral-800 px-4 py-3 rounded-sm'>
        {/* Tag Line here */}
        <p className='text-xs md:text-center'>
          Welcome to MeetHub where events and attendees unite for an
          <span title="You will have a thrilling and seamless experience of the entire process" className='font-semibold text-primary-500 cursor-help'>
            &nbsp;unforgettable&nbsp;
          </span>
          experience!
        </p>
      </div>

      <section id="events" className="w-[80%] mx-auto mb-12 mt-4 flex flex-col gap-8">

        <div className="flex w-full flex-col gap-5">
          {/* <CategoryFilter /> */}
          <p className='text-sm flex font-bold justify-start items-center'>Latest Events from India &nbsp;<Image src={'/assets/images/IND.webp'} alt={'IND'} width={48} height={48} className='rounded-full object-cover w-4 h-4' /></p>
          <CategoryTags />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext=""
          collectionType="All_Events"
          limit={12}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  )
}
