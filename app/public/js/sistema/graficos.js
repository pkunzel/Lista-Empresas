let estados = [{
	"ID": "1",
	"Sigla": "BR-AC",
    "Nome": "Acre",
    "Quantidade" : 87
},
     {
	"ID": "2",
	"Sigla": "BR-AL",
	"Nome": "Alagoas",
    "Quantidade" : 421
},
     {
	"ID": "3",
	"Sigla": "BR-AM",
	"Nome": "Amazonas",
    "Quantidade" : 225
},
     {
	"ID": "4",
	"Sigla": "BR-AP",
	"Nome": "Amapá",
    "Quantidade" : 111
},
     {
	"ID": "5",
	"Sigla": "BR-BA",
	"Nome": "Bahia",
    "Quantidade" : 444
},
     {
	"ID": "6",
	"Sigla": "BR-CE",
	"Nome": "Ceará",
    "Quantidade" : 322
},
     {
	"ID": "7",
	"Sigla": "BR-DF",
	"Nome": "Distrito Federal",
    "Quantidade" : 489
},
     {
	"ID": "8",
	"Sigla": "BR-ES",
	"Nome": "Espírito Santo",
    "Quantidade" : 756
},
     {
	"ID": "9",
	"Sigla": "BR-GO",
	"Nome": "Goiás",
    "Quantidade" : 1344
},
     {
	"ID": "10",
	"Sigla": "BR-MA",
	"Nome": "Maranhão",
    "Quantidade" : 870
},
     {
	"ID": "11",
	"Sigla": "BR-MG",
	"Nome": "Minas Gerais",
    "Quantidade" : 6420
},
     {
	"ID": "12",
	"Sigla": "BR-MS",
	"Nome": "Mato Grosso do Sul",
    "Quantidade" : 2204
},
     {
	"ID": "13",
	"Sigla": "BR-MT",
	"Nome": "Mato Grosso",
    "Quantidade" : 1985
},
     {
	"ID": "14",
	"Sigla": "BR-PA",
	"Nome": "Pará",
    "Quantidade" : 275
},
     {
	"ID": "15",
	"Sigla": "BR-PB",
	"Nome": "Paraíba",
    "Quantidade" : 324
},
     {
	"ID": "16",
	"Sigla": "BR-PE",
	"Nome": "Pernambuco",
    "Quantidade" : 123
},
     {
	"ID": "17",
	"Sigla": "BR-PI",
	"Nome": "Piauí",
    "Quantidade" : 422
},
     {
	"ID": "18",
	"Sigla": "BR-PR",
	"Nome": "Paraná",
    "Quantidade" : 5835
},
     {
	"ID": "19",
	"Sigla": "BR-RJ",
	"Nome": "Rio de Janeiro",
    "Quantidade" : 4866
},
     {
	"ID": "20",
	"Sigla": "BR-RN",
	"Nome": "Rio Grande do Norte",
    "Quantidade" : 213
},
     {
	"ID": "21",
	"Sigla": "BR-RO",
	"Nome": "Rondônia",
    "Quantidade" : 123
},
     {
	"ID": "22",
	"Sigla": "BR-RR",
	"Nome": "Roraima",
    "Quantidade" : 643
},
     {
	"ID": "23",
	"Sigla": "BR-RS",
	"Nome": "Rio Grande do Sul",
    "Quantidade" : 1679
},
     {
	"ID": "24",
	"Sigla": "BR-SC",
	"Nome": "Santa Catarina",
    "Quantidade" : 423
},
     {
	"ID": "25",
	"Sigla": "BR-SE",
	"Nome": "Sergipe",
    "Quantidade" : 687
},
     {
	"ID": "26",
	"Sigla": "BR-SP",
	"Nome": "São Paulo",
    "Quantidade" : 8789
},
     {
	"ID": "27",
	"Sigla": "BR-TO",
	"Nome": "Tocantins",
    "Quantidade" : 512
}]

window.onload = function () {
    am4core.ready(function () {
        am4core.useTheme(am4themes_animated);

        carregarPieChart("pieChart", pieChartData);

        carregarBarChart("barChart", barChartData);

        //carregarTreeMap("treeMaptdiv", treeMapData);

        carregarHeatMap("mapChartDiv", heatMapData);
    });
}

function carregarPieChart(idElement, data) {

    // Create chart instance
    var chart = am4core.create(idElement, am4charts.PieChart3D);

    // Add data
    chart.data = estados;

    // Set inner radius
    chart.innerRadius = am4core.percent(50);

    // Add and configure Series
    var series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "Quantidade";
    series.dataFields.category = "Nome";
}

function carregarBarChart(idElement, data) {
    // Create chart instance
    var chart = am4core.create(idElement, am4charts.XYChart3D);

    // Add data
    chart.data = data;

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "Nome";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.renderer.labels.template.hideOversized = false;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.tooltip.label.rotation = 270;
    categoryAxis.tooltip.label.horizontalCenter = "right";
    categoryAxis.tooltip.label.verticalCenter = "middle";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Nome";
    valueAxis.title.fontWeight = "bold";

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = "Quantidade";
    series.dataFields.categoryX = "Nome";
    series.name = "Nome";
    series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
    columnTemplate.stroke = am4core.color("#FFFFFF");

    columnTemplate.adapter.add("fill", function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
    })

    columnTemplate.adapter.add("stroke", function (stroke, target) {
        return chart.colors.getIndex(target.dataItem.index);
    })

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.strokeOpacity = 0;
    chart.cursor.lineY.strokeOpacity = 0;
}

function carregarTreeMap(idElement, data) {

    function processData(data) {
        var treeData = [];

        var smallBrands = { name: "Other", children: [] };

        for (var brand in data) {
            var brandData = { name: brand, children: [] }
            var brandTotal = 0;
            for (var model in data[brand]) {
                brandTotal += data[brand][model];
            }

            for (var model in data[brand]) {
                // do not add very small
                if (data[brand][model] > 100) {
                    brandData.children.push({ name: model, count: data[brand][model] });
                }
            }

            // add to small brands if total number less than
            if (brandTotal > 100000) {
                treeData.push(brandData);
            }
            else {
                smallBrands.children.push(brandData)
            }

        }
        treeData.push(smallBrands);
        return treeData;
    }

    // create chart
    var chart = am4core.create(idElement, am4charts.TreeMap);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    // only one level visible initially
    chart.maxLevels = 1;
    // define data fields
    chart.dataFields.value = "count";
    chart.dataFields.name = "name";
    chart.dataFields.children = "children";
    chart.homeText = "US Car Sales 2017";

    // enable navigation
    chart.navigationBar = new am4charts.NavigationBar();

    // level 0 series template
    var level0SeriesTemplate = chart.seriesTemplates.create("0");
    level0SeriesTemplate.strokeWidth = 2;

    // by default only current level series bullets are visible, but as we need brand bullets to be visible all the time, we modify it's hidden state
    level0SeriesTemplate.bulletsContainer.hiddenState.properties.opacity = 1;
    level0SeriesTemplate.bulletsContainer.hiddenState.properties.visible = true;
    // create hover state
    var columnTemplate = level0SeriesTemplate.columns.template;
    var hoverState = columnTemplate.states.create("hover");

    // darken
    hoverState.adapter.add("fill", function (fill, target) {
        if (fill instanceof am4core.Color) {
            return am4core.color(am4core.colors.brighten(fill.rgb, -0.2));
        }
        return fill;
    })

    // add logo
    var image = columnTemplate.createChild(am4core.Image);
    image.opacity = 0.15;
    image.align = "center";
    image.valign = "middle";
    image.width = am4core.percent(80);
    image.height = am4core.percent(80);

    // add adapter for href to load correct image
    image.adapter.add("href", function (href, target) {
        var dataItem = target.parent.dataItem;
        if (dataItem) {
            return "https://www.amcharts.com/lib/images/logos/" + dataItem.treeMapDataItem.name.toLowerCase() + ".png";
        }
    });

    // level1 series template
    var level1SeriesTemplate = chart.seriesTemplates.create("1");
    level1SeriesTemplate.columns.template.fillOpacity = 0;

    var bullet1 = level1SeriesTemplate.bullets.push(new am4charts.LabelBullet());
    bullet1.locationX = 0.5;
    bullet1.locationY = 0.5;
    bullet1.label.text = "{name}";
    bullet1.label.fill = am4core.color("#ffffff");

    // level2 series template
    var level2SeriesTemplate = chart.seriesTemplates.create("2");
    level2SeriesTemplate.columns.template.fillOpacity = 0;

    var bullet2 = level2SeriesTemplate.bullets.push(new am4charts.LabelBullet());
    bullet2.locationX = 0.5;
    bullet2.locationY = 0.5;
    bullet2.label.text = "{name}";
    bullet2.label.fill = am4core.color("#ffffff");

    chart.data = processData(data);
}

function carregarHeatMap(idElement, data) {
    // Low-detail map
    var chart = am4core.create(idElement, am4maps.MapChart);
    chart.geodata = am4geodata_brazilLow;
    chart.projection = new am4maps.projections.Mercator();

    var label = chart.chartContainer.createChild(am4core.Label);
    label.text = "Brazil";

    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    polygonSeries.data = [
        {
          "id" : "BR-AC",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-AL",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-AP",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-AM",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-BA",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-CE",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-DF",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-ES",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-GO",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-MA",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-MT",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-MS",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-MG",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-PA",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-PB",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-PR",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-PE",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-PI",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-RJ",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-RN",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-RS",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-RO",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-RR",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-SC",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-SP",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-SE",
          "value" : Math.floor(Math.random()*10000)
        },
        {
          "id" : "BR-TO",
          "value" : Math.floor(Math.random()*10000)
        }
      ];


    polygonSeries.heatRules.push({
        property: "fill",
        target: polygonSeries.mapPolygons.template,
        min: chart.colors.getIndex(1).brighten(1),
        max: chart.colors.getIndex(1).brighten(-0.3)
    });


    // Make map load polygon data (state shapes and names) from GeoJSON
    polygonSeries.useGeodata = true;

    // Set up heat legend
    let heatLegend = chart.createChild(am4maps.HeatLegend);
    heatLegend.series = polygonSeries;
    heatLegend.align = "right";
    heatLegend.width = am4core.percent(25);
    heatLegend.marginRight = am4core.percent(4);
    heatLegend.minValue = 0;
    heatLegend.maxValue = 30000000;
    heatLegend.valign = "bottom";


    // Configure series tooltip
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {value}";
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeWidth = 0.5;

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(1).brighten(-0.5);
}

let pieChartData = [{
    "country": "Lithuania",
    "litres": 501.9
}, {
    "country": "Czech Republic",
    "litres": 301.9
}, {
    "country": "Ireland",
    "litres": 201.1
}, {
    "country": "Germany",
    "litres": 165.8
}, {
    "country": "Australia",
    "litres": 139.9
}, {
    "country": "Austria",
    "litres": 128.3
}, {
    "country": "UK",
    "litres": 99
}, {
    "country": "Belgium",
    "litres": 60
}, {
    "country": "The Netherlands",
    "litres": 50
}];

let barChartData = estados;

let treeMapData = {
    "Acura": { "ILX": 11757, "MDX": 54886, "NSX": 581, "RDX": 51295, "RLX": 1237, "TLX": 34846 },
    "Alfa Romeo": { "4C": 407, "Giulia": 8903, "Stelvio": 2721 },
    "Audi": { "A3": 20733, "A3 e-tron": 2877, "A4": 37674, "A5": 21301, "A6": 16304, "A7": 4810, "A8": 3127, "Q3": 20633, "Q5": 57640, "Q7": 38346, "R8": 772, "TT": 2294 },
    "Bentley": { "Bentayga": 1152, "Continental GT": 898, "Flying Spur": 257, "Mulsanne": 98 },
    "BMW": { "2-Series": 11737, "3-Series": 59449, "4-Series": 39634, "5-Series": 40658, "6-Series": 3355, "7-Series": 9276, "i3": 6276, "i8": 488, "X1": 30826, "X3": 40691, "X4": 5198, "X5": 50815, "X6": 6780, "Z4": 502 },
    "Buick": { "Cascada": 5595, "Enclave": 48564, "Encore": 88035, "Envision": 41040, "LaCrosse": 20161, "Regal": 11559, "Verano": 4277 },
    "Cadillac": { "ATS": 13100, "CT6": 10542, "CTS": 10344, "ELR": 17, "Escalade": 37694, "SRX": 156, "XT5": 68312, "XTS": 16275 },
    "Chevrolet": { "Bolt": 23297, "Camaro": 67940, "Caprice PPV": 693, "City Express": 8348, "Colorado": 112996, "Corvette": 25079, "Cruze": 184751, "Equinox": 290458, "Express": 69164, "Impala": 75877, "Malibu": 185857, "Silverado": 585864, "Sonic": 30290, "Spark": 22589, "SS": 4055, "Suburban": 56516, "Tahoe": 98961, "Traverse": 123506, "Trax": 79289, "Volt": 20349 },
    "Chrysler": { "200": 18457, "300": 51237, "Pacifica": 118274, "Town & Country": 577 },
    "Dodge": { "Avenger": 14, "Challenger": 64537, "Charger": 88351, "Dart": 10082, "Durango": 68761, "Grand Caravan": 125196, "Journey": 89470, "Viper": 585, "RAM P/U": 500723, "RAM ProMaster": 40483, "RAM ProMaster City": 15584 },
    "Fiat": { "124 Spider": 4478, "500": 12685, "500L": 1664, "500X": 7665 },
    "Ford": { "C-Max": 18390, "Edge": 142603, "Escape": 308296, "E-Series": 53304, "Expedition": 51883, "Explorer": 271131, "Fiesta": 46249, "Flex": 22389, "Focus": 158385, "F-Series": 896764, "Fusion": 209623, "GT": 89, "Mustang": 81866, "Taurus": 41236, "Transit": 127360, "Transit Connect": 34473 },
    "Genesis": { "G80": 16196, "G90": 4398 },
    "GMC": { "Acadia": 111276, "Canyon": 32106, "Savana": 29679, "Sierra": 217943, "Terrain": 85441, "Yukon": 49183, "Yukon XL": 35059 },
    "Honda": { "Accord": 322655, "Civic": 377286, "Clarity FCV": 2455, "Crosstour": 5, "CR-V": 377895, "CR-Z": 705, "Fit": 49454, "HR-V": 94034, "Insight": 3, "Odyssey": 100307, "Pilot": 127279, "Ridgeline": 34749 },
    "Hyundai": { "Accent": 58955, "Azera": 3060, "Elantra": 198210, "Equus": 20, "Genesis": 1152, "Ioniq": 11197, "Santa Fe": 133171, "Sonata": 131803, "Tucson": 114735, "Veloster": 12658 },
    "Infiniti": { "Q50": 40739, "Q60": 10751, "Q70": 5772, "QX30": 14093, "QX50": 16857, "QX60": 40444, "QX70": 6878, "QX80": 17881 },
    "Jaguar": { "F-Pace": 18946, "F-Type": 4108, "XE": 9278, "XF": 4541, "XJ": 2721 },
    "Jeep": { "Cherokee": 169882, "Compass": 83253, "Grand Cherokee": 240696, "Patriot": 10735, "Renegade": 103434, "Wrangler": 190522 },
    "Kia": { "Cadenza": 7249, "Forte": 117596, "K900": 455, "Niro": 27237, "Optima": 107493, "Rio": 16760, "Sedona": 23815, "Sorento": 99684, "Soul": 115712, "Sportage": 72824, "Stinger": 843 },
    "Land Rover": { "Discovery / LR4": 6398, "Discovery Sport": 14187, "Range Rover": 16869, "Range Rover Evoque": 11979, "Range Rover Sport": 19153, "Range Rover Velar": 6153 },
    "Lexus": { "CT": 4690, "ES": 51398, "GS": 7773, "GX": 27190, "IS": 26482, "LC": 2487, "LFA": 3, "LS": 4094, "LX": 6004, "NX": 59341, "RC": 7363, "RX": 108307 },
    "Lincoln": { "Continental": 12012, "MKC": 27048, "MKS": 153, "MKT": 3005, "MKX": 31031, "MKZ": 27387, "Navigator": 10523 },
    "Maserati": { "Ghibli": 5531, "GranTurismo": 1018, "Levante": 5448, "Quattroporte": 1700 },
    "Mazda": { "3": 75018, "5": 10, "6": 33402, "CX-3": 16355, "CX-5": 127563, "CX-9": 25828, "MX-5 Miata": 11294 },
    "Mercedes-Benz": { "B-Class": 744, "C-Class": 77447, "CLA-Class": 20669, "E / CLS-Class": 51312, "G-Class": 4188, "GLA-Class": 24104, "GLC-Class": 48643, "GLE-Class": 54595, "GLS-Class": 32248, "Metris": 7579, "S-Class": 15888, "SLC-Class": 2860, "SL-Class": 2940, "Sprinter": 27415 },
    "Mini": { "Cooper": 32232, "Countryman": 14864, "Paceman": 9 },
    "Mitsubishi": { "i MiEV": 6, "Lancer": 12725, "Mirage": 22386, "Outlander": 35310, "Outlander PHEV": 99, "Outlander Sport": 33160 },
    "Nissan": { "370Z": 4614, "Altima": 254996, "Armada": 35667, "Frontier": 74360, "GT-R": 578, "Juke": 10157, "Leaf": 11230, "Maxima": 67627, "Murano": 76732, "NV": 17858, "NV200": 18602, "Pathfinder": 81065, "Quest": 4950, "Rogue": 403465, "Sentra": 218451, "Titan": 52924, "Versa": 106772, "Xterra": 1 },
    "Porsche": { "911": 8970, "Boxster": 2287, "Cayenne": 13203, "Cayman": 2800, "Macan": 21429, "Panamera": 6431 },
    "Smart": { "Fortwo": 3071 },
    "Subaru": { "BRZ": 4131, "Crosstrek": 110138, "Forester": 177563, "Impreza": 117401, "Legacy": 49837, "Outback": 188886 },
    "Tesla": { "Model 3": 2320, "Model S †": 28800, "Model X †": 24000 },
    "Toyota": { "4Runner": 128296, "86/Scion FR-S": 6846, "Avalon": 32583, "Camry": 387081, "C-HR": 25755, "Corolla": 329196, "FJ Cruiser": 4, "Highlander": 215775, "Land Cruiser": 3100, "Mirai": 1838, "Prius": 108662, "RAV4": 407594, "Sequoia": 12156, "Sienna": 111489, "Tacoma": 198124, "Tundra": 116285, "Venza": 14, "Yaris": 44380 },
    "Volkswagen": { "Atlas": 27119, "Beetle": 15166, "CC": 1355, "Eos": 1, "Golf": 68978, "Jetta": 115807, "Passat": 60722, "Tiguan": 46983, "Touareg": 3545 },
    "Volvo": { "S60": 16825, "S80": 7, "S90": 11090, "XC60": 22516, "XC90": 30996 }
};

let heatMapData = [
    {
        "id": "BR-RS",
        "value": 200000
    }
];