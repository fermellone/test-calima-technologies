import {
  TInput,
  TRichSelect,
  TButton,
  TRadio,
  TTable,
  TAlert,
} from "vue-tailwind/dist/components";

export default {
  "t-input": {
    component: TInput,
    props: {
      fixedClasses:
        "block w-full text-xs px-3 py-2 transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed",
      classes:
        "text-black placeholder-gray-400 bg-white border-gray-300 focus:border-blue-500 ",
      variants: {
        danger: "border-red-300 bg-red-50 placeholder-red-200 text-red-900",
      },
    },
  },
  "t-rich-select": {
    component: TRichSelect,
    props: {
      fixedClasses: {
        wrapper: "relative w-full text-xs",
        buttonWrapper: "inline-block relative w-full",
        selectButton:
          "w-full flex text-left justify-between items-center px-3 py-2 text-black transition duration-100 ease-in-out border rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed",
        selectButtonLabel: "block truncate",
        selectButtonPlaceholder: "block truncate",
        selectButtonIcon: "fill-current flex-shrink-0 ml-1 h-4 w-4",
        selectButtonClearButton:
          "rounded flex flex-shrink-0 items-center justify-center absolute right-0 top-0 m-2 h-6 w-6 transition duration-100 ease-in-out",
        selectButtonClearIcon: "fill-current h-3 w-3",
        dropdown:
          "absolute w-full z-10 -mt-1 absolute border-b border-l border-r rounded-b shadow-sm z-10",
        optionsList: "overflow-auto",
        searchWrapper: "inline-block w-full",
        searchBox: "inline-block w-full",
        option: "cursor-pointer",
        disabledOption: "opacity-50 cursor-not-allowed",
        highlightedOption: "cursor-pointer",
        selectedOption: "cursor-pointer",
        selectedHighlightedOption: "cursor-pointer",
        optionLabel: "truncate block",
        selectedIcon: "fill-current h-4 w-4",
      },
      classes: {
        selectButton: "bg-white border-gray-300",
        selectButtonLabel: "",
        selectButtonPlaceholder: "text-gray-400",
        selectButtonIcon: "text-gray-600",
        selectButtonClearButton: "hover:bg-blue-100 text-gray-600",
        dropdown: "bg-white border-gray-300",
        dropdownFeedback: "pb-2 px-3 text-gray-400 text-sm",
        loadingMoreResults: "pb-2 px-3 text-gray-400 text-sm",
        searchWrapper: "p-2 placeholder-gray-400",
        searchBox:
          "px-3 py-2 bg-gray-50 text-sm rounded border focus:outline-none focus:shadow-outline border-gray-300",
        optgroup: "text-gray-400 uppercase text-xs py-1 px-2 font-semibold",
        highlightedOption: "bg-blue-100",
        selectedOption:
          "font-semibold bg-gray-100 bg-blue-500 font-semibold text-white",
        selectedHighlightedOption:
          "font-semibold bg-gray-100 bg-blue-600 font-semibold text-white",
        optionContent: "flex justify-between items-center px-3 py-2",
        enterClass: "opacity-0",
        enterActiveClass: "transition ease-out duration-100",
        enterToClass: "opacity-100",
        leaveClass: "opacity-100",
        leaveActiveClass: "transition ease-in duration-75",
        leaveToClass: "opacity-0",
      },
      variants: {
        danger: {
          selectButton: "border-red-300 bg-red-50 text-red-900",
          selectButtonPlaceholder: "text-red-200",
          selectButtonIcon: "text-red-500",
          selectButtonClearButton: "hover:bg-red-200 text-red-500",
          dropdown: "bg-red-50 border-red-300",
        },
      },
    },
  },
  "t-button": {
    component: TButton,
    props: {
      fixedClasses:
        "block px-3 py-2 transition duration-100 ease-in-out border rounded shadow-sm cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed",
      classes:
        "text-white placeholder-gray-400 bg-blue-500 border-gray-300 focus:border-blue-500 ",
      tagName: "button",
      disabled: false,
    },
  },
  "t-table-action-button": {
    component: TButton,
    props: {
      tagName: "a",
      fixedClasses:
        "block w-full text-sm px-0 py-1 transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
      classes:
        "text-white placeholder-gray-400 bg-blue-500 border-gray-300 focus:border-blue-500",
    },
  },
  "t-radio": {
    component: TRadio,
    props: {
      wrapped: true,
    },
  },
  "t-table": {
    component: TTable,
    props: {
      classes: {
        theadTh: "px-3 py-2 font-semibold text-center bg-gray-100 border-b",
      },
    },
  },
  "t-alert": {
    component: TAlert,
    props: {
      fixedClasses:
        "block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed",
      classes: {
        wrapper: "bg-blue-50 border-blue-500",
        body: "text-blue-700",
        close: "text-blue-500 hover:bg-blue-200",
      },
      variants: {
        danger: {
          wrapper: "bg-gray-200 border-gray-500 rounded-b",
          body: "text-gray-700",
          close: "text-gray-500 hover:bg-gray-200",
        },
      },
    },
  },
};
