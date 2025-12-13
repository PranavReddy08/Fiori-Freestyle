sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.main.mainmod.controller.INview", {
        onInit() { 
             this.oRouter = this.getOwnerComponent().getRouter();
             // Route name from manifest.json
        },
        
    });
});