// tslint:disable:max-line-length
import React from 'react'
import cc from 'classcat'
import BaseIcon from '_utils/icon'
import { BaseIconDefaultProps } from '_utils/icon/BaseIcon'
import { color } from '_utils/branding'

export interface MeetingPointIconProps extends Icon {
  readonly active?: boolean
  readonly shadowed?: boolean
}

export const MeetingPointIcon = (props: MeetingPointIconProps) => {
  const strokeColor = props.active ? color.white : color.blue
  const fillColor = props.active ? color.blue : color.white
  const className = cc([props.className, { 'kirk-icon-shadowed': props.shadowed }])

  return (
    <BaseIcon {...props} className={className} viewBox="0 0 22 22">
      <g fill="none" fillRule="evenodd">
        <g
          transform="translate(-1 -1)"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle fill={fillColor} cx="12" cy="12" r="10" />
          <path d="M17 7l-3 3M17 10h-3V7" />
          <path d="M7 17l3-3M7.25 14H10v2.75" />
          <path d="M7 7l2.5 2.625M7.25 10H10V7.25" />
          <path d="M17 17l-3-3M16.75 14H14v2.75" />
        </g>
      </g>
    </BaseIcon>
  )
}

MeetingPointIcon.defaultProps = {
  ...BaseIconDefaultProps,
  active: false,
  shadowed: false,
}

export default React.memo(MeetingPointIcon)
