import styled from 'styled-components'

import { color, space } from '../_utils/branding'
import { ChevronIcon } from '../icon/chevronIcon'
import { TextCaption } from '../typography/caption'
import { TextTitleStrong } from '../typography/titleStrong'

export const StyledContent = styled.div`
  position: relative;
  flex: 1;
  padding: ${space.m} 0;
`

export const StyledLabel = styled(TextTitleStrong)<{ highlighted?: boolean }>`
  ${props => props.highlighted ? `color: ${color.blue}` : ''};
`

export const StyledSubLabel = styled(TextCaption)`
  display: block;
  color: ${color.midnightGreen};
  margin-top: ${space.s};
`

export const StyledProximity = styled.div`
  display: block;
`

export const StyledChevronIcon = styled(ChevronIcon)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`
