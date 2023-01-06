export class ControlStyleModel {
  /* static BUTTON =[];
    static TEXT_AREA=[];
    static GRID = []; */

  static BUTTON = [
    { label: "Button", value: ".p-button", key: "button" },
    { label: "Label", value: ".p-button-label", key: "buttonLabel" },
    { label: "Button Icon", value: ".p-button-icon", key: "buttonIcon" },
    { label: "Button Image", value: ".img", key: "buttonImage" },
    { label: "Active Label", value: ".active .p-button-text", key: "buttonActionLabel" },
    { label: "Active Button", value: ".p-button.active", key: "activeButton" },
  ];

  static TEXT_AREA = [
    { label: "Textarea", value: ".p-fluid.p-inputtext", key: "Textarea" },
    { label: "Textarea Input", value: ".p-inputtextarea.p-inputtext.p-filled", key: "TextareaInput" },
    { label: "Placeholder", value: "::placeholder", key: "Placeholder" },
  ];

  static LABEL = [{ label: "Label", value: ".p-float-label", key: "label" }];

  static GRID = [
    { label: "Grid Container", value: ".treeTableWrapper", key: "gridContainer" },
    { label: "Table Header", value: ".p-treetable-thead", key: "tableHeader" },
    {
      label: "Header Cell",
      value: ".p-treetable.p-component .p-treetable-thead tr th",
      key: "headerCell"
    },
    {
      label: "Header First Cell",
      value: ".p-treetable.p-component .p-treetable-thead tr th:first-child",
      key: "headerFirstcell"
    },
    {
      label: "Header Last Cell",
      value: ".p-treetable.p-component .p-treetable-thead tr th:last-child",
      key: "headerLastCell"
    },
    { label: "Table Header Text", value: ".p-header-cell-text", key: "tableHeaderText" },
    {
      label: "Table Cells",
      value: ".p-treetable .p-treetable-tbody > tr > td",
      key: "tableCells"
    },
    {
      label: "Table First Cells",
      value: ".p-treetable .p-treetable-tbody > tr > td",
      key: "tableFirstCells"
    },
    {
      label: "Table First Cells",
      value: ".p-treetable .p-treetable-tbody tr td:first-child",
      key: "tableFirstCellsFirstChild"
    },
    {
      label: "Table Last Cells",
      value: ".p-treetable .p-treetable-tbody tr td:last-child",
      key: "tableLastCellsLastChild"
    },
    { label: "Custom Cell", value: ".p-custom-cell", key: "customCells" },
    { label: "Cell Text", value: ".p-custom-cell-text span", key: "cellText" },
    { label: "Show More", value: ".more-items", key: "showMore" },
    { label: "Tooltip Wrapper", value: ".tag-tooltip-wrapper", key: "tooltipWrapper" },

    { label: "Paginator", value: ".p-treetable .p-paginator", key: "paginator" },
    { label: "Paginator Input", value: "input.paginator-input.p-inputtext", key: "paginatorInput" },
    { label: "Pagintor Icons", value: ".p-paginator .p-paginator-icon", key: "paginatorIcons" },
  ];

  static LISTBOX = [
    { label: "Listbox", value: ".p-listbox", key: "listbox" },
    { label: "Listbox Header", value: ".common-header", key: "listboxHeader" },
    { label: "Listbox Container ", value: ".p-listbox-list-wrapper", key: "listboxContainer" },
    { label: "Listbox list Text", value: ".p-listbox-list", key: "listboxListText" },
    { label: "An item in the Listbox", value: ".p-listbox-item", key: "listboxItem" },
  ];

  static INPUTTEXT = [
    { label: "Input", value: ".p-inputtext", key: "input" }
  ];

  static INPUTNUMBER = [
    { label: "Input Number", value: ".p-inputnumber", key: "inputNumber" },
    { label: "Inputnumber stacked button", value: ".p-inputnumber-stacked", key: "inputStackedButton" },
    { label: "Inputnumber horizontal button", value: ".p-inputnumber-horizontal", key: "inputHorizontalButton" },
    { label: "Inputnumber vertical button", value: ".p-inputnumber-vertical", key: "inputVerticalButton" },
    { label: "Input number element", value: ".p-inputnumber-input", key: "inputNumberElement" },
    { label: "Input number button element", value: ".p-inputnumber-button", key: "inputButtonElement" },
    { label: "Increment button", value: ".p-inputnumber-button-up", key: "inputIncrementButton" },
    { label: "Decrement button", value: ".p-inputnumber-button-down", key: "inputDecrementButton" },
    { label: "Input Number Button icon", value: ".p-inputnumber-button-icon", key: "inputNumberButtonIcon" }
  ];

  static DROPDOWN = [
    { label: "Dropdown", value: ".p-dropdown", key: "dropdown" },
    { label: "Label", value: ".p-dropdown-label", key: "dropdownLabel" },
    { label: "Trigger", value: ".p-dropdown-trigger", key: "dropdowntrigger" },
    { label: "Dropdown panel", value: ".p-dropdown-panel", key: "dropdownPanel" },
    { label: "Items wrapper", value: ".p-dropdown-items-wrapper", key: "itemsWrapper" },
    { label: "Items", value: ".p-dropdown-items", key: "dropdownItems" },
    { label: "Item", value: ".p-dropdown-item", key: "dropDownItem" },
    { label: "Filter container", value: ".p-dropdown-filter-container", key: "filterContainer" },
    { label: "Filter", value: ".p-dropdown-filter", key: "dropDownFilter" },
    { label: "Dropdown open", value: ".p-dropdown-open", key: "dropdownOpen" }
  ];

  static FIELDSET = [
    { label: "Fieldset", value: ".p-fieldset", key: "fieldset" },
    { label: "Toggleable", value: ".p-fieldset-toggleable", key: "fieldToggleable" },
    { label: "Legend", value: ".p-fieldset-legend", key: "legend" },
    { label: "Content", value: ".p-fieldset-content", key: "fieldsetContent" },
  ];

  static PASSWORD = [
    { label: "Password", value: ".p-inputtext", key: "password" },
    { label: "Input Element", value: ".p-password-input", key: "passwordInput" },
    { label: "Meter element of password strength", value: ".p-password-meter", key: "passwordStrength" },
    { label: "Text to display strength", value: ".p-password-info", key: "passwordTextStrength" },
  ];

  static PANEL = [
    { label: "Header", value: ".p-panel-header", key: "panelHeader" },
    { label: "Title", value: ".p-panel-title", key: "panelTitle" },
    { label: "Toggle icon", value: ".p-panel-titlebar-toggler", key: "passwordPanelToggle" },
    { label: "Content", value: ".p-panel-content", key: "panelContent" },
  ];

  static RADIO = [
    { label: "Label", value: ".p-radiobutton-label", key: "radioLabel" },
    { label: "Text", value: ".field-checkbox, .field-radiobutton ", key: "containerElement" },
    { label: "Radio buttons", value: ".p-radiobutton-box", key: "containerIcon" },
    { label: "Icon element", value: ".p-radiobutton-icon", key: "containerIconElement" },
    { label: "Active Button", value: ".p-radiobutton .p-radiobutton-box.p-highlight", key: "activeButton" }
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
}
