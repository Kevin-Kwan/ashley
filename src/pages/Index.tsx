/**
 * Created by Louka MB. <https://github.com/mblouka>
 * 05/01/2024
 */

import { Session } from "../session.ts"

import { getAnnouncements } from "../announcement.ts"

import Announcement from "../components/Announcement.tsx"
import Helmet from "../components/Helmet.tsx"

export default async function Index({ session }: { session?: Session }) {
  // Retrieve announcements for the index page.
  const announcements = await getAnnouncements("index")

  return (
    <>
      <Helmet>
        <title>Home page or something</title>
      </Helmet>

      {announcements.length > 0 && (
        <div id="announcements">
          {announcements.map((announcement) => (
            <Announcement
              key={announcement.id}
              href={announcement.href}
              color={announcement.color}
            >
              {announcement.contents}
            </Announcement>
          ))}
        </div>
      )}
    </>
  )
}
