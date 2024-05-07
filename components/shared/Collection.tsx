import { IEvent } from '@/lib/database/models/event.model'
import Card from './Card'

export type CollectionProps = {
  data: IEvent[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  totalPages?: number,
  urlParamName?: string,
  orderss?: {
    data: any;
    totalPages: number;
  } | undefined,
  collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Events'
}

import React from 'react';
import Pagination from './Pagination';
import CardUpdated from './CardUpdated';
import ShowQRButton from './ShowQRButton'

export function Collection({
  data, emptyTitle, orderss, emptyStateSubtext, page, totalPages = 0, collectionType, urlParamName,
}: CollectionProps) {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((event, count) => {
              const hasOrderLink = collectionType === 'Events_Organized'
              const hidePrice = collectionType === 'My_Tickets'

              return (
                <li key={event._id} className="flex justify-center flex-col">
                  <CardUpdated event={event} hasOrderLink={hasOrderLink} hidePrice={hidePrice} />
                  {hidePrice &&
                    <ShowQRButton setext={orderss} oirder={count} eventId={event._id} />}
                </li>
              )
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  )
}