'use strict';
app.detalleOT = kendo.observable({
    onShow: function () {
        var Url = urlService + "/biss.sherloc/Services/SL/Sherloc/Sherloc.svc/Detalle/" + registro.codigo_empresa + "," + registro.anio_ga35 + "," + registro.secuencia_orden;
        try {
            var infordet;
            $.ajax({
                url: Url,
                type: "GET",
                async: false,
                dataType: "json",
                success: function (data) {
                    try {
                        infordet = (JSON.parse(data.DetalleOTGetResult)).DetalleOT01;
                    } catch (e) {
                        alert(e);
                    }
                },
                error: function (err) {
                    alert(JSON.stringify(err));
                }
            });

            /*
            codigo_empresa
            numero_ot
            nombre_taller
            estado_interno
            fecha_recepcion
            anio_ga35
            secuencia_orden
            kilometraje
            */

            $("#detalleOT").kendoGrid({
                allowCopy: true,
                columns: [
                    { field: "Descripcion", title: "Descripción", footerTemplate: "Total:" },
                    { field: "Cantidad", title: "Cantidad", footerTemplate: "#: sum # " },
                    {
                        field: "Total", format: "{0:c}", title: "Total",
                        footerTemplate: "#= kendo.toString(sum, '0.00') #"
                    }

                ],
                dataSource: {
                    data: infordet,
                    aggregate: [
                        { field: "Descripcion", aggregate: "count" },
                        { field: "Cantidad", aggregate: "sum" },
                        { field: "Total", aggregate: "sum" }
                    ]
                },
                selectable: "row"
            });
        } catch (e) {
            alert(e);
        }
    },
    afterShow: function () { },
    inicializa: function () {

    }
});
app.localization.registerView('detalleOT');




// START_CUSTOM_CODE_miKia2
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_miKia2