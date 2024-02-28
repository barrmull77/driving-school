# REQUIREMENTS

## General Requirements

- You need to replicate the design as it is shown in the figma.
    https://www.figma.com/file/CptAdZI4lrERe7ZRAYJrvr/Yaak_FE-Engineer_Homework?type=design&node-id=901%3A54&mode=design&t=ZbKb5Pkd23lYHgcN-1
    - ### Specifically, the following is absolutely required:
        - The general layout and design of the `Drives list`.
            - The navigation.
            - The Grid component
                - The scroll for both vertically and horizontally with fixed columns.
                - When hovering over Data icon it should show a general tooltip with the percentage of some values, the component is already implemented here [frontend/src/components/Progress](frontend/src/components/Progress)
                - When clicking copy icon it should copy ids to the clipboard
                - The bitrate label should show a tooltip on hover with the full bitrate
            - Settings is a dummy page showing title 'Settings'
        - The layout change between desktop and mobile devices.
        - It doesn't need to be pixel perfect, but general functionality should be in place
        - #### Everything else is a bonus and up to you

- **The final solution should be highly optimized and implemented as efficiently as possible. In other words, the number of re-renders of the components and the bundle size on initial load should be as low
  as possible.** For example:
    * You should avoid re-rendering the whole component when only a part of it needs to be updated.

- **The commit history should be granular with descriptive commit comments**

- **You can use any additional libraries, like MUI or whatever you need**

### ESTIMATED TIME: 4-6 hours