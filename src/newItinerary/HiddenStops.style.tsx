import styled from 'styled-components'

import { color, space, transition } from '../_utils/branding'
import { TextBody } from '../typography/body'

const ELEMENT_HEIGHT = 32

export const StyledHiddenStops = styled.li<{ stops: number }>`
  min-height: ${ELEMENT_HEIGHT}px;

  ul {
    // TODO improve animation
    overflow: ${props => props['aria-expanded'] ? 'initial' : 'hidden'};

    // Each stop has the same height. We need to compute the final height to have a proper animation
    height: ${props => props['aria-expanded'] ? `${props.stops * ELEMENT_HEIGHT}px`: '0'};
    transition: height ${transition.duration.base} ease-in-out;
  }

  > div {
    display: ${props => props['aria-expanded'] ? 'none' : 'flex'};
  }
`

export const StyledWrapper = styled.div`
  display: flex;
`

export const StyledStopsCount = styled(TextBody)`
  padding: ${space.m} 0;
  color: ${color.blue};
  cursor: pointer;
`
