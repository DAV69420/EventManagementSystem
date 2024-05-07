import CheckoutButton from '@/components/shared/CheckoutButton';
import { Collection } from '@/components/shared/Collection';
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions'
import { DateUtils, formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types'
import { MapPin } from 'lucide-react';
import Image from 'next/image';

const EventDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  })

  return (
    <>
      <section className="w-[80%] mx-auto flex justify-start bg-primary-50 items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event.imageUrl}
            alt="hero image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-contain object-center bg-dotted-pattern bg-cover"
          />

          <div className="flex w-full flex-col gap-8 p-2 md:p-5 md:ps-10 items-start justify-center">
            <div className="flex flex-col gap-0">
              <h2 className='h2-bold'>{event.title}</h2>
              <div className='flex gap-2 md:gap-3'>
                {/* <Image src="/assets/icons/calendar.svg" alt="calendar" width={32} height={32} /> */}
                <div className="flex flex-wrap items-center">
                  <p>
                    {DateUtils.formatEventDateTime(event.startDateTime)}&nbsp;-&nbsp;
                    {DateUtils.formatEventDateTime(event.endDateTime)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-5 my-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex gap-3">
                    <p className="fs-2 font-bold rounded-full bg-green-500/10 px-5 py-1 text-green-700">
                      {event.isFree ? 'FREE' : `₹ ${event.price}`}
                    </p>
                    <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-1 text-grey-500">
                      {event.category.name}
                    </p>
                    <p className="rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 flex items-center justify-start gap-1">
                      <MapPin size={16} />
                      {event.location}
                    </p>
                  </div>

                </div>
              </div>
              <div className="flex flex-col gap-2 mb-5">
                <p className="">{event.description}</p>
                {event.url ?
                  <a target='_blank' href={event.url} className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{event.url}</a>
                  :
                  <></>
                }
              </div>
              <p className="sm:mt-0 opacity-80 my-5">
                Event Hosted by{' '}
                <span className="text-primary-500">{event.organizer.firstName} {event.organizer.lastName}</span>
              </p>
              <CheckoutButton event={event} />

            </div>


          </div>
        </div>
      </section>

      {/* EVENTS with the same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="fs-2 text-xl font-bold">You might also like</h2>

        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext=""
          collectionType="All_Events"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        />
      </section>
    </>
  )
}

export default EventDetails