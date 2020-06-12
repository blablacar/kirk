import React, { Fragment } from 'react'
import cc from 'classcat'

import { color } from '../_utils/branding'
import { SearchIcon } from '../icon/searchIcon'
import { Text, TextTagType } from '../text'
import { UneditableTextField } from '../uneditableTextField'
import { RideAxis } from '../rideAxis'

export interface SearchRecapProps {
  className?: string
  from?: string
  to?: string
  info?: string
}

export const SearchRecap = ({ className, from, to, info }: SearchRecapProps) => (
  <div className={cc(['kirk-searchRecap', className])}>
    <UneditableTextField addOn={<SearchIcon />} ellipsis>
      <Fragment>
        <Text
          tag={TextTagType.PARAGRAPH}
          textColor={color.midnightGreen}
          className="kirk-requestRecap-route"
        >
          <RideAxis from={from} to={to} />
        </Text>
        {info && (
          <Text tag={TextTagType.SPAN} className="kirk-requestRecap-info">
            {info}
          </Text>
        )}
      </Fragment>
    </UneditableTextField>
  </div>
)
