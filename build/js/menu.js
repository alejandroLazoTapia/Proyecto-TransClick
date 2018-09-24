var xhReq = new XMLHttpRequest();
    xhReq.open("GET", menu_service + "1", false);
    xhReq.send(null);
    var data = JSON.parse(xhReq.responseText);
    console.log(data);

//carga los menus
var builddata = function () {
    var source = [];
    var items = [];
    // build hierarchical source.
    
    for (i = 0; i < data.length; i++) {
        var item = data[i];
        var nombre = item["nombre"];
        var padreId = item["padreId"];
        var id = item["id"];
        var url = item["url"];
        var span= item["span"];
        var icon= item["icon"];

        if (items[padreId]) {
            var item = { padreId: padreId, nombre: nombre, item: item, url: url, span: span, icon: icon };
            if (!items[padreId].items) {
                items[padreId].items = [];
            }
            items[padreId].items[items[padreId].items.length] = item;
            items[id] = item;
        }
        else {
            items[id] = { padreId: padreId, nombre: nombre, item: item, url: url, span: span, icon: icon  };
            source[id] = items[id];
        }
    }
    return source;
}

var source = builddata();
//agrega recursivamente los menus
var buildUL = function (parent, items) {
    $.each(items, function () {
        if (this.nombre) {
            // create elemtos li y agrega los parientes en caso de haber hijos
            var li = $("<li><a href='"+this.url+"'><i class='"+this.icon+"'></i>" + this.nombre + "<span class='"+this.span+"'></span></a></li>");
            li.appendTo(parent);
            // if there are sub items, call the buildUL function.
            if (this.items && this.items.length > 0) {
                var ul = $('<ul class="nav child_menu"></ul>');
                ul.appendTo(li);
                buildUL(ul, this.items);
            }
        }
    });
}
var ul = $('<ul class="nav side-menu"></ul>');
ul.appendTo("#jqxMenu");
buildUL(ul, source);

