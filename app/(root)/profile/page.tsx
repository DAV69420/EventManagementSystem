import { Collection } from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
// import { getOrdersByUser } from '@/lib/actions/order.actions'
// import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  // const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  // const orders = await getOrdersByUser({ userId, page: ordersPage })

  // const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage })

  return (
    <div className='px-6'>
    {/* 
      My Tickets
      <section className="bg-transparent py-2 md:py-5">
        <div className="w-full md:w-8/12 md:mx-auto flex items-center justify-center sm:justify-between">
          <h3 className='text-center sm:text-left font-bold'>My Tickets</h3>
          <Button asChild variant={'link'} className="hidden sm:flex">
            <Link href="/#events">
              Explore More Events
              <Plus size={16} className='ms-2' />
            </Link>
          </Button>
        </div>
      </section>

      <section className="w-full md:w-8/12 md:mx-auto my-8">
        <Collection
          data={orderedEvents}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      <hr /> */}

      {/* Events Organized */}
      <section className="w-full md:w-8/12 md:mx-auto py-2 md:pt-10">
        <div className=" flex items-center justify-center sm:justify-between">
          <h3 className='text-center sm:text-left font-bold'>Events Organized</h3>
          <Button asChild variant={'link'} className="hidden sm:flex">
            <Link href="/events/create">
              Create New Event
              <Plus size={16} className='ms-2' />
            </Link>
          </Button>
        </div>
      </section>

      <section className="w-full md:w-8/12 md:mx-auto my-8">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section>
    </div>
  )
}

export default ProfilePage