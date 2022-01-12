import * as React from "react";
import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder
} from "@devexpress/dx-react-core";
import Button from "@material-ui/core/Button";

export const ToolbarEditing = () => {
  return (
    <Plugin
      name="ToolbarEditing"
      dependencies={[
        {
          name: "Toolbar"
        }
      ]}
    >
      <Template name="toolbarContent">
        <TemplateConnector>
          {(
            { tableBodyRows, editingRowIds },
            {
              startEditRows,
              cancelChangedRows,
              stopEditRows,
              commitChangedRows
            }
          ) => {
            const isEditing = editingRowIds.length > 0;
            const rowIds = tableBodyRows.map(({ rowId }) => rowId);

            return (
              <div>
                {isEditing ? (
                  <React.Fragment>
                    <Button
                      variant="contained"
                      onClick={() => {
                        commitChangedRows({ rowIds });
                        stopEditRows({ rowIds });
                      }}
                    >
                      Apply
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        cancelChangedRows({ rowIds });
                        stopEditRows({ rowIds });
                      }}
                    >
                      Cancel
                    </Button>
                  </React.Fragment>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => {
                      startEditRows({ rowIds });
                    }}
                  >
                    Edit
                  </Button>
                )}
              </div>
            );
          }}
        </TemplateConnector>
        <TemplatePlaceholder />
      </Template>
    </Plugin>
  );
};
