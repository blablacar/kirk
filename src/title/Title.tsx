import React, { Fragment } from 'react'
import cc from 'classcat'

interface TitleProps {
  readonly id?: string
  readonly className?: Classcat.Class
  readonly children: string
  readonly headingLevel?: number | string
}

export const isHeadingAvailable = (level: number) => level >= 1 && level <= 6

const Title = ({ id, className, children, headingLevel = 1 }: TitleProps) => {
  if (!isHeadingAvailable(Number(headingLevel))) {
    return null
  }
  return React.createElement(
    `h${headingLevel}`,
    {
      id,
      className: cc(['kirk-title', className]),
    },
    <Fragment>{children}</Fragment>,
  )
}
export default Title
