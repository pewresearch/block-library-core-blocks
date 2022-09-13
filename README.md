# Block Library Primitives by Pew Research Center
### `(prc-block-library-primitives)`
## Work in Progress, not for production use

A starting point for anyone looking to add functionality and extra control to core blocks, and or create your own custom block library using core blocks. These blocks add much needed functionality to full site editing and is intended to enhance your block theme.

### Blocks Included:
- Cover
- Columns
  - Adds support for CSS grid and grid/column based layout. 
	- Adds a filter for adding a class to the columns element based on innerblocks.
- Column
  - Adds support for CSS grid.
	- Adds a filter for wrapping column contents in an element with a class based on the blocks present in innerblocks.
- Group
- Column
- Group
- Heading
  - Adds `isChapter`.
- Home Link
  - Adds `iconId` and `iconSlug`. Allows you to set a image/svg file for an icon, or, utilizing your own icon library a slug to reference the icon.
- Layout Grid
- Navigation Link
  - Adds `iconId` and `iconSlug`. Allows you to set a image/svg file for an icon, or, utilizing your own icon library a slug to reference the icon.
- Navigation Submenu
  - Adds two styles: `sub-tree` and `sub-expand`. Allows you to change how the submenu opens.
- Social Link
- Spacer
- Table of Contents
  - Supports `isChapter`.
