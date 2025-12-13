sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.main.mainmod.controller.GRview", {
        onInit() { 
             this.oRouter = this.getOwnerComponent().getRouter();
             // Route name from manifest.json
        },
        togr : function(){
            this.oRouter.navTo("GRRoute"); 
        }
    });
});