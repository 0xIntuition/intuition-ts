export enum TooltipKey {
  // Header tooltips
  TOOLTIP_TOGGLE = 'TOOLTIP_TOGGLE',
  THEME_TOGGLE = 'THEME_TOGGLE',
  HISTORY_VIEW = 'HISTORY_VIEW',
  OPTIONS_MENU = 'OPTIONS_MENU',
  NETWORK_STATUS_MAINNET = 'NETWORK_STATUS_MAINNET',
  NETWORK_STATUS_TESTNET = 'NETWORK_STATUS_TESTNET',

  // Main UI tooltips
  LOAD_CSV = 'LOAD_CSV',
  ADD_ROW = 'ADD_ROW',
  DELETE_ROWS = 'DELETE_ROWS',
  PUBLISH_ATOMS = 'PUBLISH_ATOMS',
  SAVE_CSV = 'SAVE_CSV',
  TAG_ATOMS = 'TAG_ATOMS',
  CREATE_TAG = 'CREATE_TAG',
  SEARCH = 'SEARCH',
  SEND_TO_LLM = 'SEND_TO_LLM',
}

const tooltipMap: Record<TooltipKey, string> = {
  // Header tooltips
  [TooltipKey.TOOLTIP_TOGGLE]: 'Toggle display tooltips',
  [TooltipKey.THEME_TOGGLE]: 'Toggle dark/light mode',
  [TooltipKey.HISTORY_VIEW]: 'View Your History',
  [TooltipKey.OPTIONS_MENU]: 'Options menu not available yet',
  [TooltipKey.NETWORK_STATUS_MAINNET]: 'Data Populator is connected to Base',
  [TooltipKey.NETWORK_STATUS_TESTNET]:
    'Data Populator is connected to Base Sepolia',

  // Main UI tooltips
  [TooltipKey.LOAD_CSV]:
    'Loads a .csv file from disk and performs basic proofreading - see documentation for formatting requirements.',
  [TooltipKey.ADD_ROW]: 'Add a new row matching the existing schema',
  [TooltipKey.DELETE_ROWS]:
    'This will delete the rows you have currently selected using the checkboxes on the right',
  [TooltipKey.PUBLISH_ATOMS]:
    'Begins the process of uploading the selected atoms to the Intuition System',
  [TooltipKey.SAVE_CSV]:
    'Saves the current state of the schema to disk. Useful after proofreading.',
  [TooltipKey.TAG_ATOMS]:
    'Tags selected atoms with the specified tag arguments. The atoms must be published first, and the tag must be created.',
  [TooltipKey.CREATE_TAG]:
    'Creates a tag atom using the specified arguments above. Do this before tagging atoms.',
  [TooltipKey.SEARCH]: 'Not available at this time.',
  [TooltipKey.SEND_TO_LLM]: 'Not available at this time.',
}

export function getTooltip(key: TooltipKey): string {
  return tooltipMap[key]
}
