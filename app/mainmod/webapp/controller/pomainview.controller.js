sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], (Controller, JSONModel, MessageBox, MessageToast) => {
    "use strict";

    return Controller.extend("com.main.mainmod.controller.pomainview", {
        
        onInit() {
            // Initialize empty PO model
            const oPOModel = new JSONModel({
                po_number: null,
                po_vm_id: null,
                vendor: "",
                po_coco: "N/A",
                po_org: "N/A",
                po_curr_cuky: "",
                po_doc_date: new Date(),
                po_delivery_date: null,
                po_payment_terms: "",
                po_total_value: 0,
                po_status: "draft",
                po_remarks: ""
            });
            this.getView().setModel(oPOModel, "poModel");
        },

        /**
         * Validate form data before submission
         */
        _validateForm() {
            const oPOModel = this.getView().getModel("poModel");
            const oData = oPOModel.getData();
            const aErrors = [];

            // Required field validations
            if (!oData.po_number || oData.po_number < 1 || oData.po_number > 9999999999) {
                aErrors.push("• PO Number must be between 1 and 9999999999");
                this.byId("poNumberInput").setValueState("Error");
            } else {
                this.byId("poNumberInput").setValueState("None");
            }

            if (!oData.vendor) {
                aErrors.push("• Vendor Code is required");
                this.byId("vendorInput").setValueState("Error");
            } else {
                this.byId("vendorInput").setValueState("None");
            }

            if (!oData.po_coco) {
                aErrors.push("• Company Code is required");
                this.byId("companyCodeInput").setValueState("Error");
            } else {
                this.byId("companyCodeInput").setValueState("None");
            }

            if (!oData.po_org) {
                aErrors.push("• Purchasing Org is required");
                this.byId("purchasingOrgInput").setValueState("Error");
            } else {
                this.byId("purchasingOrgInput").setValueState("None");
            }

            if (!oData.po_curr_cuky) {
                aErrors.push("• Currency is required");
                this.byId("currencyInput").setValueState("Error");
            } else {
                this.byId("currencyInput").setValueState("None");
            }

            if (aErrors.length > 0) {
                MessageBox.error("Please fix the following errors:\n\n" + aErrors.join("\n"));
                return false;
            }
            
            return true;
        },

        /**
         * Save PO as Draft
         */
        onSaveDraft() {
            if (!this._validateForm()) {
                return;
            }

            const oPOModel = this.getView().getModel("poModel");
            const oPOData = oPOModel.getData();
            oPOData.po_status = "draft";

            this._savePO(oPOData);
        },

        /**
         * Submit PO for approval
         */
        onSubmit() {
            if (!this._validateForm()) {
                return;
            }

            MessageBox.confirm("Are you sure you want to submit this Purchase Order?", {
                title: "Confirm Submission",
                onClose: (oAction) => {
                    if (oAction === MessageBox.Action.OK) {
                        const oPOModel = this.getView().getModel("poModel");
                        const oPOData = oPOModel.getData();
                        oPOData.po_status = "submitted";
                        
                        this._savePO(oPOData);
                    }
                }
            });
        },

        /**
         * Save PO to backend (Create operation)
         */
        _savePO(oPOData) {
            const oModel = this.getView().getModel(); // OData model

            // Prepare payload
            const oPayload = {
                po_number: parseInt(oPOData.po_number),
                po_vm_id: oPOData.po_vm_id,
                vendor: oPOData.vendor,
                po_coco: oPOData.po_coco,
                po_org: oPOData.po_org,
                po_curr_cuky: oPOData.po_curr_cuky,
                po_doc_date: oPOData.po_doc_date,
                po_delivery_date: oPOData.po_delivery_date,
                po_payment_terms: oPOData.po_payment_terms,
                po_total_value: parseInt(oPOData.po_total_value),
                po_status: oPOData.po_status,
                po_remarks: oPOData.po_remarks || ""
            };

            // Show busy indicator
            this.getView().setBusy(true);

            // Create PO in backend
            oModel.create("/POhead", oPayload, {
                success: (oData) => {
                    this.getView().setBusy(false);
                    
                    const sMessage = oPOData.po_status === "draft" 
                        ? "Purchase Order saved as draft successfully!" 
                        : "Purchase Order submitted successfully!";
                    
                    MessageBox.success(sMessage, {
                        onClose: () => {
                            this._resetForm();
                            // Navigate back if needed
                            // this.onNavBack();
                        }
                    });
                },
                error: (oError) => {
                    this.getView().setBusy(false);
                    let sErrorMsg = "Failed to create Purchase Order";
                    
                    if (oError.responseText) {
                        try {
                            const oErrorResponse = JSON.parse(oError.responseText);
                            sErrorMsg = oErrorResponse.error.message.value || oErrorResponse.error.message;
                        } catch (e) {
                            sErrorMsg = oError.message;
                        }
                    }
                    
                    MessageBox.error(sErrorMsg);
                }
            });
        },

        /**
         * Update existing PO (for edit mode)
         */
        _updatePO(sPOId, oPOData) {
            const oModel = this.getView().getModel();

            const oPayload = {
                po_number: parseInt(oPOData.po_number),
                vendor: oPOData.vendor,
                po_coco: oPOData.po_coco,
                po_org: oPOData.po_org,
                po_curr_cuky: oPOData.po_curr_cuky,
                po_doc_date: oPOData.po_doc_date,
                po_delivery_date: oPOData.po_delivery_date,
                po_payment_terms: oPOData.po_payment_terms,
                po_total_value: parseInt(oPOData.po_total_value),
                po_status: oPOData.po_status,
                po_remarks: oPOData.po_remarks || ""
            };

            this.getView().setBusy(true);

            oModel.update("/POhead('" + sPOId + "')", oPayload, {
                success: () => {
                    this.getView().setBusy(false);
                    MessageToast.show("Purchase Order updated successfully!");
                },
                error: (oError) => {
                    this.getView().setBusy(false);
                    MessageBox.error("Failed to update Purchase Order: " + oError.message);
                }
            });
        },

        /**
         * Cancel and reset form
         */
        onCancel() {
            const oPOModel = this.getView().getModel("poModel");
            const oData = oPOModel.getData();
            
            // Check if form has any data
            const bHasData = oData.po_number || oData.vendor || oData.po_remarks;
            
            if (bHasData) {
                MessageBox.confirm("Are you sure you want to cancel? All unsaved changes will be lost.", {
                    title: "Confirm Cancel",
                    onClose: (oAction) => {
                        if (oAction === MessageBox.Action.OK) {
                            this._resetForm();
                            MessageToast.show("Form cancelled");
                            // Navigate back if needed
                            // this.onNavBack();
                        }
                    }
                });
            } else {
                this._resetForm();
                MessageToast.show("Form cancelled");
            }
        },

        /**
         * Reset form to initial state
         */
        _resetForm() {
            const oPOModel = this.getView().getModel("poModel");
            oPOModel.setData({
                po_number: null,
                po_vm_id: null,
                vendor: "",
                po_coco: "N/A",
                po_org: "N/A",
                po_curr_cuky: "",
                po_doc_date: new Date(),
                po_delivery_date: null,
                po_payment_terms: "",
                po_total_value: 0,
                po_status: "draft",
                po_remarks: ""
            });

            // Clear all value states
            this.byId("poNumberInput").setValueState("None");
            this.byId("vendorInput").setValueState("None");
            this.byId("companyCodeInput").setValueState("None");
            this.byId("purchasingOrgInput").setValueState("None");
            this.byId("currencyInput").setValueState("None");
        },

        /**
         * Navigate back to previous page
         */
        onNavBack() {
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("PORoute"); // Adjust route name as per your manifest.json
        }

    });
});