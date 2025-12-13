sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.main.mainmod.controller.Mainview", {
        onInit() { 
             this.oRouter = this.getOwnerComponent().getRouter();
             // Route name from manifest.json
        },
        tomaster : function(){
            this.oRouter.navTo("MasterRoute"); 
        },
        topo : function(){
            this.oRouter.navTo("PORoute"); 
        },
        toinv : function(){
            this.oRouter.navTo("INVRoute"); 
        },
         togr : function(){
            this.oRouter.navTo("GRRoute"); 
        }
    });
});