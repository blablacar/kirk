import React, { PureComponent, RefObject } from 'react'
import { canUseDOM } from 'exenv'
import cc from 'classcat'
import { isTouchEventsAvailable } from '_utils'

import Button, { ButtonStatus } from 'button'
import PlusIcon from 'icon/plusIcon'
import MinusIcon from 'icon/minusIcon'

import { color, delay, font, space, pxToInteger } from '_utils/branding'

export enum StepperDisplay {
  SMALL = 'small',
  LARGE = 'large',
}

const StepperValueSize = {
  [StepperDisplay.SMALL]: pxToInteger(font.l.size),
  [StepperDisplay.LARGE]: pxToInteger(font.xxl.size),
}

const StepperButtonSize = {
  [StepperDisplay.SMALL]: 24,
  [StepperDisplay.LARGE]: 48,
}

interface StepperProps {
  name: string
  children: string
  increaseLabel: string
  decreaseLabel: string
  className?: string
  valueClassName?: string
  value?: number
  step?: number
  max?: number
  min?: number
  format?: (value: string | number) => string | number
  onChange?: (obj: OnChangeParameters) => void
  display?: StepperDisplay
}

interface StepperState {
  value: number
  min: number
  max: number
  fontSize?: number
}

// Support IE. Same value returned with Number.MAX_SAFE_INTEGER / Number.MIN_SAFE_INTEGER
const defaultInteger = 2 ** 53 - 1
const isTouchScreen = isTouchEventsAvailable()

export default class Stepper extends PureComponent<StepperProps, StepperState> {
  private ref: RefObject<HTMLDivElement>

  static defaultProps: Partial<StepperProps> = {
    value: 0,
    step: 1,
    max: defaultInteger,
    min: -defaultInteger,
    format: value => value,
    onChange: () => {},
    display: StepperDisplay.SMALL,
  }

  filterValue = (value: number, min: number, max: number) => {
    return Math.max(min, Math.min(value, max))
  }

  state: StepperState = {
    value: this.filterValue(this.props.value, this.props.min, this.props.max),
    min: this.props.min,
    max: this.props.max,
  }

  whileButtonDown: number
  buttonDownDelay: number

  constructor(props: StepperProps) {
    super(props)
    this.ref = React.createRef()
  }

  componentDidMount() {
    this.handleFontSize()
    window.addEventListener('resize', this.handleFontSize.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleFontSize)
  }

  componentDidUpdate(prevProps: StepperProps) {
    if (prevProps.max !== this.props.max || prevProps.min !== this.props.min) {
      this.update(this.state.value)
    }
    if (prevProps.value !== this.props.value) {
      this.update(this.props.value)
    }

    this.handleFontSize()
  }

  update(newValue: number) {
    const value = this.filterValue(newValue, this.props.min, this.props.max)
    this.setState({ value })
    this.props.onChange({ name: this.props.name, value })
  }

  handleFontSize() {
    if (!this.ref.current) {
      return
    }

    const { format, display } = this.props
    const { value } = this.state

    // Compute available space without paddings
    const availableSpace = this.ref.current.offsetWidth - pxToInteger(space.l) * 2
    const valueLength = String(format(value)).length
    const optimalSize = Math.trunc(availableSpace/(valueLength*0.5))
    const maxSize = StepperValueSize[display]

    this.setState({ fontSize: Math.min(optimalSize, maxSize) })
  }

  handleButtonDown = (callback: () => void) => () => {
    if (canUseDOM) {
      this.buttonDownDelay = window.setTimeout(() => {
        this.whileButtonDown = window.setInterval(() => {
          callback()
          if (this.state.value >= this.props.max || this.state.value <= this.props.min) {
            this.clearButtonPressedTimers()
          }
        }, parseInt(delay.interval.base, 10))
      }, parseInt(delay.timeout.base, 10))
    }
  }

  clearButtonPressedTimers = () => {
    clearTimeout(this.buttonDownDelay)
    clearInterval(this.whileButtonDown)
  }

  handleButtonUp = (callback: () => void) => () => {
    callback()
    this.clearButtonPressedTimers()
  }

  increment = () => {
    this.update(this.state.value + this.props.step)
  }

  decrement = () => {
    this.update(this.state.value - this.props.step)
  }

  createListeners(callback: () => void) {
    return isTouchScreen
      ? { onTouchStart: this.handleButtonDown(callback), onTouchEnd: this.handleButtonUp(callback) }
      : { onMouseDown: this.handleButtonDown(callback), onMouseUp: this.handleButtonUp(callback) }
  }

  render() {
    const {
      className,
      children,
      increaseLabel,
      decreaseLabel,
      format,
      name,
      min,
      max,
      valueClassName,
      display,
    } = this.props
    const isMax = this.state.value >= max
    const isMin = this.state.value <= min
    const buttonSize = StepperButtonSize[display]

    return (
      <div className={cc(['kirk-stepper', `kirk-stepper-${display}`, className])}>
        <Button
          type="button"
          className="kirk-stepper-decrement"
          status={ButtonStatus.UNSTYLED}
          disabled={isMin}
          {...this.createListeners(this.decrement)}
        >
          <MinusIcon
            title={decreaseLabel}
            iconColor={isMin ? color.disabled : color.primary}
            size={buttonSize}
          />
        </Button>
        <div
          className={cc(['kirk-stepper-value', valueClassName])}
          style={{ fontSize: `${this.state.fontSize}px` }}
          ref={this.ref}
        >
          {format(this.state.value)}
        </div>
        <label>
          <span>{children}</span>
          <input type="hidden" name={name} value={format(this.state.value)} readOnly />
        </label>
        <Button
          type="button"
          className="kirk-stepper-increment"
          status={ButtonStatus.UNSTYLED}
          disabled={isMax}
          {...this.createListeners(this.increment)}
        >
          <PlusIcon
            title={increaseLabel}
            iconColor={isMax ? color.disabled : color.primary}
            size={buttonSize}
          />
        </Button>
      </div>
    )
  }
}
