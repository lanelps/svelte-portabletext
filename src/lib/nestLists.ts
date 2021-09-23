import type {NormalizedBlocks, PortableTextBlocks, PTBlock, PTCustomBlock, PTList} from './ptTypes'

export const LIST_TYPE: PTList['_type'] = '__internal_pt-list'
export const BLOCK_LIST_ITEMS = '__internal_pt-listChildren'

export function assertListItem(block: PTBlock | PTCustomBlock): boolean {
  return (
    block._type === 'block' &&
    typeof block.level === 'number' &&
    ['bullet', 'number'].includes(block.listItem as string)
  )
}

// const DEBUG_COUNT = {
//   topCall: 0,
//   allEntries: 0,
//   blockOnly: 0,
//   inListRoot: 0,
//   nestedItem: 0
// }

/**
 * Takes a list of blocks and nests its lists for proper rendering in <BlockRenderer>.
 * The top-level list becomes of type PTList and includes all of the blocks as its children.
 * List items are regular blocks that can include nested items in block[BLOCK_LIST_ITEMS].
 * Refer to listTransformation.example.ts for a clear view on the transformation.
 */
export default function nestLists(blocks: PortableTextBlocks, level = 1): NormalizedBlocks {
  // DEBUG_COUNT.topCall += 1
  // console.clear()
  // console.table(DEBUG_COUNT)
  return blocks.reduce((normalizedBlocks, entry, curIndex) => {
    // DEBUG_COUNT.allEntries += 1

    // Do nothing about non-list items
    if (!assertListItem(entry)) {
      return [...normalizedBlocks, entry]
    }

    // DEBUG_COUNT.blockOnly += 1
    // Asserting the current entry as a non-custom block
    const curBlock = entry as PTBlock

    // Skip nested blocks as they'll be included in previous items
    if (curBlock.level !== level) {
      return normalizedBlocks
    }

    const followingBlocks = blocks.slice(curIndex + 1)
    const firstNonNested = followingBlocks.indexOf(
      followingBlocks.find((block) => !assertListItem(block) || block.level <= curBlock.level)
    )
    const nestedBlocks = followingBlocks.slice(
      0,
      // If there's none that isn't nested, include all following blocks
      firstNonNested >= 0 ? firstNonNested : undefined
    )
    const parsedBlock: PTBlock = {
      ...curBlock,
      '__internal_pt-listChildren': nestLists(nestedBlocks, level + 1) as PTBlock[]
    }

    // If inside a list type, add the current block as its child
    const previousBlock = normalizedBlocks.slice(-1)[0]
    if (previousBlock?._type === LIST_TYPE) {
      // Asserting the current entry as a non-custom block
      const parentBlock = previousBlock as PTList

      // DEBUG_COUNT.inListRoot += 1
      return [
        ...normalizedBlocks.slice(0, -1),
        {
          ...parentBlock,
          children: [...parentBlock.children, parsedBlock]
        }
      ]
    }

    // DEBUG_COUNT.nestedItem += 1
    return [
      ...normalizedBlocks,
      level === 1
        ? {
            _key: curBlock._key,
            _type: LIST_TYPE,
            listItem: curBlock.listItem,
            children: [parsedBlock]
          }
        : parsedBlock
    ]
  }, [] as NormalizedBlocks)
}
