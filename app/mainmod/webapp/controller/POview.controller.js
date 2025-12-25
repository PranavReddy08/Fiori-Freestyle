sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("com.main.mainmod.controller.POview", {

        onInit: function () {
            // Keep router if needed later
            this.oRouter = this.getOwnerComponent().getRouter();

            // Attach SmartTable initialization
            this.byId("POHeader").attachInitialise(this._onHeaderInit, this);
        },

        _onHeaderInit: function (oEvent) {
            // Get inner sap.ui.table.Table
            const oTable = oEvent.getSource().getTable();

            // Attach row selection event
            oTable.attachRowSelectionChange(this._onHeaderSelect, this);
        },

        _onHeaderSelect: function (oEvent) {
            const oTable = oEvent.getSource();
            const iSelectedIndex = oTable.getSelectedIndex();

            if (iSelectedIndex < 0) {
                return;
            }

            // Get selected row context
            const oContext = oTable.getContextByIndex(iSelectedIndex);

            // Use correct key field from PO Header
            const sPoId = oContext.getProperty("po_id");
            // If needed instead:
            // const sPoNumber = oContext.getProperty("po_number");

            // Get PO Item SmartTable
            const oItemSmartTable = this.byId("POitem");

            // Rebind table before filtering
            oItemSmartTable.rebindTable();

            const oItemTable = oItemSmartTable.getTable();
            const oBinding = oItemTable.getBinding("rows");

            if (oBinding) {
                oBinding.filter([
                    new Filter("po_id", FilterOperator.EQ, sPoId)
                ]);
            }

            // Switch to PO Items tab
            this.byId("POtab").setSelectedKey("Item");
        }
        ,
        oncreate:function(){
            this.oRouter.navTo("pocreateroute");
        }

        
    });
});
