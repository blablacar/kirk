import React, { Component, isValidElement, cloneElement } from 'react'
import { canUseEventListeners } from 'exenv'
import cc from 'classcat'
import debounce from 'lodash.debounce'
import prefix from '_utils'
import TextField from 'textField'
import ItemChoice, { ItemChoiceProps } from 'itemChoice'
import AutoCompleteList from './autoCompleteList'
import AutoCompleteListItemDefault from './autoCompleteListItemDefault'
import style from './style'

type query = string | number | boolean
interface AutoCompleteProps {
  readonly name: string,
  readonly isSearching: boolean,
  readonly searchForItems: (query: query) => void,
  readonly onInputChange?: (params: Partial<onChangeParameters>) => void,
  readonly searchForItemsMinChars?: number,
  readonly defaultValue?: string,
  readonly onSelect?: (obj:AutocompleteOnChange) => void,
  readonly onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void,
  readonly onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void,
  readonly onClear?: () => void,
  readonly className?: Classcat.Class,
  readonly inputClassName?: Classcat.Class,
  readonly itemClassName?: Classcat.Class,
  readonly bodyClassName?: Classcat.Class,
  readonly items?: AutocompleteItem[],
  readonly maxItems?: number,
  readonly renderItem?: (itemToRender:AutocompleteItemToRender) => React.ReactElement<any>,
  readonly renderBusy?: ({ query }: { query: query}) => React.ReactElement<any>,
  readonly renderNoResults?: ({ query }: { query: query}) => React.ReactElement<any>,
  readonly renderQuery?: (item:AutocompleteItem) => string,
  readonly renderEmptySearch?: JSX.Element[],
  readonly getItemValue?: (item:AutocompleteItem) => string,
  readonly inputAddon?: React.ReactElement<any>,
  readonly placeholder?: string,
  readonly busyTimeout?: number,
  readonly debounceTimeout?: number,
  readonly autoFocus?: boolean,
  readonly focus?: boolean,
  readonly loadingItemIndex?: number,
  readonly buttonTitle?: string,
  readonly showList?: boolean,
  readonly valid?: boolean,
  readonly onCheckingEnd?: () => void,
} 

interface AutoCompleteState {
  readonly busy: boolean,
  readonly items: AutocompleteItem[],
  readonly value: string,
  readonly query: query,
  readonly noResults: boolean,
}

const initialState:AutoCompleteState = {
  busy: false,
  items: [],
  value: '',
  query: '',
  noResults: false,
}

export default class AutoComplete extends Component<AutoCompleteProps, AutoCompleteState> {
  private input:HTMLInputElement
  private busyTimeout:number | void
  private isSearchingForItems:boolean
  private currentValue:query

  static defaultProps:Partial<AutoCompleteProps> = {
    isSearching: false,
    searchForItemsMinChars: 3,
    maxItems: Infinity,
    renderItem: AutoCompleteListItemDefault,
    renderBusy: () => <div>Loading…</div>,
    renderNoResults: () => <div>No results</div>,
    renderEmptySearch: [],
    onInputChange() {},
    onSelect() {},
    onClear() {},
    renderQuery: item => [item.title, item.description].filter(Boolean).join(','),
    getItemValue: item => item.title,
    busyTimeout: 150,
    debounceTimeout: 500,
    autoFocus: false,
    focus: false,
    buttonTitle: null,
    loadingItemIndex: -1,
    defaultValue: '',
    showList: true,
    valid: false,
  }

  constructor(props: AutoCompleteProps) {
    super(props)
    if (props.debounceTimeout > 0) {
      this.searchForItems = debounce(this.searchForItems, props.debounceTimeout)
    } else {
      this.searchForItems = this.searchForItems.bind(this)
    }
    this.currentValue = ''
    this.state = {
      ...initialState,
      query: this.props.defaultValue,
    }
  }

  componentDidMount() {
    if (this.input && canUseEventListeners) {
      this.input.addEventListener('keydown', this.onInputKeydown)
    }
  }

  componentWillReceiveProps(nextProps:AutoCompleteProps) {
    const shouldRenderItems = this.props.isSearching && nextProps.isSearching === false

    if (this.props.defaultValue !== nextProps.defaultValue) {
      this.setState({ query: nextProps.defaultValue })
    }

    if (shouldRenderItems) {
      this.clearBusyTimeout()
      this.setState({
        busy: false,
        noResults: nextProps.items.length === 0,
        items: nextProps.items,
      })
    }
  }

  componentWillUnmount() {
    if (this.input && canUseEventListeners) {
      this.input.removeEventListener('keydown', this.onInputKeydown)
    }
  }

  onInputKeydown = (e:KeyboardEvent) => {
    const KEY_CODE_ENTER = 13
    if (e.keyCode === KEY_CODE_ENTER) {
      e.preventDefault()
    }
  }

  onInputChange = ({ value }: { value: query }) => {
    this.currentValue = value
    if (this.hasMinCharsForSearch()) {
      this.setState({ noResults: false, query: value }, this.searchForItems)
    } else {
      this.clearBusyTimeout()
      this.setState({ noResults: false, busy: false, items: [] })
    }
    this.props.onInputChange({ value })
  }

  onSelectItem = (item:AutocompleteItem) => {
    this.setState({
      items: [],
      query: this.props.renderQuery(item),
      value: this.props.getItemValue(item),
    }, () => {
      this.input.select()
      this.props.onSelect({ name: this.props.name, value: this.state.value, item })
    })
  }

  hasMinCharsForSearch() {
    return String(this.currentValue).length >= this.props.searchForItemsMinChars
  }

  searchForItems() {
    // If a long `debounceTimeout` is setup, it may happen that a `searchForItems`
    // is still scheduled to be called while the user has modified the query
    // during that lapse of time. Therefore, the check below verify the real input value
    // against the searchForItemsMinChars prop.
    if (!this.hasMinCharsForSearch()) return

    this.busyTimeout = window.setTimeout(this.showBusy, this.props.busyTimeout)
    this.props.searchForItems(this.state.query)
  }

  clearBusyTimeout = () => {
    if (this.busyTimeout) {
      this.busyTimeout = clearTimeout(this.busyTimeout)
    }
  }

  showBusy = () => {
    this.setState({ busy: true })
  }

  inputRef = (input:HTMLInputElement) => {
    this.input = input
  }

  reset() {
    this.setState(initialState)
  }

  render() {
    const shouldDisplayEmptyState = !this.hasMinCharsForSearch() && this.props.showList
      && this.props.renderEmptySearch.length > 0
    const shouldDisplayBusyState = this.state.busy && this.props.showList
    const shouldDisplayNoResults = !this.state.busy && this.state.noResults && this.props.showList
    const shouldDisplayAutoCompleteList = this.state.items.length > 0 && !this.state.busy
      && this.props.showList

    return (
      <div role="search" className={cc([prefix({ autoComplete: true }), this.props.className])}>
        <TextField
          type="search"
          className={this.props.inputClassName}
          name={this.props.name}
          onChange={this.onInputChange}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onClear={this.props.onClear}
          placeholder={this.props.placeholder}
          defaultValue={String(this.state.query)}
          addon={this.props.inputAddon}
          inputRef={this.inputRef}
          autoCorrect="off"
          autoComplete="off"
          autoFocus={this.props.autoFocus}
          focus={this.props.focus}
          buttonTitle={this.props.buttonTitle}
        />
        { shouldDisplayBusyState && (
          <div className={cc([prefix({ 'autoComplete-body': true }), this.props.bodyClassName])}>
            { this.props.renderBusy({ query: this.state.query }) }
          </div>
        )}
        { shouldDisplayNoResults && (
          <div className={cc([prefix({ 'autoComplete-body': true }), this.props.bodyClassName])}>
            { this.props.renderNoResults({ query: this.state.query }) }
          </div>
        )}
        { shouldDisplayEmptyState && (
          <ul>
            { this.props.renderEmptySearch.map((item, index) => {
              if (isValidElement(item)) {
                const props:Partial<ItemChoiceProps> = { key: index }
                return cloneElement(item as React.ReactElement<ItemChoiceProps>, props)
              }
              return null
            })}
          </ul>
        )}
        <AutoCompleteList
          name={`${this.props.name}-list`}
          items={this.state.items}
          maxItems={this.props.maxItems}
          renderItem={this.props.renderItem}
          onSelect={this.onSelectItem}
          visible={shouldDisplayAutoCompleteList}
          loadingItemIndex={this.props.loadingItemIndex}
          itemClassName={this.props.itemClassName}
          valid={this.props.valid}
          onCheckingEnd={this.props.onCheckingEnd}
        />
        <style jsx>{style}</style>
      </div>
    )
  }
}
