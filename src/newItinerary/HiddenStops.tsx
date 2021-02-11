import React, { useState } from 'react'

import { StyledHiddenStops, StyledWrapper, StyledStopsCount } from './HiddenStops.style'
import { Lines } from './Itinerary'
import { Line } from './internals/Line'
import { Bullet, BulletTypes } from '../bullet'
import { HiddenStopProps } from './HiddenStop'

export type HiddenStopsProps = Readonly<{
  children: React.ReactElement<HiddenStopProps>[]
  label: string
}>

export const HiddenStops = ({ children, label }: HiddenStopsProps) => {
  const [hidden, setHidden] = useState(true)

  return (
    <StyledHiddenStops onClick={(): void => setHidden(!hidden)} role="button" aria-expanded={!hidden} stops={children.length}>
      <StyledWrapper>
        <time aria-hidden="true" />
        <Line line={Lines.HIDDEN_STOPS} bullet={<Bullet type={BulletTypes.DEFAULT} />} />
        <StyledStopsCount>{label}</StyledStopsCount>
      </StyledWrapper>

      <ul>{children}</ul>
    </StyledHiddenStops>
  )
}
