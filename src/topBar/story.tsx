import React from 'react'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { color } from '../_utils/branding'
import Button, { ButtonStatus } from '../button'
import ArrowIcon from '../icon/arrowIcon'
import TopBar from '../topBar'

const stories = storiesOf('Widgets|TopBar', module)
stories.addDecorator(withKnobs)

const leftAction = (
  <Button isBubble status={ButtonStatus.UNSTYLED} onClick={() => {}} aria-label="back">
    <ArrowIcon size="24" iconColor={color.blue} />
  </Button>
)

const rightAction = (
  <span
    style={{
      padding: '12px',
      fontSize: '18px',
      lineHeight: '20px',
      color: color.blue,
    }}
  >
    Need help?
  </span>
)

const centerContent = (
  <div>
    <span
      style={{
        fontSize: '16px',
        lineHeight: '20px',
        color: color.midnightGreen,
      }}
    >
      Trip
    </span>
    <span
      style={{
        display: 'block',
        fontSize: '13px',
        lineHeight: '20px',
        color: color.lightMidnightGreen,
      }}
    >
      Paris → Lyon
    </span>
  </div>
)

stories.add('default', () => {
  const left = boolean('left element', true)
  const right = boolean('right element', false)
  const center = boolean('center element', false)
  return (
    <TopBar
      leftItem={left ? leftAction : null}
      centerItem={center ? centerContent : null}
      rightItem={right ? rightAction : null}
      fixed={boolean('fixed mode', false)}
      bgTransparent={boolean('transparent background', false)}
      bgShadedTransparent={boolean('shaded transparent background', false)}
    />
  )
})
