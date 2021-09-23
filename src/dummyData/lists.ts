import type {PortableTextBlocks} from '$lib/ptTypes'
import {NATIVE_MARKS} from '../sharedData/marks'
import {LIST_LEVELS} from '../sharedData/listLevels'

const blocks: PortableTextBlocks = [
  {
    _key: 'block-0',
    _type: 'block',
    children: [
      {
        _key: 'span-1',
        _type: 'span',
        marks: [],
        text: 'Lists'
      }
    ],
    markDefs: [],
    style: 'h2'
  },
  {
    _key: 'block-1',
    _type: 'block',
    children: [
      {
        _key: 'span-1',
        _type: 'span',
        marks: [],
        text: 'Unordered'
      }
    ],
    markDefs: [],
    style: 'h3'
  },
  ...LIST_LEVELS.map(
    (level, i) =>
      ({
        _key: `ul-${1 + i}`,
        _type: 'block',
        children: [
          {
            _key: 'span-1',
            _type: 'span',
            marks: [],
            text: `#${i + 1} Unordered - level ${level} `
          },
          {
            _key: 'span-2',
            _type: 'span',
            marks: Object.keys(NATIVE_MARKS),
            text: 'all formatting stacked!'
          },
          {
            _key: 'span-3',
            _type: 'span',
            marks: [],
            text: ' & '
          },
          {
            _key: 'span-4',
            _type: 'span',
            marks: Object.keys(NATIVE_MARKS).reverse(),
            text: 'all formatting stacked (reversed)!'
          },
          {
            _key: 'span-5',
            _type: 'span',
            marks: [],
            text: ', '
          },
          {
            _key: 'span-6',
            _type: 'span',
            marks: ['jkasdjkhasjhkdasjk', ...Object.keys(NATIVE_MARKS)],
            text: 'invalid mark with all formatting'
          },
          {
            _key: 'span-7',
            _type: 'span',
            marks: [],
            text: ', '
          },
          {
            _key: 'span-8',
            _type: 'span',
            marks: ['mark-1', ...Object.keys(NATIVE_MARKS)],
            text: 'custom mark with all formatting'
          },
          {
            _key: 'span-9',
            _type: 'span',
            marks: [],
            text: ', '
          },
          {
            _key: 'span-10',
            _type: 'span',
            marks: [...Object.keys(NATIVE_MARKS), 'jkasdjkhasjhkdasjk'],
            text: 'invalid mark with all formatting (reversed)'
          },
          {
            _key: 'span-11',
            _type: 'span',
            marks: [],
            text: ' & '
          },
          {
            _key: 'span-12',
            _type: 'span',
            marks: [...Object.keys(NATIVE_MARKS), 'mark-1'],
            text: 'custom mark with all formatting (reversed)'
          },
          ...Object.keys(NATIVE_MARKS).map(
            (mark, idx) =>
              ({
                _key: `span-${13 + idx}`,
                _type: 'span',
                marks: [mark],
                text: mark
              } as any)
          )
        ],
        markDefs: [
          {
            _key: 'mark-1',
            _type: 'blockAbsUrl',
            url: 'sanity.io'
          }
        ],
        style: 'normal',
        level,
        listItem: 'bullet'
      } as any)
  ),
  {
    _key: 'block-3',
    _type: 'block',
    children: [
      {
        _key: 'span-1',
        _type: 'span',
        marks: [],
        text: 'Ordered'
      }
    ],
    markDefs: [],
    style: 'h3'
  },
  ...LIST_LEVELS.map(
    (level, i) =>
      ({
        _key: `ol-${1 + i}`,
        _type: 'block',
        children: [
          {
            _key: 'span-1',
            _type: 'span',
            marks: [],
            text: `#${i + 1} Ordered - level ${level} `
          },
          {
            _key: 'span-2',
            _type: 'span',
            marks: Object.keys(NATIVE_MARKS),
            text: 'all formatting stacked!'
          },
          {
            _key: 'span-3',
            _type: 'span',
            marks: [],
            text: ' & '
          },
          {
            _key: 'span-4',
            _type: 'span',
            marks: Object.keys(NATIVE_MARKS).reverse(),
            text: 'all formatting stacked (reversed)!'
          },
          {
            _key: 'span-5',
            _type: 'span',
            marks: [],
            text: ', '
          },
          {
            _key: 'span-6',
            _type: 'span',
            marks: ['jkasdjkhasjhkdasjk', ...Object.keys(NATIVE_MARKS)],
            text: 'invalid mark with all formatting'
          },
          {
            _key: 'span-7',
            _type: 'span',
            marks: [],
            text: ', '
          },
          {
            _key: 'span-8',
            _type: 'span',
            marks: ['mark-1', ...Object.keys(NATIVE_MARKS)],
            text: 'custom mark with all formatting'
          },
          {
            _key: 'span-9',
            _type: 'span',
            marks: [],
            text: ', '
          },
          {
            _key: 'span-10',
            _type: 'span',
            marks: [...Object.keys(NATIVE_MARKS), 'jkasdjkhasjhkdasjk'],
            text: 'invalid mark with all formatting (reversed)'
          },
          {
            _key: 'span-11',
            _type: 'span',
            marks: [],
            text: ' & '
          },
          {
            _key: 'span-12',
            _type: 'span',
            marks: [...Object.keys(NATIVE_MARKS), 'mark-1'],
            text: 'custom mark with all formatting (reversed)'
          },
          ...Object.keys(NATIVE_MARKS).map(
            (mark, idx) =>
              ({
                _key: `span-${13 + idx}`,
                _type: 'span',
                marks: [mark],
                text: mark
              } as any)
          )
        ],
        markDefs: [
          {
            _key: 'mark-1',
            _type: 'blockAbsUrl',
            url: 'sanity.io'
          }
        ],
        style: 'normal',
        level,
        listItem: 'number'
      } as any)
  )
]

export default blocks
