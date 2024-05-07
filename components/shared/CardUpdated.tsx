import { IEvent } from '@/lib/database/models/event.model'
import { DateUtils, formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'

type CardProps = {
  event: IEvent,
  hasOrderLink?: boolean,
  hidePrice?: boolean
}

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div className='w-full group relative'>
      <div className='relative w-full flex justify-center items-center overflow-hidden h-48'>
        <Image src={event.imageUrl} alt={event.title.split(' ').join('')} width={200} height={400}
          className='w-full h-full object-cover absolute -z-10 blur-sm scale-125 brightness-50 pointer-events-none' />
        <Link href={`/events/${event._id}`} className='group-hover:scale-50 transition-all'>
          <Image src={event.imageUrl} alt={event.title.split(' ').join('')} width={200} height={400}
            className='h-full w-full object-cover object-top group-hover:object-contain' />
        </Link>
        <div className='absolute bottom-2 right-3 font-medium text-white bg-black/50 px-2 py-1 text-xs'>{formatDateTime(event.startDateTime).timeOnly}</div>
      </div>

      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all
        invisible pointer-events-none group-hover:visible group-hover:pointer-events-auto">
          <Link href={`/events/${event._id}/update`}>
            <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
          </Link>

          <DeleteConfirmation eventId={event._id} />
        </div>
      )}
      <div className='my-2 mb-6'>
        <Link href={`/events/${event._id}`}>
          {!hidePrice &&
            <span className="flex gap-2 justify-start items-center w-full">
              <span className="text-xs w-fit text-green-700 font-semibold">
                {event.isFree ? 'FREE' : `₹${event.price}`}
              </span>
              <p className="text-xs w-fit text-grey-400 line-clamp-1">
                {event.category.name}
              </p>
              <p className='text-xs ms-auto me-3 opacity-80'>
                {DateUtils.formatEventDate(event.startDateTime)}
              </p>
            </span>
          }
          <h4 className='font-semibold text-sm line-clamp-1'>{event.title}</h4>
          <p className='text-xxss line-clamp-2 opacity-80'>{event.description}</p>
        </Link>
      </div>

      {hasOrderLink && (
        <Link href={`/orders?eventId=${event._id}`} className="flex gap-2 mb-4 p-4 bg-primary-100 rounded-full">
          <p className="text-primary-500">Order Details</p>
          <Image src="/assets/icons/arrow.svg" alt="search" width={10} height={10} />
        </Link>
      )}
    </div>
  )
}

export default Card