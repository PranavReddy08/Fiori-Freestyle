using AUDService as service from '../../srv/au-service';
annotate service.POAudits with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : error_status,
            },
            {
                $Type : 'UI.DataField',
                Value : audit_status,
            },
            {
                $Type : 'UI.DataField',
                Label : 'audit_log_auditby',
                Value : audit_log_auditby,
            },
            {
                $Type : 'UI.DataField',
                Label : 'audit_log_auditat',
                Value : audit_log_auditat,
            },
            {
                $Type : 'UI.DataField',
                Label : 'audit_log_verifiedby',
                Value : audit_log_verifiedby,
            },
            {
                $Type : 'UI.DataField',
                Label : 'audit_log_verifiedat',
                Value : audit_log_verifiedat,
            },
            {
                $Type : 'UI.DataField',
                Label : 'audit_log_approvedby',
                Value : audit_log_approvedby,
            },
            {
                $Type : 'UI.DataField',
                Label : 'audit_log_approvedat',
                Value : audit_log_approvedat,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : error_status,
        },
        {
            $Type : 'UI.DataField',
            Value : audit_status,
        },
        {
            $Type : 'UI.DataField',
            Label : 'audit_log_auditby',
            Value : audit_log_auditby,
        },
        {
            $Type : 'UI.DataField',
            Label : 'audit_log_auditat',
            Value : audit_log_auditat,
        },
        {
            $Type : 'UI.DataField',
            Label : 'audit_log_verifiedby',
            Value : audit_log_verifiedby,
        },
    ],
);

