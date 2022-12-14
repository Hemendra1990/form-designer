export class ControlStyleModel {
  /* static BUTTON =[];
    static TEXT_AREA=[];
    static GRID = []; */

  static BUTTON = [
    { label: "Button", value: ".p-button" },
    { label: "Label", value: ".p-button-label" },
    { label: "Button Icon", value: ".p-button-icon" },
    { label: "Button Image", value: ".img" },
    { label: "Active Label", value: ".active .p-button-text" },
    { label: "Active Button", value: ".p-button.active" },
  ];

  static TEXT_AREA = [
    { label: "Textarea", value: ".p-fluid .p-inputtext" },
    { label: "Textarea Input", value: ".p-inputtext.p-filled" },
    { label: "Placeholder", value: "::placeholder" },
  ];

  static LABEL = [{ label: "Label", value: ".p-float-label" }];

  static GRID = [
    { label: "Grid Container", value: ".treeTableWrapper" },
    { label: "Table Header", value: ".p-treetable-thead" },
    {
      label: "Header Cell",
      value: ".p-treetable.p-component .p-treetable-thead tr th",
    },
    {
      label: "Header First Cell",
      value: ".p-treetable.p-component .p-treetable-thead tr th:first-child",
    },
    {
      label: "Header Last Cell",
      value: ".p-treetable.p-component .p-treetable-thead tr th:last-child",
    },
    { label: "Table Header Text", value: ".p-header-cell-text" },
    {
      label: "Table Cells",
      value: ".p-treetable .p-treetable-tbody > tr > td",
    },
    {
      label: "Table First Cells",
      value: ".p-treetable .p-treetable-tbody > tr > td",
    },
    {
      label: "Table First Cells",
      value: ".p-treetable .p-treetable-tbody tr td:first-child",
    },
    {
      label: "Table Last Cells",
      value: ".p-treetable .p-treetable-tbody tr td:last-child",
    },
    { label: "Custom Cell", value: ".p-custom-cell" },
    { label: "Cell Text", value: ".p-custom-cell-text span" },
    { label: "Show More", value: ".more-items" },
    { label: "Tooltip Wrapper", value: ".tag-tooltip-wrapper" },

    { label: "Paginator", value: ".p-treetable .p-paginator" },
    { label: "Paginator Input", value: "input.paginator-input.p-inputtext" },
    { label: "Pagintor Icons", value: ".p-paginator .p-paginator-icon" },
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
}
