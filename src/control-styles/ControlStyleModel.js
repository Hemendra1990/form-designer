export class ControlStyleModel {
  /* static BUTTON =[];
    static TEXT_AREA=[];
    static GRID = []; */

  static BUTTON = [
    { label: "Button", value: ".p-button", key: "button" },
    { label: "Label", value: ".p-button-label", key: "buttonLabel" },
    { label: "Button Icon", value: ".p-button-icon", key: "buttonIcon" },
    { label: "Button Image", value: ".img", key: "buttonImage" },
    {
      label: "Active Label",
      value: ".active .p-button-text",
      key: "buttonActionLabel",
    },
    { label: "Active Button", value: ".p-button.active", key: "activeButton" },
  ];

  static TEXT_AREA = [
    { label: "Textarea", value: ".p-fluid.p-inputtext", key: "textarea" },
    {
      label: "Textarea Input",
      value: ".p-inputtextarea.p-inputtext.p-filled",
      key: "textareaInput",
    },
    { label: "Placeholder", value: "::placeholder", key: "placeholder" },
  ];

  static LABEL = [{ label: "Label", value: ".p-float-label", key: "label" }];

  static GRID = [
    {
      label: "Grid Container",
      value: ".treeTableWrapper",
      key: "gridContainer",
    },
    { label: "Table Header", value: ".common-header", key: "tableHeader" },
    {
      label: "Grid Column Header",
      value: ".p-datatable .p-datatable-thead > tr > th",
      key: "gridColumn",
    },
    {
      label: "Grid Body container",
      value: ".p-datatable .p-datatable-tbody > tr",
      key: "gridBodyContainer",
    },
    {
      label: "Header Cell",
      value: ".p-treetable.p-component .p-treetable-thead tr th",
      key: "headerCell",
    },

    {
      label: "Header First Cell",
      value: ".p-treetable.p-component .p-treetable-thead tr th:first-child",
      key: "headerFirstcell",
    },
    {
      label: "Header Last Cell",
      value: ".p-treetable.p-component .p-treetable-thead tr th:last-child",
      key: "headerLastCell",
    },
    {
      label: "Table Header Text",
      value: ".p-header-cell-text",
      key: "tableHeaderText",
    },
    {
      label: "Table Cells",
      value: ".p-treetable .p-treetable-tbody > tr > td",
      key: "tableCells",
    },
    {
      label: "Table First Cells",
      value: ".p-treetable .p-treetable-tbody > tr > td",
      key: "tableFirstCells",
    },
    {
      label: "Table First Cells",
      value: ".p-treetable .p-treetable-tbody tr td:first-child",
      key: "tableFirstCellsFirstChild",
    },
    {
      label: "Table Last Cells",
      value: ".p-treetable .p-treetable-tbody tr td:last-child",
      key: "tableLastCellsLastChild",
    },
    { label: "Custom Cell", value: ".p-custom-cell", key: "customCells" },
    { label: "Cell Text", value: ".p-custom-cell-text span", key: "cellText" },
    { label: "Show More", value: ".more-items", key: "showMore" },
    {
      label: "Tooltip Wrapper",
      value: ".tag-tooltip-wrapper",
      key: "tooltipWrapper",
    },

    {
      label: "Paginator",
      value: ".p-treetable .p-paginator",
      key: "paginator",
    },
    {
      label: "Paginator Input",
      value: "input.paginator-input.p-inputtext",
      key: "paginatorInput",
    },
    {
      label: "Pagintor Icons",
      value: ".p-paginator .p-paginator-icon",
      key: "paginatorIcons",
    },
  ];

  static LISTBOX = [
    { label: "Label", value: ".p-listbox", key: "listbox" },
    { label: "Header", value: ".common-header", key: "listboxHeader" },
    {
      label: "Container ",
      value: ".p-listbox-list-wrapper",
      key: "listboxContainer",
    },
    { label: "Text", value: ".p-listbox-list", key: "listboxListText" },
    { label: "List item", value: ".p-listbox-item", key: "listboxItem" },
  ];

  static INPUTTEXT = [{ label: "Input", value: ".p-inputtext", key: "input" }];

  static INPUTNUMBER = [
    { label: "Label", value: ".p-inputtext", key: "inputNumber" },
    // { label: "Stacked button", value: ".p-inputnumber-stacked", key: "inputStackedButton" },
    // { label: "Horizontal button", value: ".p-inputnumber-horizontal", key: "inputHorizontalButton" },
    // { label: "Vertical button", value: ".p-inputnumber-vertical", key: "inputVerticalButton" },
    { label: "Element", value: ".p-inputnumber-input", key: "inputNumberElement" },
    { label: "Button element", value: ".p-inputnumber-button", key: "inputButtonElement" },
    { label: "Increment button", value: ".p-inputnumber-button-up", key: "inputIncrementButton" },
    { label: "Decrement button", value: ".p-inputnumber-button-down", key: "inputDecrementButton" },
    // { label: "Button icon", value: ".p-inputnumber-button-icon", key: "inputNumberButtonIcon" }
    {
      label: "Stacked button",
      value: ".p-inputnumber-stacked",
      key: "inputStackedButton",
    },
    {
      label: "Horizontal button",
      value: ".p-inputnumber-horizontal",
      key: "inputHorizontalButton",
    },
    {
      label: "Vertical button",
      value: ".p-inputnumber-vertical",
      key: "inputVerticalButton",
    },
    {
      label: "Element",
      value: ".p-inputnumber-input",
      key: "inputNumberElement",
    },
    {
      label: "Button element",
      value: ".p-inputnumber-button",
      key: "inputButtonElement",
    },
    {
      label: "Increment button",
      value: ".p-inputnumber-button-up",
      key: "inputIncrementButton",
    },
    {
      label: "Decrement button",
      value: ".p-inputnumber-button-down",
      key: "inputDecrementButton",
    },
    {
      label: "Button icon",
      value: ".p-inputnumber-button-icon",
      key: "inputNumberButtonIcon",
    },
  ];

  static DROPDOWN = [
    { label: "Placeholder", value: ".p-dropdown-label", key: "dropdownLabel" },
    { label: "Container", value: ".p-dropdown", key: "dropdown" },
    { label: "Trigger", value: ".p-dropdown-trigger", key: "dropdownTrigger" },
    // { label: "Wrapper items", value: ".p-dropdown-items,.p-dropdown-item", key: "itemsWrapper" },
    {
      label: "Filter container",
      value: ".p-dropdown-panel,.p-dropdown-header,.p-dropdown-filter",
      key: "filterContainer",
    },
    //{ label: "Dropdown open", value: ".p-dropdown-open", key: "dropdownOpen" }
  ];

  static FIELDSET = [
    { label: "Fieldset", value: ".p-fieldset", key: "fieldset" },
    {
      label: "Toggleable",
      value: ".p-fieldset-toggleable",
      key: "fieldToggleable",
    },
    { label: "Legend", value: ".p-fieldset-legend", key: "legend" },
    { label: "Content", value: ".p-fieldset-content", key: "fieldsetContent" },
  ];

  static PASSWORD = [
    {
      label: "Content",
      value: ".p-inputtext,.p-password-input",
      key: "passwordContent",
    },
    {
      label: "Container",
      value: ".p-password .p-component .p-inputwrapper .p-inputwrapper-filled",
      key: "passwordBox",
    },
    {
      label: "Strength meter Popup",
      value: ".p-password,.p-password-panel",
      key: "passwordTextStrength",
    },
    {
      label: "Eye icon",
      value:
        ".p-input-icon-right > i:last-of-type, .p-input-icon-right > svg:last-of-type, .p-input-icon-right > .p-input-suffix",
      key: "passwordEyeIcon",
    },
  ];

  static PANEL = [
    { label: "Header", value: ".p-panel-header", key: "panelHeader" },
    { label: "Title", value: ".p-panel-title", key: "panelTitle" },
    {
      label: "Toggle icon",
      value: ".p-panel-titlebar-toggler",
      key: "passwordPanelToggle",
    },
    { label: "Content", value: ".p-panel-content", key: "panelContent" },
  ];

  static RADIO = [
    //  { label: "Label", value: ".p-radiobutton-label", key: "radioLabel" },
    { label: "Label", value: ".field-radiobutton ", key: "containerElement" },
    { label: "Button", value: ".p-radiobutton-box", key: "containerIcon" },
    {
      label: "Selected Button",
      value: ".p-radiobutton .p-radiobutton-box.p-highlight",
      key: "activeButton",
    },
  ];

  static AUTOCOMPLETE = [
    {
      label: "Autocomplete",
      value: ".p-autocomplete-input",
      key: "autocompleteBody",
    },
    {
      label: "Suggestion container",
      value: ".p-autocomplete-panel .p-autocomplete-items",
      key: "suggestionContainer",
    },
    //{ label: "Suggestion item", value: " .p-autocomplete-item", key: "suggestionItem" }
  ];

  static MULTISELECT = [
    {
      label: "Selected value",
      value: ".p-multiselect-label-container",
      key: "multiSelectLabel",
    },
    {
      label: "Multiselect Input Wrapper",
      value: ".p-multiselect",
      key: "multiSelectElement",
    },
    {
      label: "Dropdown Button",
      value: ".p-multiselect-trigger",
      key: "multiSelectDropdownButton",
    },
    //{ label: "Filter", value: ".p-inputtext,.p-multiselect-filter", key: "multiSelectFilterContainer" },
    //{ label: "Overlay panel", value: ".p-multiselect-items-wrapper", key: "multiSelectOverlayPanel" },
    {
      label: "Options",
      value: ".p-multiselect-panel,.p-multiselect-items",
      key: "multiSelectPanelItems",
    },
  ];

  static getTextareaStyle() {
    return JSON.parse(JSON.stringify(ControlStyleModel.TEXT_AREA));
  }

  static getButtonStyle() {
    return JSON.parse(JSON.stringify(ControlStyleModel.BUTTON));
  }

  static getGridStyle() {
    return JSON.parse(JSON.stringify(ControlStyleModel.GRID));
  }

  static getLabelStyle() {
    return JSON.parse(JSON.stringify(ControlStyleModel.LABEL));
  }
  static getListboxStyle() {
    return JSON.parse(JSON.stringify(ControlStyleModel.LISTBOX));
  }

  static getInputtextStyle() {
    return JSON.parse(JSON.stringify(ControlStyleModel.INPUTTEXT));
  }

  static getInputnumberStyle() {
    return JSON.parse(JSON.stringify(ControlStyleModel.INPUTNUMBER));
  }

  static getDropdownStyle() {
    return JSON.parse(JSON.stringify(ControlStyleModel.DROPDOWN));
  }

  static getFieldsetStyle() {
    return JSON.parse(JSON.stringify(ControlStyleModel.FIELDSET));
  }

  static getPasswordStyle() {
    return JSON.parse(JSON.stringify(ControlStyleModel.PASSWORD));
  }

  static getPanelStyle() {
    return JSON.parse(JSON.stringify(ControlStyleModel.PANEL));
  }

  static getRadioStyle() {
    return JSON.parse(JSON.stringify(ControlStyleModel.RADIO));
  }

  static getAutoCompleteStyle() {
    return JSON.parse(JSON.stringify(ControlStyleModel.AUTOCOMPLETE));
  }

  static getMultiSelectStyle() {
    return JSON.parse(JSON.stringify(ControlStyleModel.MULTISELECT));
  }
}
