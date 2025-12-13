sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"audit/test/integration/pages/POAuditsList",
	"audit/test/integration/pages/POAuditsObjectPage"
], function (JourneyRunner, POAuditsList, POAuditsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('audit') + '/test/flp.html#app-preview',
        pages: {
			onThePOAuditsList: POAuditsList,
			onThePOAuditsObjectPage: POAuditsObjectPage
        },
        async: true
    });

    return runner;
});

