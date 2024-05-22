import * as React from 'react'

import { cn } from '@styles'

export type IconName =
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'square-arrow-top-right'
  | 'rescue-ring'
  | 'bubble-annotation'
  | 'megaphone'
  | 'graduate-cap'
  | 'play-circle'
  | 'play'
  | 'book'
  | 'bookmark-check'
  | 'shield-check'
  | 'square-check'
  | 'square-check-empty'
  | 'folder'
  | 'circle-question-mark'
  | 'circle-arrow'
  | 'trash-can'
  | 'settings-gear'
  | 'floppy-disk-1'
  | 'floppy-disk-2'
  | 'medal'
  | 'wreath'
  | 'chevron-large-down'
  | 'chevron-bottom'
  | 'chevron-right'
  | 'chevron-left'
  | 'sparkle'
  | 'arrow-box-left'
  | 'lock'
  | 'magnifying-glass'
  | 'filter-1'
  | 'fast-forward'
  | 'crystal-ball'
  | 'circle-dots-center'
  | 'arrow-out-of-box'
  | 'cross-large'
  | 'circle-x'
  | 'square-x'
  | 'moneybag'
  | 'rocket'
  | 'brush-sparkle'
  | 'fork-knife'
  | 'shopping-bag'
  | 'layout-third'
  | 'layout-grid'
  | 'filter-2'
  | 'chevron-double-left'
  | 'chevron-double-right'
  | 'chevron-left-small'
  | 'chevron-right-small'
  | 'arrows-repeat'
  | 'loader'
  | 'group'
  | 'wallet'
  | 'chevron-top-small'
  | 'chevron-down-small'
  | 'chevron-grabber-vertical'
  | 'circle-check'
  | 'crypto-punk'
  | 'person-circle'
  | 'shield-check'
  | 'plus-large'
  | 'plus-small'
  | 'circle-plus'
  | 'square-plus'
  | 'eye-open'
  | 'eye-slash'
  | 'calendar'
  | 'shield-check-blue'
  | 'dot-grid'
  | 'circles-three'
  | 'circle'
  | 'microphone'

export interface IconProps {
  name: IconName
  className?: string
}

const Icon = ({ name, className }: IconProps) => {
  return (
    <svg className={cn(`h-6 w-6`, className)}>
      <defs>
        {/* arrow-left */}
        <symbol id="arrow-left" viewBox="0 0 24 24">
          <path
            d="M10 5.75L3.75 12L10 18.25M4.5 12H20.25"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </symbol>
        {/* arrow-right */}
        <symbol id="arrow-right" viewBox="0 0 24 24">
          <path
            d="M14 5.75L20.25 12L14 18.25M19.5 12H3.75"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </symbol>
        {/* arrow-up-right */}
        <symbol id="arrow-up-right" viewBox="0 0 24 24">
          <path
            d="M18.25 15.25V5.75H8.75M6 18L17.6002 6.39983"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </symbol>
        {/* square-arrow-top-right */}
        <symbol id="square-arrow-top-right" viewBox="0 0 24 24">
          <path
            d="M18.25 14V20.25H3.75V5.75H9.25M13.75 3.75H20.25V10.25M11 13L19.5 4.5"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </symbol>
        {/* rescue-ring */}
        <symbol id="rescue-ring" viewBox="0 0 24 24">
          <path
            d="M18.5 5.5L14.8659 9.13411M9.1289 14.8711L5.5 18.5M5.5 5.5L9.1289 9.1289M14.8659 14.8659L18.5 18.5M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12ZM16.25 12C16.25 14.3472 14.3472 16.25 12 16.25C9.65279 16.25 7.75 14.3472 7.75 12C7.75 9.65279 9.65279 7.75 12 7.75C14.3472 7.75 16.25 9.65279 16.25 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="transparent"
          />
        </symbol>
        {/* bubble-annotation */}
        <symbol id="bubble-annotation" viewBox="0 0 24 24">
          <path
            d="M2.75 8.75C2.75 5.98858 4.98858 3.75 7.75 3.75H16.25C19.0114 3.75 21.25 5.98858 21.25 8.75V15.25C21.25 18.0114 19.0114 20.25 16.25 20.25H2.75V8.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
          <path
            d="M6.75 12C6.75 12.4142 7.08579 12.75 7.5 12.75C7.91421 12.75 8.25 12.4142 8.25 12C8.25 11.5858 7.91421 11.25 7.5 11.25C7.08579 11.25 6.75 11.5858 6.75 12ZM11.25 12C11.25 12.4142 11.5858 12.75 12 12.75C12.4142 12.75 12.75 12.4142 12.75 12C12.75 11.5858 12.4142 11.25 12 11.25C11.5858 11.25 11.25 11.5858 11.25 12ZM15.75 12C15.75 12.4142 16.0858 12.75 16.5 12.75C16.9142 12.75 17.25 12.4142 17.25 12C17.25 11.5858 16.9142 11.25 16.5 11.25C16.0858 11.25 15.75 11.5858 15.75 12Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="square"
          />
        </symbol>
        {/* megaphone */}
        <symbol id="megaphone" viewBox="0 0 24 24">
          <path
            d="M18.2461 2.75087H18.9961V1.73438L18.0248 2.03426L18.2461 2.75087ZM18.2461 19.2509L18.0248 19.9675L18.9961 20.2674V19.2509H18.2461ZM2.74609 14.4652H1.99609V15.0186L2.52483 15.1818L2.74609 14.4652ZM2.74609 7.53658L2.52483 6.81996L1.99609 6.98322V7.53658H2.74609ZM13.2825 18.5008L13.5325 17.7937L12.1182 17.2938L11.8683 18.001L13.2825 18.5008ZM18.2461 14.7509C20.3172 14.7509 21.9961 13.072 21.9961 11.0009H20.4961C20.4961 12.2435 19.4887 13.2509 18.2461 13.2509V14.7509ZM18.2461 8.75087C19.4887 8.75087 20.4961 9.75824 20.4961 11.0009H21.9961C21.9961 8.92981 20.3172 7.25087 18.2461 7.25087V8.75087ZM17.4961 2.75087V19.2509H18.9961V2.75087H17.4961ZM18.4674 18.5343L2.96735 13.7486L2.52483 15.1818L18.0248 19.9675L18.4674 18.5343ZM18.0248 2.03426L2.52483 6.81996L2.96735 8.2532L18.4674 3.46749L18.0248 2.03426ZM3.49609 14.4652V7.53658H1.99609V14.4652H3.49609ZM9.74609 19.5009C8.50345 19.5009 7.49609 18.4935 7.49609 17.2509H5.99609C5.99609 19.322 7.67503 21.0009 9.74609 21.0009V19.5009ZM11.8683 18.001C11.559 18.8759 10.7246 19.5009 9.74609 19.5009V21.0009C11.38 21.0009 12.7681 19.9563 13.2825 18.5008L11.8683 18.001ZM7.49609 17.2509V15.7509H5.99609V17.2509H7.49609ZM5.99829 6.25087V15.7509H7.49829V6.25087H5.99829Z"
            fill="currentColor"
          />
        </symbol>
        {/* graduate-cap */}
        <symbol id="graduate-cap" viewBox="0 0 24 24">
          <path
            d="M4.75081 10.9688V16.6406L12.0008 20.25L19.2508 16.6406V10.9688M23.1009 9.75V15.25M12.0008 3.75L1.80078 9L12.0008 14.25L22.2009 9L12.0008 3.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* play-circle */}
        <symbol id="play-circle" viewBox="0 0 24 24">
          <path d="M10 15.75V8.25L15.5 12L10 15.75Z" fill="currentColor" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
            fill="currentColor"
          />
        </symbol>
        {/* play */}
        <symbol id="play" viewBox="0 0 24 24">
          <path
            d="M5.75 3.31131L20.5208 12L5.75 20.6887V3.31131Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="transparent"
          />
        </symbol>
        {/* book */}
        <symbol id="book" viewBox="0 0 24 24">
          <path
            d="M19.25 2.75H20V2H19.25V2.75ZM19.25 21.25V22H20V21.25H19.25ZM19.25 16.75V17.5H20V16.75H19.25ZM8.75 6.25H8V7.75H8.75V6.25ZM15.25 7.75H16V6.25H15.25V7.75ZM8.75 10.25H8V11.75H8.75V10.25ZM12.25 11.75H13V10.25H12.25V11.75ZM6.75 3.5H19.25V2H6.75V3.5ZM18.5 2.75V21.25H20V2.75H18.5ZM19.25 20.5H6.75V22H19.25V20.5ZM5.5 19.25V4.75H4V19.25H5.5ZM6.75 20.5C6.05964 20.5 5.5 19.9404 5.5 19.25H4C4 20.7688 5.23122 22 6.75 22V20.5ZM6.75 2C5.23122 2 4 3.23122 4 4.75H5.5C5.5 4.05964 6.05964 3.5 6.75 3.5V2ZM18.5 12V16.75H20V12H18.5ZM19.25 16H7V17.5H19.25V16ZM7 22H10V20.5H7V22ZM4 19C4 20.6569 5.34315 22 7 22V20.5C6.17157 20.5 5.5 19.8284 5.5 19H4ZM7 16C5.34315 16 4 17.3431 4 19H5.5C5.5 18.1716 6.17157 17.5 7 17.5V16ZM8.75 7.75H15.25V6.25H8.75V7.75ZM8.75 11.75H12.25V10.25H8.75V11.75Z"
            fill="currentColor"
          />
        </symbol>
        {/* bookmark-check */}
        <symbol id="bookmark-check" viewBox="0 0 24 24">
          <path
            d="M19.25 2.75H20V2H19.25V2.75ZM19.25 21L18.8877 21.6567L20 22.2704V21H19.25ZM4.75 21H4V22.2704L5.11231 21.6567L4.75 21ZM4.75 2.75V2H4V2.75H4.75ZM12 17L12.3623 16.3433L12 16.1434L11.6377 16.3433L12 17ZM9.88033 9.81968L9.35 9.28935L8.28934 10.35L8.81967 10.8803L9.88033 9.81968ZM11 12L10.4697 12.5303L11 13.0607L11.5303 12.5303L11 12ZM15.3803 8.68034L15.9107 8.15001L14.85 7.08935L14.3197 7.61968L15.3803 8.68034ZM18.5 2.75V21H20V2.75H18.5ZM5.5 21V2.75H4V21H5.5ZM4.75 3.5H19.25V2H4.75V3.5ZM19.6123 20.3433L12.3623 16.3433L11.6377 17.6567L18.8877 21.6567L19.6123 20.3433ZM11.6377 16.3433L4.38769 20.3433L5.11231 21.6567L12.3623 17.6567L11.6377 16.3433ZM8.81967 10.8803L10.4697 12.5303L11.5303 11.4697L9.88033 9.81968L8.81967 10.8803ZM11.5303 12.5303L15.3803 8.68034L14.3197 7.61968L10.4697 11.4697L11.5303 12.5303Z"
            fill="currentColor"
          />
        </symbol>
        {/* shield-check */}
        <symbol id="shield-check" viewBox="0 0 24 24">
          <path
            d="M8.75 12L10.9167 14.25L15.25 9.75M12 2.25L3.75 5.75V13C3.75 17.5563 7.44365 21.25 12 21.25C16.5563 21.25 20.25 17.5563 20.25 13V5.75L12 2.25Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* square-check */}
        <symbol id="square-check" viewBox="0 0 24 24">
          <path
            d="M20.25 3.75H21V3H20.25V3.75ZM20.25 20.25V21H21V20.25H20.25ZM3.75 20.25H3V21H3.75V20.25ZM3.75 3.75V3H3V3.75H3.75ZM10.9968 14.4142L10.4664 14.9445L10.9968 15.4749L11.5271 14.9445L10.9968 14.4142ZM16.0271 10.4445L16.5574 9.91419L15.4968 8.85353L14.9664 9.38386L16.0271 10.4445ZM9.52711 11.8839L8.99678 11.3535L7.93612 12.4142L8.46645 12.9445L9.52711 11.8839ZM19.5 3.75V20.25H21V3.75H19.5ZM20.25 19.5H3.75V21H20.25V19.5ZM4.5 20.25V3.75H3V20.25H4.5ZM3.75 4.5H20.25V3H3.75V4.5ZM11.5271 14.9445L16.0271 10.4445L14.9664 9.38386L10.4664 13.8839L11.5271 14.9445ZM8.46645 12.9445L10.4664 14.9445L11.5271 13.8839L9.52711 11.8839L8.46645 12.9445Z"
            fill="currentColor"
          />
        </symbol>
        {/* square-check-empty */}
        <symbol id="square-check-empty" viewBox="0 0 24 24">
          <path
            d="M20.25 3.75H21V3H20.25V3.75ZM20.25 20.25V21H21V20.25H20.25ZM3.75 20.25H3V21H3.75V20.25ZM3.75 3.75V3H3V3.75H3.75ZM19.5 3.75V20.25H21V3.75H19.5ZM20.25 19.5H3.75V21H20.25V19.5ZM4.5 20.25V3.75H3V20.25H4.5ZM3.75 4.5H20.25V3H3.75V4.5Z"
            fill="currentColor"
          />
        </symbol>
        {/* folder */}
        <symbol id="folder" viewBox="0 0 24 24">
          <path
            d="M16.25 5.75H20.25V10.75M20.25 10.75H21.25V20.25H2.75V7.75H3.75M20.25 10.75H16.25M3.75 7.75V3.75H16.25V10.75M3.75 7.75H8.75L11.75 10.75H16.25"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="transparent"
          />
        </symbol>
        {/* circle-question-mark */}
        <symbol id="circle-question-mark" viewBox="0 0 24 24">
          <path
            d="M9.75 9.25V7.75H14.25V10.5L12 12V13.25M12 16.25V16.26M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* circle-arrow */}
        <symbol id="circle-arrow" viewBox="0 0 24 24">
          <path
            d="M13 21C13.5523 21 14 20.5523 14 20C14 19.4477 13.5523 19 13 19C12.4477 19 12 19.4477 12 20C12 20.5523 12.4477 21 13 21Z"
            fill="currentColor"
          />
          <path
            d="M21 11C21 10.4477 20.5523 9.99998 20 9.99998C19.4477 9.99998 19 10.4477 19 11C19 11.5523 19.4477 12 20 12C20.5523 12 21 11.5523 21 11Z"
            fill="currentColor"
          />
          <path
            d="M19.9295 14.2679C20.4078 14.5441 20.5716 15.1557 20.2955 15.634C20.0193 16.1123 19.4078 16.2761 18.9295 16C18.4512 15.7238 18.2873 15.1123 18.5634 14.634C18.8396 14.1557 19.4512 13.9918 19.9295 14.2679Z"
            fill="currentColor"
          />
          <path
            d="M17.3676 19.2942C17.8459 19.0181 18.0098 18.4065 17.7336 17.9282C17.4575 17.4499 16.8459 17.286 16.3676 17.5621C15.8893 17.8383 15.7254 18.4499 16.0016 18.9282C16.2777 19.4065 16.8893 19.5703 17.3676 19.2942Z"
            fill="currentColor"
          />
          <path
            d="M18.9269 7.99998C18.4487 8.27612 17.8371 8.11225 17.5609 7.63396C17.2848 7.15566 17.4487 6.54407 17.9269 6.26793C18.4052 5.99179 19.0168 6.15566 19.293 6.63396C19.5691 7.11225 19.4052 7.72384 18.9269 7.99998Z"
            fill="currentColor"
          />
          <path
            d="M10 14.75V14H8.5V14.75H10ZM9.25 20.25V21H10V20.25H9.25ZM3.75 19.5H3V21H3.75V19.5ZM8.5 14.75V20.25H10V14.75H8.5ZM9.25 19.5H3.75V21H9.25V19.5ZM4.5 12C4.5 7.85786 7.85786 4.5 12 4.5V3C7.02944 3 3 7.02944 3 12H4.5ZM9.27283 18.989C6.47789 17.8975 4.5 15.1788 4.5 12H3C3 15.8172 5.37607 19.0775 8.72717 20.3862L9.27283 18.989ZM12 4.5C13.414 4.5 14.7344 4.89056 15.8619 5.56926L16.6355 4.28413C15.281 3.46879 13.6941 3 12 3V4.5Z"
            fill="currentColor"
          />
        </symbol>
        {/* trash-can */}
        <symbol id="trash-can" viewBox="0 0 24 24">
          <path
            d="M5.75 5.75V21.25H18.25V5.75M5.75 5.75H18.25M5.75 5.75H3.75M18.25 5.75H20.25M14 10.75V16.25M10 10.75V16.25M9.02154 5.38866C9.19999 3.90218 10.4654 2.75 12 2.75C13.5346 2.75 14.8 3.90218 14.9785 5.38866"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* settings-gear */}
        <symbol id="settings-gear" viewBox="0 0 24 24">
          <path
            d="M9.225 5.525L6.21875 4.83125L4.83125 6.21875L5.525 9.225L2.75 11.075V12.925L5.525 14.775L4.83125 17.7812L6.21875 19.1687L9.225 18.475L11.075 21.25H12.925L14.775 18.475L17.7812 19.1687L19.1687 17.7812L18.475 14.775L21.25 12.925V11.075L18.475 9.225L19.1687 6.21875L17.7812 4.83125L14.775 5.525L12.925 2.75H11.075L9.225 5.525Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="transparent"
          />
          <path
            d="M14.75 12C14.75 13.5188 13.5188 14.75 12 14.75C10.4812 14.75 9.25 13.5188 9.25 12C9.25 10.4812 10.4812 9.25 12 9.25C13.5188 9.25 14.75 10.4812 14.75 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="transparent"
          />
        </symbol>
        {/* floppy-disk-1 */}
        <symbol id="floppy-disk-1" viewBox="0 0 24 24">
          <path
            d="M7.75 3.75V8.25H16.25V3.75M3.75 3.75V20.25H20.25V6.75L17.25 3.75H3.75ZM7.75 12.75V20.25H16.25V12.75H7.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* floppy-disk-2 */}
        <symbol id="floppy-disk-2" viewBox="0 0 24 24">
          <path
            d="M8.75 4V8.25H15.25V4M3.75 3.75V20.25H20.25V6.75L17.25 3.75H3.75ZM15.25 14.25C15.25 16.0449 13.7949 17.5 12 17.5C10.2051 17.5 8.75 16.0449 8.75 14.25C8.75 12.4551 10.2051 11 12 11C13.7949 11 15.25 12.4551 15.25 14.25Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* medal */}
        <symbol id="medal" viewBox="0 0 24 24">
          <path
            d="M7.75 15.25V22L12 20L16.25 22V15.25M19.25 9C19.25 13.0041 16.0041 16.25 12 16.25C7.99594 16.25 4.75 13.0041 4.75 9C4.75 4.99594 7.99594 1.75 12 1.75C16.0041 1.75 19.25 4.99594 19.25 9Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* wreath */}
        <symbol id="wreath" viewBox="0 0 24 24">
          <path
            d="M9.40545 18.1053C7.83173 19.4414 6.26907 19.2749 4.6926 17.6057C8.35815 13.9616 12.9218 19.2418 8.8818 21.25M14.5945 18.1053C16.1683 19.4414 17.7309 19.2749 19.3074 17.6057C15.6419 13.9616 11.0782 19.2418 15.1182 21.25M6.78495 15.166C6.20088 12.6898 4.69907 11.8277 2.25 12.563C2.83406 15.0392 4.33587 15.9012 6.78495 15.166ZM5.57581 11.7024C6.31536 9.26759 5.44829 7.77454 2.95755 7.19388C2.218 9.62867 3.08507 11.1217 5.57581 11.7024ZM6.71761 2.75C4.57685 4.14255 4.27572 5.84039 5.8083 7.87688C7.94907 6.48432 8.2502 4.78649 6.71761 2.75ZM17.2151 15.166C17.7991 12.6898 19.3009 11.8277 21.75 12.563C21.1659 15.0392 19.6641 15.9012 17.2151 15.166ZM18.4242 11.7024C17.6846 9.26759 18.5517 7.77454 21.0424 7.19388C21.782 9.62867 20.9149 11.1217 18.4242 11.7024ZM17.2824 2.75C19.4232 4.14255 19.7243 5.84039 18.1917 7.87688C16.0509 6.48432 15.7498 4.78649 17.2824 2.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* chevron-large-down */}
        <symbol id="chevron-large-down" viewBox="0 0 24 24">
          <path
            d="M21.25 9.75L12 15.25L2.75 9.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* chevron-bottom */}
        <symbol id="chevron-bottom" viewBox="0 0 24 24">
          <path
            d="M20 9L12 17L4 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* chevron-right */}
        <symbol id="chevron-right" viewBox="0 0 24 24">
          <path
            d="M9 4L17 12L9 20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* chevron-left */}
        <symbol id="chevron-left" viewBox="0 0 24 24">
          <path
            d="M15 20L7 12L15 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* sparkle */}
        <symbol id="sparkle" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22 12C15.0556 12 12 15.0556 12 22C12 15.0556 8.94444 12 2 12C8.94444 12 12 8.94444 12 2C12 8.94444 15.0556 12 22 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="transparent"
          />
        </symbol>
        {/* arrow-box-left */}
        <symbol id="arrow-box-left" viewBox="0 0 24 24">
          <path
            d="M11.25 20.25H3.75V3.75H11.25M9 12H19.5M15.75 16.5L20.25 12L15.75 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* lock */}
        <symbol id="lock" viewBox="0 0 24 24">
          <path
            d="M4.75 9.75V9H4V9.75H4.75ZM19.25 9.75H20V9H19.25V9.75ZM19.25 21.25V22H20V21.25H19.25ZM4.75 21.25H4V22H4.75V21.25ZM15.5 9.75C15.5 10.1642 15.8358 10.5 16.25 10.5C16.6642 10.5 17 10.1642 17 9.75H15.5ZM7 9.75C7 10.1642 7.33579 10.5 7.75 10.5C8.16421 10.5 8.5 10.1642 8.5 9.75H7ZM12.75 14V13.25H11.25V14H12.75ZM11.25 17V17.75H12.75V17H11.25ZM4.75 10.5H19.25V9H4.75V10.5ZM18.5 9.75V21.25H20V9.75H18.5ZM19.25 20.5H4.75V22H19.25V20.5ZM5.5 21.25V9.75H4V21.25H5.5ZM15.5 7V9.75H17V7H15.5ZM8.5 9.75V7H7V9.75H8.5ZM12 3.5C13.933 3.5 15.5 5.067 15.5 7H17C17 4.23858 14.7614 2 12 2V3.5ZM12 2C9.23858 2 7 4.23858 7 7H8.5C8.5 5.067 10.067 3.5 12 3.5V2ZM11.25 14V17H12.75V14H11.25Z"
            fill="currentColor"
          />
        </symbol>
        {/* magnifying-glass */}
        <symbol id="magnifying-glass" viewBox="0 0 24 24">
          <path
            d="M20 20L16.1265 16.1265M16.1265 16.1265C17.4385 14.8145 18.25 13.002 18.25 11C18.25 6.99594 15.0041 3.75 11 3.75C6.99594 3.75 3.75 6.99594 3.75 11C3.75 15.0041 6.99594 18.25 11 18.25C13.002 18.25 14.8145 17.4385 16.1265 16.1265Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* filter-1 */}
        <symbol id="filter-1" viewBox="0 0 24 24">
          <path
            d="M20.25 3.75H3.75V8L9.75 14V21L14.25 20V14L20.25 8V3.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="transparent"
          />
        </symbol>
        {/* fast-forward */}
        <symbol id="fast-forward" viewBox="0 0 24 24">
          <path
            d="M12.3742 11.3303L4.75 5.5V18.5L12.3742 12.6697M12.75 5.5L21.25 12L12.75 18.5V5.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* crystal-ball */}
        <symbol id="crystal-ball" viewBox="0 0 24 24">
          <path
            d="M6.98553 18.5C4.72683 16.9348 3.25 14.3409 3.25 11.4057C3.25 6.62531 7.16751 2.75 12 2.75C16.8325 2.75 20.75 6.62531 20.75 11.4057C20.75 14.3409 19.2732 16.9348 17.0145 18.5M6.75 18.75L5.75 21.25H18.25L17.25 18.75H6.75Z"
            stroke="currentColor"
            fill="transparent"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
          <path
            d="M15.5 9C15.5 9 15.2645 10.173 14.7188 10.7188C14.173 11.2645 13 11.5 13 11.5C13 11.5 14.173 11.7355 14.7188 12.2812C15.2645 12.827 15.5 14 15.5 14C15.5 14 15.7355 12.827 16.2812 12.2812C16.827 11.7355 18 11.5 18 11.5C18 11.5 16.827 11.2645 16.2812 10.7188C15.7355 10.173 15.5 9 15.5 9Z"
            fill="currentColor"
          />
          <path
            d="M13 6C13 6 12.8116 6.93838 12.375 7.375C11.9384 7.81162 11 8 11 8C11 8 11.9384 8.18838 12.375 8.625C12.8116 9.06162 13 10 13 10C13 10 13.1884 9.06162 13.625 8.625C14.0616 8.18838 15 8 15 8C15 8 14.0616 7.81162 13.625 7.375C13.1884 6.93838 13 6 13 6Z"
            fill="currentColor"
          />
        </symbol>
        {/* circle-dots-center */}
        <symbol id="circle-dots-center" viewBox="0 0 24 24">
          <path
            d="M8 12V11.99M8.25 12C8.25 12.1381 8.13807 12.25 8 12.25C7.86193 12.25 7.75 12.1381 7.75 12C7.75 11.8619 7.86193 11.75 8 11.75C8.13807 11.75 8.25 11.8619 8.25 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="transparent"
          />
          <path
            d="M12 12V11.99M12.25 12C12.25 12.1381 12.1381 12.25 12 12.25C11.8619 12.25 11.75 12.1381 11.75 12C11.75 11.8619 11.8619 11.75 12 11.75C12.1381 11.75 12.25 11.8619 12.25 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="transparent"
          />
          <path
            d="M16 12V11.99M16.25 12C16.25 12.1381 16.1381 12.25 16 12.25C15.8619 12.25 15.75 12.1381 15.75 12C15.75 11.8619 15.8619 11.75 16 11.75C16.1381 11.75 16.25 11.8619 16.25 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="transparent"
          />
          <path
            d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="transparent"
          />
        </symbol>
        {/* arrow-out-of-box */}
        <symbol id="arrow-out-of-box" viewBox="0 0 24 24">
          <path
            d="M12 3.75V15M12 3.75L16.5 8.25M12 3.75L7.5 8.25M20.25 12.75V18.25C20.25 19.3546 19.3546 20.25 18.25 20.25H5.75C4.64543 20.25 3.75 19.3546 3.75 18.25V12.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
          />
        </symbol>
        {/* cross-large */}
        <symbol id="cross-large" viewBox="0 0 24 24">
          <path
            d="M4.75 4.75L19.25 19.25M19.25 4.75L4.75 19.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </symbol>
        {/* circle-x */}
        <symbol id="circle-x" viewBox="0 0 24 24">
          <path
            d="M15 9L9 15M15 15L9 9M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="transparent"
          />
        </symbol>
        {/* square-x */}
        <symbol id="square-x" viewBox="0 0 24 24">
          <path
            d="M15.5303 9.53033C15.8232 9.23744 15.8232 8.76256 15.5303 8.46967C15.2374 8.17678 14.7626 8.17678 14.4697 8.46967L15.5303 9.53033ZM8.46967 14.4697C8.17678 14.7626 8.17678 15.2374 8.46967 15.5303C8.76256 15.8232 9.23744 15.8232 9.53033 15.5303L8.46967 14.4697ZM14.4697 15.5303C14.7626 15.8232 15.2374 15.8232 15.5303 15.5303C15.8232 15.2374 15.8232 14.7626 15.5303 14.4697L14.4697 15.5303ZM9.53033 8.46967C9.23744 8.17678 8.76256 8.17678 8.46967 8.46967C8.17678 8.76256 8.17678 9.23744 8.46967 9.53033L9.53033 8.46967ZM19.5 6.95V17.05H21V6.95H19.5ZM17.05 19.5H6.95V21H17.05V19.5ZM4.5 17.05V6.95H3V17.05H4.5ZM6.95 4.5H17.05V3H6.95V4.5ZM6.95 19.5C6.37757 19.5 5.99336 19.4994 5.69748 19.4752C5.41035 19.4518 5.27307 19.4099 5.18251 19.3638L4.50153 20.7003C4.83879 20.8721 5.19545 20.9392 5.57533 20.9703C5.94646 21.0006 6.40232 21 6.95 21V19.5ZM3 17.05C3 17.5977 2.99942 18.0535 3.02974 18.4247C3.06078 18.8046 3.12789 19.1612 3.29973 19.4985L4.63624 18.8175C4.5901 18.7269 4.54822 18.5896 4.52476 18.3025C4.50058 18.0066 4.5 17.6224 4.5 17.05H3ZM5.18251 19.3638C4.94731 19.2439 4.75608 19.0527 4.63624 18.8175L3.29973 19.4985C3.56338 20.0159 3.98408 20.4366 4.50153 20.7003L5.18251 19.3638ZM19.5 17.05C19.5 17.6224 19.4994 18.0066 19.4752 18.3025C19.4518 18.5896 19.4099 18.7269 19.3638 18.8175L20.7003 19.4985C20.8721 19.1612 20.9392 18.8046 20.9703 18.4247C21.0006 18.0535 21 17.5977 21 17.05H19.5ZM17.05 21C17.5977 21 18.0535 21.0006 18.4247 20.9703C18.8046 20.9392 19.1612 20.8721 19.4985 20.7003L18.8175 19.3638C18.7269 19.4099 18.5896 19.4518 18.3025 19.4752C18.0066 19.4994 17.6224 19.5 17.05 19.5V21ZM19.3638 18.8175C19.2439 19.0527 19.0527 19.2439 18.8175 19.3638L19.4985 20.7003C20.0159 20.4366 20.4366 20.0159 20.7003 19.4985L19.3638 18.8175ZM21 6.95C21 6.40232 21.0006 5.94646 20.9703 5.57533C20.9392 5.19545 20.8721 4.83879 20.7003 4.50153L19.3638 5.18251C19.4099 5.27307 19.4518 5.41035 19.4752 5.69748C19.4994 5.99336 19.5 6.37757 19.5 6.95H21ZM17.05 4.5C17.6224 4.5 18.0066 4.50058 18.3025 4.52476C18.5896 4.54822 18.7269 4.5901 18.8175 4.63624L19.4985 3.29973C19.1612 3.12789 18.8046 3.06078 18.4247 3.02974C18.0535 2.99942 17.5977 3 17.05 3V4.5ZM20.7003 4.50153C20.4366 3.98408 20.0159 3.56338 19.4985 3.29973L18.8175 4.63624C19.0527 4.75608 19.2439 4.94731 19.3638 5.18251L20.7003 4.50153ZM4.5 6.95C4.5 6.37757 4.50058 5.99336 4.52476 5.69748C4.54822 5.41035 4.5901 5.27307 4.63624 5.18251L3.29973 4.50153C3.12789 4.83879 3.06078 5.19545 3.02974 5.57533C2.99942 5.94646 3 6.40232 3 6.95H4.5ZM6.95 3C6.40232 3 5.94646 2.99942 5.57533 3.02974C5.19545 3.06078 4.83879 3.12789 4.50153 3.29973L5.18251 4.63624C5.27307 4.5901 5.41035 4.54822 5.69748 4.52476C5.99336 4.50058 6.37757 4.5 6.95 4.5V3ZM4.63624 5.18251C4.75608 4.94731 4.94731 4.75608 5.18251 4.63624L4.50153 3.29973C3.98408 3.56338 3.56338 3.98408 3.29973 4.50153L4.63624 5.18251ZM14.4697 8.46967L8.46967 14.4697L9.53033 15.5303L15.5303 9.53033L14.4697 8.46967ZM15.5303 14.4697L9.53033 8.46967L8.46967 9.53033L14.4697 15.5303L15.5303 14.4697Z"
            fill="currentColor"
          />
        </symbol>
        {/* moneybag */}
        <symbol id="moneybag" viewBox="0 0 24 24">
          <path
            d="M9.5 8H14.5M9.5 8C9.5 8 3.99996 11 4 16C4.00003 20.0207 7.97931 21 12 21C16.0207 21 20 20.0207 20 16C20 11 14.5 8 14.5 8M9.5 8L8 4C8 4 9.5 3 12 3C14.5 3 16 4 16 4L14.5 8"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="transparent"
          />
        </symbol>
        {/* rocket */}
        <symbol id="rocket" viewBox="0 0 24 24">
          <path
            d="M6.86111 13.25H3.25L6.25 7.75H11.2292M6.86111 13.25L10.75 17.1389M6.86111 13.25L11.2292 7.75M11.2292 7.75C14.0556 4.66667 17.1389 2.75 21.25 2.75C21.25 6.86111 19.3333 9.94444 16.25 12.7708M10.75 17.1389V20.75L16.25 17.75V12.7708M10.75 17.1389L16.25 12.7708M4.80556 21.25H2.75V19.1944C2.75 18.0592 3.6703 17.1389 4.80556 17.1389C5.94081 17.1389 6.86111 18.0592 6.86111 19.1944C6.86111 20.3297 5.94081 21.25 4.80556 21.25Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="transparent"
          />
        </symbol>
        {/* brush-sparkle */}
        <symbol id="brush-sparkle" viewBox="0 0 24 24">
          <path
            d="M8.66667 3.66667L9.5 2L10.3333 3.66667L12 4.5L10.3333 5.33333L9.5 7L8.66667 5.33333L7 4.5L8.66667 3.66667Z"
            fill="currentColor"
          />
          <path
            d="M4.33333 7.33333L5.5 5L6.66667 7.33333L9 8.5L6.66667 9.66667L5.5 12L4.33333 9.66667L2 8.5L4.33333 7.33333Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.5265 5.46594L19.5342 2.47363L7.50391 13.0001H7.5C5.01472 13.0001 3 15.0148 3 17.5001V22.0001H7.5C9.98528 22.0001 12 19.9854 12 17.5001V17.4962L22.5265 5.46594ZM11.6097 15.6644C11.1581 14.6547 10.3454 13.8421 9.33572 13.3904L19.4658 4.5266L20.4735 5.53429L11.6097 15.6644ZM4.5 17.5001C4.5 15.8433 5.84315 14.5001 7.5 14.5001C7.57422 14.5001 7.64768 14.5028 7.72031 14.508C9.20109 14.6151 10.385 15.799 10.4921 17.2798C10.4973 17.3524 10.5 17.4259 10.5 17.5001C10.5 19.157 9.15685 20.5001 7.5 20.5001H4.5V17.5001Z"
            fill="currentColor"
          />
        </symbol>
        {/* fork-knife */}
        <symbol id="fork-knife" viewBox="0 0 24 24">
          <path
            d="M4.75 3.75V10.9688L6.25 12.5156V20.25H9.25V12.5156L10.75 10.9688V3.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
          <path
            d="M7.75 3.75V9.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
          <path
            d="M19.25 20.25V3.75C18.4541 3.75 14.2083 7 13.75 15.25H16.25V20.25H19.25Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* shopping-bag */}
        <symbol id="shopping-bag" viewBox="0 0 24 24">
          <path
            d="M15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8M4.75 3.75L3.75 20.25H20.25L19.25 3.75H4.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* layout-third */}
        <symbol id="layout-third" viewBox="0 0 24 24">
          <path
            d="M20.25 3.75H21.0234V2.97656H20.25V3.75ZM20.25 20.25V21.0234H21.0234V20.25H20.25ZM3.75 20.25H2.97656V21.0234H3.75V20.25ZM3.75 3.75V2.97656H2.97656V3.75H3.75ZM20.25 10.0205H21.0234V8.47363H20.25V10.0205ZM3.75 8.47363H2.97656V10.0205H3.75V8.47363ZM20.25 15.5264H21.0234V13.9795H20.25V15.5264ZM3.75 13.9795H2.97656V15.5264H3.75V13.9795ZM19.4766 3.75V20.25H21.0234V3.75H19.4766ZM20.25 19.4766H3.75V21.0234H20.25V19.4766ZM4.52344 20.25V3.75H2.97656V20.25H4.52344ZM3.75 4.52344H20.25V2.97656H3.75V4.52344ZM3.75 10.0205H20.25V8.47363H3.75V10.0205ZM3.75 15.5264H20.25V13.9795H3.75V15.5264Z"
            fill="currentColor"
          />
        </symbol>
        {/* layout-grid */}
        <symbol id="layout-grid" viewBox="0 0 24 24">
          <path
            d="M3.75 3.75H10.25V10.25H3.75V3.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="transparent"
          />
          <path
            d="M13.75 3.75H20.25V10.25H13.75V3.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="transparent"
          />
          <path
            d="M3.75 13.75H10.25V20.25H3.75V13.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="transparent"
          />
          <path
            d="M13.75 13.75H20.25V20.25H13.75V13.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="transparent"
          />
        </symbol>
        {/* filter-2 */}
        <symbol id="filter-2" viewBox="0 0 24 24">
          <path
            d="M2.75 4.75H21.25M8.75 19.25H15.25M5.75 12H18.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </symbol>
        {/* chevron-double-left */}
        <symbol id="chevron-double-left" viewBox="0 0 24 24">
          <path
            d="M10 16L6 12L10 8M17 16L13 12L17 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* chevron-double-right */}
        <symbol id="chevron-double-right" viewBox="0 0 24 24">
          <path
            d="M14 16L18 12L14 8M7 16L11 12L7 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* chevron-left-small */}
        <symbol id="chevron-left-small" viewBox="0 0 24 24">
          <path
            d="M14 16L10 12L14 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* chevron-right-small */}
        <symbol id="chevron-right-small" viewBox="0 0 24 24">
          <path
            d="M10 16L14 12L10 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* arrows-repeat */}
        <symbol id="arrows-repeat" viewBox="0 0 24 24">
          <path
            d="M17.25 21.25L20.25 18.25L17.25 15.25M6.75 2.75L3.75 5.75L6.75 8.75M5.25 5.75H20.25V10.75M3.75 13.75V18.25H18.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* loader */}
        <symbol id="loader" viewBox="0 0 24 24">
          <path
            d="M12.0003 2.75L12 6.25M12.0003 17.75V21.25M2.75 12.0007H6.25M17.75 12.0007H21.25M5.45948 5.45905L7.93414 7.93414M16.0661 16.0656L18.541 18.5405M5.45976 18.5412L7.93463 16.0664M16.0664 7.93463L18.5412 5.45976"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </symbol>
        {/* group */}
        <symbol id="group" viewBox="0 0 24 24">
          <path
            d="M1.74999 20.25L1.00199 20.1953L0.943146 21H1.74999V20.25ZM14.25 20.25V21H15.0568L14.998 20.1953L14.25 20.25ZM22.5 19.25V20H23.3077L23.2479 19.1945L22.5 19.25ZM10.5 7C10.5 8.38071 9.3807 9.5 7.99999 9.5V11C10.2091 11 12 9.20914 12 7H10.5ZM7.99999 9.5C6.61928 9.5 5.49999 8.38071 5.49999 7H3.99999C3.99999 9.20914 5.79085 11 7.99999 11V9.5ZM5.49999 7C5.49999 5.61929 6.61928 4.5 7.99999 4.5V3C5.79085 3 3.99999 4.79086 3.99999 7H5.49999ZM7.99999 4.5C9.3807 4.5 10.5 5.61929 10.5 7H12C12 4.79086 10.2091 3 7.99999 3V4.5ZM19 7.5C19 8.60457 18.1046 9.5 17 9.5V11C18.933 11 20.5 9.433 20.5 7.5H19ZM17 9.5C15.8954 9.5 15 8.60457 15 7.5H13.5C13.5 9.433 15.067 11 17 11V9.5ZM15 7.5C15 6.39543 15.8954 5.5 17 5.5V4C15.067 4 13.5 5.567 13.5 7.5H15ZM17 5.5C18.1046 5.5 19 6.39543 19 7.5H20.5C20.5 5.567 18.933 4 17 4V5.5ZM2.49799 20.3047C2.64439 18.3025 3.22141 16.5832 4.153 15.3831C5.06737 14.2052 6.33959 13.5 7.99999 13.5V12C5.84778 12 4.14872 12.9424 2.96811 14.4633C1.80472 15.962 1.16304 17.9927 1.00199 20.1953L2.49799 20.3047ZM7.99999 13.5C9.66039 13.5 10.9326 14.2052 11.847 15.3831C12.7786 16.5832 13.3556 18.3025 13.502 20.3047L14.998 20.1953C14.837 17.9927 14.1953 15.962 13.0319 14.4633C11.8513 12.9424 10.1522 12 7.99999 12V13.5ZM1.74999 21H14.25V19.5H1.74999V21ZM17 13.5C18.4362 13.5 19.5308 14.0994 20.3177 15.0977C21.1216 16.1177 21.6244 17.5856 21.7521 19.3055L23.2479 19.1945C23.1051 17.2701 22.5354 15.4881 21.4957 14.1691C20.439 12.8285 18.9189 12 17 12V13.5ZM17 20H22.5V18.5H17V20ZM15.2958 13.8327C15.7909 13.6202 16.3567 13.5 17 13.5V12C16.1654 12 15.397 12.1569 14.7042 12.4543L15.2958 13.8327Z"
            fill="currentColor"
          />
        </symbol>
        {/* wallet */}
        <symbol id="wallet" viewBox="0 0 24 24">
          <path
            d="M19.2493 6.5V4.75H3.94922C3.25886 4.75 2.69922 5.30964 2.69922 6C2.69922 6.69036 3.25886 7.25 3.94922 7.25H21.1992V19.25H4.69922C3.59465 19.25 2.69922 18.3546 2.69922 17.25V6.75M17.2493 13.25C17.2493 13.6642 16.9135 14 16.4993 14C16.0851 14 15.7493 13.6642 15.7493 13.25C15.7493 12.8358 16.0851 12.5 16.4993 12.5C16.9135 12.5 17.2493 12.8358 17.2493 13.25Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* chevron-top-small */}
        <symbol id="chevron-top-small" viewBox="0 0 24 24">
          <path
            d="M8 14L12 10L16 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* chevron-down-small */}
        <symbol id="chevron-down-small" viewBox="0 0 24 24">
          <path
            d="M8 10L12 14L16 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* chevron-grabber-vertical */}
        <symbol id="chevron-grabber-vertical" viewBox="0 0 24 24">
          <path
            d="M8 9L12 5L16 9M16 15L12 19L8 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* circle-check */}
        <symbol id="circle-check" viewBox="0 0 24 24">
          <path
            d="M15 9.5L10.5 15L8.5 13M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* crypto-punk */}
        <symbol id="crypto-punk" viewBox="0 0 24 24">
          <path
            d="M7.25 2.75H16.75M5.75 4.25V9.25M4.25 10.75V13.75M5.75 13.75V21.25M11.25 21.25V19.25H16.75M18.25 17.75V6.75M18.25 6.75V4.25M18.25 6.75H5.75M18.25 6.75H21.25M10.75 13.75H10.76M14.25 15.25H11.75M10.7188 9.94444H10.7291M14.8438 9.94444H14.8541"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </symbol>
        {/*  */}
        <symbol id="person-circle" viewBox="0 0 24 24">
          <path
            d="M6.16318 18.5C7.49405 16.8187 9.52996 15.75 12 15.75C14.47 15.75 16.506 16.8187 17.8368 18.5M15.25 10C15.25 11.7949 13.7949 13.25 12 13.25C10.2051 13.25 8.75 11.7949 8.75 10C8.75 8.20507 10.2051 6.75 12 6.75C13.7949 6.75 15.25 8.20507 15.25 10ZM21.25 12C21.25 6.89137 17.1086 2.75 12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 14.7509 3.95086 17.2214 5.85697 18.9157C7.49061 20.3679 9.6423 21.25 12 21.25C14.3577 21.25 16.5094 20.3679 18.143 18.9157C20.0491 17.2214 21.25 14.7509 21.25 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="transparent"
          />
        </symbol>
        {/* shield-check */}
        <symbol id="shield-check" viewBox="0 0 24 24">
          <path
            d="M9.5 12.25L11 13.75L14.5 10.25M3.75 3.75H20.25V17.75L12 22.25L3.75 17.75V3.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </symbol>
        {/* plus-large */}
        <symbol id="plus-large" viewBox="0 0 24 24">
          <path
            d="M12 3.75V12M12 12V20.25M12 12H3.75M12 12H20.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </symbol>
        {/* plus-small */}
        <symbol id="plus-small" viewBox="0 0 24 24">
          <path
            d="M12 6.75V12M12 12V17.25M12 12H6.75M12 12H17.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </symbol>
        {/* circle-plus */}
        <symbol id="circle-plus" viewBox="0 0 24 24">
          <path
            d="M16.2426 12H7.75736M12 16.2426V7.75736M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* square-plus */}
        <symbol id="square-plus" viewBox="0 0 24 24">
          <path
            d="M20.25 3.75H21V3H20.25V3.75ZM20.25 20.25V21H21V20.25H20.25ZM3.75 20.25H3V21H3.75V20.25ZM3.75 3.75V3H3V3.75H3.75ZM15.25 12.75H16V11.25H15.25V12.75ZM8.75736 11.25H8.00736V12.75H8.75736V11.25ZM11.25 15.2426V15.9926H12.75V15.2426H11.25ZM12.75 8.75736V8.00736H11.25V8.75736H12.75ZM19.5 3.75V20.25H21V3.75H19.5ZM20.25 19.5H3.75V21H20.25V19.5ZM4.5 20.25V3.75H3V20.25H4.5ZM3.75 4.5H20.25V3H3.75V4.5ZM15.25 11.25H8.75736V12.75H15.25V11.25ZM12.75 15.2426V8.75736H11.25V15.2426H12.75Z"
            fill="currentColor"
          />
        </symbol>
        {/* eye-open */}
        <symbol id="eye-open" viewBox="0 0 24 24">
          <path
            d="M2 11.9999L1.32902 11.6649L1.16168 11.9999L1.32902 12.335L2 11.9999ZM22 12L22.671 12.3351L22.8383 12L22.671 11.665L22 12ZM2.67098 12.335C4.9893 7.69276 8.55546 5.5 12 5.50003C15.4445 5.50006 19.0107 7.69287 21.329 12.3351L22.671 11.665C20.1618 6.64061 16.1417 4.00006 12 4.00003C7.85827 4 3.83815 6.64049 1.32902 11.6649L2.67098 12.335ZM1.32902 12.335C3.83815 17.3594 7.85826 19.9999 12 20C16.1417 20 20.1618 17.3595 22.671 12.3351L21.329 11.665C19.0107 16.3072 15.4445 18.5 12 18.5C8.55547 18.4999 4.9893 16.3071 2.67098 11.6649L1.32902 12.335ZM14.5 12C14.5 13.3807 13.3807 14.5 12 14.5V16C14.2091 16 16 14.2092 16 12H14.5ZM12 14.5C10.6193 14.5 9.5 13.3807 9.5 12H8C8 14.2092 9.79086 16 12 16V14.5ZM9.5 12C9.5 10.6193 10.6193 9.50001 12 9.50001V8.00001C9.79086 8.00001 8 9.79087 8 12H9.5ZM12 9.50001C13.3807 9.50001 14.5 10.6193 14.5 12H16C16 9.79087 14.2091 8.00001 12 8.00001V9.50001Z"
            fill="currentColor"
          />
        </symbol>
        {/* eye-slash */}
        <symbol id="eye-slash" viewBox="0 0 24 24">
          <path
            d="M9.1654 4.4207L8.44723 4.63687L8.87955 6.07321L9.59772 5.85705L9.1654 4.4207ZM22 12L22.671 12.3351L22.8383 12L22.671 11.6649L22 12ZM19.1413 14.9666L18.646 15.5298L19.7724 16.5203L20.2677 15.9571L19.1413 14.9666ZM3.28033 2.21966L2.75 1.68933L1.68934 2.74999L2.21967 3.28032L3.28033 2.21966ZM2 11.9999L1.32902 11.6648L1.16168 11.9999L1.32902 12.335L2 11.9999ZM20.7197 21.7803L21.25 22.3107L22.3107 21.25L21.7803 20.7197L20.7197 21.7803ZM6.65566 7.36294L7.25664 6.91425L6.35925 5.71229L5.75827 6.16099L6.65566 7.36294ZM10.0289 10.4619L10.4909 9.87105L9.30914 8.9472L8.84721 9.53807L10.0289 10.4619ZM14.4619 15.1528L15.0528 14.6909L14.1289 13.5091L13.5381 13.9711L14.4619 15.1528ZM17.5232 18.3357L18.1554 17.9323L17.3486 16.6678L16.7164 17.0712L17.5232 18.3357ZM9.59772 5.85705C13.745 4.60877 18.4769 6.62399 21.329 12.3351L22.671 11.6649C19.5775 5.47054 14.1791 2.91164 9.1654 4.4207L9.59772 5.85705ZM20.2677 15.9571C21.1654 14.9364 21.9755 13.7277 22.671 12.3351L21.329 11.6649C20.6865 12.9515 19.9468 14.0507 19.1413 14.9666L20.2677 15.9571ZM12 14.5C10.6193 14.5 9.5 13.3807 9.5 12H8C8 14.2091 9.79086 16 12 16V14.5ZM2.21967 3.28032L20.7197 21.7803L21.7803 20.7197L3.28033 2.21966L2.21967 3.28032ZM2.67098 12.335C3.76814 10.138 5.14803 8.48855 6.65566 7.36294L5.75827 6.16099C4.03839 7.44506 2.5162 9.28757 1.32902 11.6648L2.67098 12.335ZM9.5 12C9.5 11.419 9.69726 10.8862 10.0289 10.4619L8.84721 9.53807C8.31663 10.2168 8 11.0725 8 12H9.5ZM13.5381 13.9711C13.1138 14.3027 12.581 14.5 12 14.5V16C12.9275 16 13.7832 15.6834 14.4619 15.1528L13.5381 13.9711ZM1.32902 12.335C3.16255 16.0065 5.7985 18.4051 8.71589 19.4324C11.6412 20.4625 14.7789 20.0866 17.5232 18.3357L16.7164 17.0712C14.3458 18.5836 11.6879 18.8887 9.21411 18.0176C6.73247 17.1437 4.36597 15.0589 2.67098 11.6648L1.32902 12.335Z"
            fill="currentColor"
          />
        </symbol>
        {/* calendar */}
        <symbol id="calendar" viewBox="0 0 24 24">
          <path
            d="M20.25 7.75V3.75H3.75V7.75M20.25 7.75V20.25H3.75V7.75M20.25 7.75H3.75M7.75 11.75H8.25V12.25H7.75V11.75ZM7.75 15.75H8.25V16.25H7.75V15.75ZM11.75 11.75H12.25V12.25H11.75V11.75ZM11.75 15.75H12.25V16.25H11.75V15.75ZM15.75 11.75H16.25V12.25H15.75V11.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* shield-check-filled */}
        <symbol id="shield-check-blue" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 5L12 2L21 5V11.9529C21 14.6903 19.8165 16.7106 18.1412 18.3002C16.4942 19.863 14.3404 21.038 12.3561 22.1086L12 22.3007L11.6439 22.1086C9.65956 21.038 7.5058 19.863 5.85876 18.3002C4.18351 16.7106 3 14.6903 3 11.9529V5ZM15.8107 9.54102L14.75 8.48036L11 12.2304L9.25 10.4804L8.18934 11.541L11 14.3517L15.8107 9.54102Z"
            fill="currentColor"
          />
        </symbol>
        {/* dot-grid */}
        <symbol id="dot-grid" viewBox="0 0 24 24">
          <path d="M7.5 4H11V7.5H7.5V4Z" fill="currentColor" />
          <path d="M13 4H16.5V7.5H13V4Z" fill="currentColor" />
          <path d="M7.5 16.5H11V20H7.5V16.5Z" fill="currentColor" />
          <path d="M13 16.5H16.5V20H13V16.5Z" fill="currentColor" />
          <path d="M7.5 10.15H11V13.75H7.5V10.15Z" fill="currentColor" />
          <path d="M13 10.15H16.5V13.75H13V10.15Z" fill="currentColor" />
        </symbol>
        {/* circles-three */}
        <symbol id="circles-three" viewBox="0 0 24 24">
          <path
            d="M12.75 7.75C12.75 10.5114 10.5114 12.75 7.75 12.75C4.98858 12.75 2.75 10.5114 2.75 7.75C2.75 4.98858 4.98858 2.75 7.75 2.75C10.5114 2.75 12.75 4.98858 12.75 7.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="transparent"
          />
          <path
            d="M17.5 17.75C17.5 19.683 15.933 21.25 14 21.25C12.067 21.25 10.5 19.683 10.5 17.75C10.5 15.817 12.067 14.25 14 14.25C15.933 14.25 17.5 15.817 17.5 17.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="transparent"
          />
          <path
            d="M21.25 9.25C21.25 10.7688 20.0188 12 18.5 12C16.9812 12 15.75 10.7688 15.75 9.25C15.75 7.73122 16.9812 6.5 18.5 6.5C20.0188 6.5 21.25 7.73122 21.25 9.25Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="transparent"
          />
        </symbol>
        {/* circle */}
        <symbol id="circle" viewBox="0 0 24 24">
          <path
            d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
        {/* microphone */}
        <symbol id="microphone" viewBox="0 0 24 24">
          <path
            d="M12.0009 19C15.0764 19 17.7195 17.1489 18.8769 14.5M12.0009 19C8.92546 19 6.28233 17.1489 5.125 14.5M12.0009 19V21.25M12.0009 15.75C9.65372 15.75 7.75093 13.8472 7.75093 11.5V7C7.75093 4.65279 9.65372 2.75 12.0009 2.75C14.3481 2.75 16.2509 4.65279 16.2509 7V11.5C16.2509 13.8472 14.3481 15.75 12.0009 15.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="transparent"
          />
        </symbol>
      </defs>
      <use xlinkHref={`#${name}`} />
    </svg>
  )
}

export { Icon }
