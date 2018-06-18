import React from 'react'
import cc from 'classcat'

import Avatar from 'avatar'
import ComfortIcon from 'icon/comfortIcon'
import LightningIcon from 'icon/lightningIcon'
import LadyIcon from 'icon/ladyIcon'
import Itinerary from 'itinerary'
import style from 'tripCard/style'

export interface TripCardProps {
  href: string | JSX.Element,
  itinerary: Place[],
  driver: {
    avatarUrl: string,
    firstName: string,
  },
  price: string,
  flags?: {
    ladiesOnly?: boolean,
    maxTwo?: boolean,
    autoApproval?: boolean,
  },
  titles?: {
    ladiesOnly?: string,
    maxTwo?: string,
    autoApproval?: string,
  }
  metaUrl: string,
  highlighted?: string,
  className?: Classcat.Class,
}

const TripCard = ({
  className, href, itinerary, driver, price, flags = {}, titles = {}, highlighted = '', metaUrl,
}: TripCardProps) => {
  const departure = itinerary[0]
  const arrival = itinerary[itinerary.length - 1]
  const displayFlags = highlighted.length === 0 && Object.keys(flags).length
  const itemPropName = `${departure.mainLabel} → ${arrival.mainLabel}`

  let LinkComponent: tag
  let typeProps = {}

  // If we pass a component to href, we get component type and we merge props
  if (typeof href !== 'string') {
    LinkComponent = href.type
    typeProps = {
      ...href.props,
      rel: 'nofollow',
    }
  } else {
    LinkComponent = 'a'
    typeProps = {
      href,
      rel: 'nofollow',
    }
  }

  return (
    <li
      className={cc(['kirk-tripCard', { 'kirk-tripCard--highlighted': !!highlighted }, className])}
      itemScope
      itemType="http://schema.org/Event"
    >
      <LinkComponent {...typeProps}>
        <meta itemProp="url" content={metaUrl} />
        <meta itemProp="name" content={itemPropName} />
        <meta itemProp="startDate" content={departure.isoDate} />
        <meta itemProp="endDate" content={arrival.isoDate} />

        <div className="kirk-tripCard-main">
          <Itinerary
            className="kirk-tripCard-itinerary"
            places={itinerary}
          />
          <span className="kirk-tripCard-price">{price}</span>
        </div>
        <div className="kirk-tripCard-bottom">
          <div className="kirk-tripCard-driver">
            <Avatar image={driver.avatarUrl} alt={driver.firstName} />
            <span>{driver.firstName}</span>
          </div>
          { highlighted && <span className="kirk-tripCard-topText">{highlighted}</span> }
          {
            displayFlags && (
              <div className="kirk-tripCard-flags">
                { flags.ladiesOnly && <LadyIcon title={titles.ladiesOnly || ''} /> }
                { flags.maxTwo && <ComfortIcon title={titles.maxTwo || ''} /> }
                { flags.autoApproval && <LightningIcon title={titles.autoApproval || ''} /> }
              </div>
            )
          }
        </div>
      </LinkComponent>
      <style jsx>{style}</style>
    </li>
  )
}

export default TripCard
