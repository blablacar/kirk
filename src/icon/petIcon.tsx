import React, { PureComponent } from 'react'
import cc from 'classcat'
import isEmpty from 'lodash.isempty'

import { color } from '_utils/branding'

export enum PetType {
  ON = 'on',
  OFF = 'off',
  DEFAULT = 'default',
}

interface PetIconProps extends Icon {
  readonly status?: PetType,
}

class PetIcon extends PureComponent<PetIconProps> {
  static defaultProps: PetIconProps = {
    className: '',
    iconColor: color.icon,
    size: 24,
    title: '',
    status: PetType.DEFAULT,
  }

  render() {
    const { className, iconColor, size, title, status } = this.props
    const highlightedIconColor = status === 'on' ? color.iconHighlight : iconColor
    return (
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={cc(['kirk-icon', className])}
        width={size}
        height={size}
        aria-hidden={isEmpty(title)}
      >
        { title && <title>{title}</title> }

        { (status === 'default' || status === 'on') && (
          <g>
            <path
              fill={highlightedIconColor}
              // tslint:disable-next-line:max-line-length
              d="M15.027,7.822c0.232,0.07,0.474,0.105,0.715,0.105c1.097,0,2.081-0.735,2.395-1.788l0.569-1.917c0.394-1.321-0.361-2.716-1.684-3.111c-1.296-0.384-2.727,0.4-3.109,1.684l-0.569,1.917c-0.19,0.64-0.12,1.316,0.197,1.903C13.858,7.203,14.387,7.632,15.027,7.822z M14.303,4.998l0.569-1.917c0.188-0.632,0.779-1.074,1.438-1.074c0.144,0,0.288,0.021,0.427,0.062c0.794,0.237,1.247,1.074,1.011,1.867l-0.569,1.917c-0.229,0.771-1.079,1.25-1.866,1.009c-0.384-0.114-0.7-0.37-0.891-0.721C14.229,5.789,14.188,5.382,14.303,4.998z"
            />
            <path
              fill={highlightedIconColor}
              // tslint:disable-next-line:max-line-length
              d="M6.864,6.138C7.177,7.19,8.161,7.926,9.258,7.926c0.241,0,0.482-0.035,0.714-0.104c0.64-0.19,1.168-0.617,1.486-1.204c0.319-0.587,0.389-1.264,0.198-1.905l-0.57-1.917c-0.382-1.284-1.811-2.072-3.109-1.685C6.656,1.505,5.901,2.9,6.293,4.221L6.864,6.138z M8.262,2.069c0.14-0.042,0.284-0.062,0.428-0.062c0.658,0,1.25,0.441,1.438,1.074l0.57,1.917c0.114,0.385,0.072,0.791-0.119,1.143c-0.191,0.352-0.507,0.608-0.892,0.722c-0.141,0.042-0.285,0.063-0.43,0.063c-0.657,0-1.248-0.441-1.436-1.073l-0.57-1.917C7.016,3.143,7.47,2.306,8.262,2.069z"
            />
            <path
              fill={highlightedIconColor}
              // tslint:disable-next-line:max-line-length
              d="M5.546,11.12c1.046-0.897,1.17-2.479,0.277-3.523L5.401,7.1C4.536,6.092,2.885,5.962,1.877,6.826C1.37,7.259,1.061,7.864,1.008,8.53s0.157,1.312,0.59,1.82l0.42,0.493c0.476,0.556,1.168,0.875,1.9,0.875c0.575,0,1.133-0.199,1.579-0.562C5.515,11.145,5.53,11.133,5.546,11.12z M4.93,10.33c-0.013,0.009-0.024,0.018-0.036,0.028c-0.607,0.518-1.598,0.439-2.114-0.165l-0.42-0.492c-0.26-0.305-0.386-0.692-0.354-1.092c0.032-0.4,0.217-0.763,0.523-1.024C2.799,7.353,3.145,7.225,3.5,7.225c0.439,0,0.855,0.192,1.141,0.525l0.421,0.496C5.588,8.86,5.526,9.786,4.93,10.33z"
            />
            <path
              fill={highlightedIconColor}
              // tslint:disable-next-line:max-line-length
              d="M23.123,6.827c-1.008-0.866-2.658-0.737-3.525,0.275l-0.419,0.493c-0.896,1.046-0.771,2.627,0.275,3.525c0.016,0.014,0.032,0.026,0.05,0.038c0.445,0.362,1.003,0.561,1.577,0.561c0.731,0,1.425-0.319,1.9-0.875l0.42-0.492c0.434-0.508,0.644-1.154,0.591-1.82S23.631,7.259,23.123,6.827z M22.641,9.701l-0.419,0.492c-0.519,0.604-1.509,0.683-2.115,0.165c-0.013-0.01-0.024-0.02-0.038-0.029c-0.595-0.544-0.656-1.468-0.129-2.085l0.419-0.493c0.517-0.605,1.506-0.687,2.115-0.165c0.305,0.26,0.49,0.623,0.521,1.023C23.027,9.009,22.901,9.396,22.641,9.701z"
            />
            <path
              fill={highlightedIconColor}
              // tslint:disable-next-line:max-line-length
              d="M17.809,13.706c-1.202-1.695-3.187-2.707-5.31-2.707S8.39,12.011,7.17,13.737l-2.266,3.74c-0.814,1.343-0.845,2.887-0.086,4.235C5.613,23.124,7.107,24,8.717,24c0.546,0,1.095-0.101,1.63-0.299l0.196-0.073c1.254-0.467,2.658-0.469,3.919,0.002l0.193,0.069c2.108,0.781,4.46-0.1,5.525-1.987c0.76-1.349,0.729-2.893-0.086-4.236L17.809,13.706z M19.31,21.221c-0.83,1.471-2.637,2.163-4.311,1.539l-0.192-0.069c-1.479-0.549-3.134-0.549-4.613,0l-0.195,0.073C9.575,22.921,9.144,23,8.717,23c-1.25,0-2.41-0.682-3.027-1.778c-0.577-1.024-0.551-2.2,0.07-3.227l2.245-3.711c1.03-1.452,2.667-2.285,4.494-2.285c1.827,0,3.464,0.833,4.474,2.255l2.267,3.739C19.861,19.02,19.887,20.196,19.31,21.221z"
            />
          </g>
        )}

        { status === 'off' && (
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(0.000000, -1.000000)">
              <path
                stroke={color.iconFaded}
                stroke-linecap="round"
                stroke-linejoin="round"
                // tslint:disable-next-line:max-line-length
                d="M8.83001,7.34241 L8.83001,7.34241 C9.88878,7.02764 10.49191,5.91416 10.17714,4.85539 L9.6072,2.93832 C9.29243,1.87955 8.17895,1.27642 7.12019,1.5912 L7.12019,1.5912 C6.06142,1.90597 5.45829,3.01945 5.77307,4.07821 L6.343,5.99529 C6.65777,7.05405 7.77125,7.65718 8.83001,7.34241 Z"
              />
              <path
                stroke={color.iconFaded}
                stroke-linecap="round"
                stroke-linejoin="round"
                // tslint:disable-next-line:max-line-length
                d="M14.16999,7.34241 L14.16999,7.34241 C13.11122,7.02764 12.50809,5.91416 12.82286,4.85539 L13.39281,2.93832 C13.70758,1.87955 14.82106,1.27642 15.87982,1.5912 L15.87982,1.5912 C16.93859,1.90597 17.54172,3.01945 17.22694,4.07821 L16.657,5.99529 C16.34223,7.05405 15.22875,7.65718 14.16999,7.34241 Z"
              />
              <path
                stroke={color.iconFaded}
                stroke-linecap="round"
                stroke-linejoin="round"
                // tslint:disable-next-line:max-line-length
                d="M4.22031,11.73897 L4.22031,11.73897 C5.0601,11.02144 5.15922,9.759 4.4417,8.91922 L4.0206,8.42637 C3.30308,7.58659 2.04064,7.48747 1.20085,8.20499 L1.20085,8.20499 C0.36107,8.92251 0.26195,10.18495 0.97947,11.02474 L1.40057,11.51759 C2.11809,12.35737 3.38053,12.45649 4.22031,11.73897 Z"
              />
              <path
                stroke={color.iconFaded}
                stroke-linecap="round"
                stroke-linejoin="round"
                // tslint:disable-next-line:max-line-length
                d="M18.77969,11.73897 L18.77969,11.73897 C17.9399,11.02144 17.84078,9.759 18.5583,8.91922 L18.97939,8.42637 C19.69691,7.58659 20.95935,7.48747 21.79914,8.20499 L21.79914,8.20499 C22.63892,8.92251 22.73804,10.18495 22.02052,11.02474 L21.59943,11.51759 C20.88191,12.35737 19.61947,12.45649 18.77969,11.73897 Z"
              />
              <path
                stroke={color.iconFaded}
                stroke-linecap="round"
                stroke-linejoin="round"
                // tslint:disable-next-line:max-line-length
                d="M7.21072153,13.433605 L5.22771715,16.7064998 C3.57415038,19.4356694 6.40510877,22.6507442 9.46242974,21.5158076 L9.63430604,21.4520026 C10.8352177,21.0062074 12.1647631,21.0062074 13.3656747,21.4520026 L13.537551,21.5158076 C16.5948807,22.6507442 19.4258304,19.4356607 17.7722724,16.7064998 L15.789268,13.433605 C13.7253173,10.5221291 9.27468093,10.5221291 7.21072153,13.433605 Z"
              />
              <path
                stroke={color.white}
                fill={color.iconFaded}
                fill-rule="nonzero"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M1.5,24.5 L23.5,2.5"
              />
              <path
                stroke={color.danger}
                fill={color.iconFaded}
                fill-rule="nonzero"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M1.5,23.5 L23.5,1.5"
              />
            </g>
          </g>
        )}
      </svg>
    )
  }
}

export default PetIcon
