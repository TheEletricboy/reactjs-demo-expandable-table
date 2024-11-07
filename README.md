#  PrimeIt Technical Assignment (React + TypeScript + Vite)

This repo is composed of a client-side app made in reactjs.

Further down you can find the project's acceptance criteria.

Here's a list of some cool features:
1. scss ready with some useful mixins (for buttons, flex-it-all, hoverstate checks, ...).
2. Routes
3. Contexts
4. VSCODE and eslint rules (make eslint your main formatter) and also repo rules like guaranteeing eol LF (CRLF from windows is known to cause issues on Mac systems).
5. Dark Theme - This applies to every single component and their different visual states (i.e.: buttons which have inverted colours). Persistent over browser sessions in localStorage (it does cause a slight flash on first load as everything gets setup).
6. Translations (2 langs) - with a toggler. Also persistent over browser sessions in localStorage.
7. CSS global vars + comp-specific vars - to maintain a consistent look throughout, allowing for easy overriding in case this project was to become a private library for components for example. Guaranteeing little to no visual inconsistencies whilst allowing other projects to use their own colour pallets (primary, alt, and contrasting colours).
8. Cool ready to go components: Overlay (with a scalable context to handle multiple), Button (very customizable + hover/focus colour changes), ReactComp SVG Icons,...
9. Responsive on every comp level - most if not all comps have some sort of hover/focus ability.
10. Accessibility - steps were taken where possible given the timeframe to make elements more accessible to screen readers.
11. Table Component:
  - TableContext to access info from mock data and other pertinent table state like styles.
  - FiltersContext to access what filters are active.
  - Various styles: including default and a **zebra** stripe style (CSS defines what rows get the style but I've also left some JS logic for more specific styling on certain rows - if more themes are added a TableThemeContext would be handy perhaps).
  - Filters: They are dynamic and based on what is received from the API request (mocked JSON currently).
  - Active Filters Summary: cool labels to show the user which filters are active. This can easily be updated to change the `<select>` background colour rather than having labels, I just wanted to show off a complexity of elements working together with the same table/filter state in conjunction with other data like DarkTheming :D.
12. Various other components.



# Project Setup

```
npm i
npm start
```
Then navigate to `localhost:1001`.

# Acceptance criteria

1. As the core structure you can use any structure you like or you have access to, e.g. tables, spreadsheets, custom structure etc.

2. The column and row headers have hierarchical tree structure. It should be possible to collapse/expand these levels (horizontally for columns, vertically for rows). The table values should react correspondingly (note: values are given they do not have to be calculated). Collapse/Expand should be indicated by a small icon (arrows, plus/minus, whatever you prefer). There could even be multiple headers (like in the rows with articles and measure units), but this is not a must, you can focus on the other tasks.

3. The filtering should be done via dropdowns. The name of the column/dimension should be first, the value/element selection should be second (e.g. "Version" is the dimension, "Actual" is the element). Add at least 2 selections per filter. When an element is selected, the values of the table should be updated and changed. The dropdowns should have different visual states (e.g. clicked, highlighted etc.), the selected element should be highlighted via color or icon or...

4. The data input should be one or multiple jsons with the table and the filtering content. E.g. there could be a row, column, filter section with the dimension/element content, and a data section for the values. Feel free to create the structure like you feel it's best fitting to this task. The dimensions need to be tagged somehow at which position they should appear, the elements need some extra information about their hierarchy level.

5. The complete data should not be preloaded in the script part
Use a function `retrieveData(...)` or similar to get the data from a mock function which provides your hardcoded values.
Use a function `filterChanged(...)` or a version of retrieveData to get the data when a filter is used
Use a function `collapse/expand(...)` or a version of retrieveData to get the data when an element is collapsed/expanded.

Have at least 2 styles for the table 
e.g. zebra style as in the image, and plain white with black borders or similar. Feel free to add any style you like

have a button or similar to switch the styles
Feel free to create any additional visualization function (e.g. hovering, element icons etc.), the table and filters can be in your very unique style, the images below are just an example.

Here is some more information on the data part of the task:
The dataset would look something like this:

Article: {All Articles, Bikes, Motorbikes....}; Region: {Europe, Great Britain, Germany...}; Legal Entity: {11,12, 13, All Entities}; Version:{Actual, Budget}; Currency:{LC,USD;EUR}; Measure:{Units, Unit Price, Gross Revenue}

For each dimension/column you would have several elements.

For these fields you can then set values like e.g.: {key:{Motorbikes, Germany,11,Actual,LC,Units};value:276521}

You do not need to set values for all combinations! It is fine to set some example data in the json so that it is populated when changing the filters. Combinations that have no values should be displayed as 0.

This is just an example, but you can go with this. The data should be filtered by the combo boxes, so e.g. when selecting Legal Entity 12, it should show the data filtered for legal entity 12, with 13, for 13 etc. for each filter.

Remark: as you may noticed, some dimensions like Region, Article, Legal Entity are hierarchical. This should be shown in the application as described in the task document.
