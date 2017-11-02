function AutoGrid () {

    this.$grid;

    this.headers;
    this.result;

    this.initGrid = function(jsonString) {
        // var data = JSON.parse(jsonString);
				var data = jsonString;

        var $table = $('<table></table>');

        var $thead = $('<thead></thead>');
        var $theadtr = $('<tr></tr>');

        this.headers = data.gridHeader.split(',');
        for (var i = 0; i < this.headers.length; i++) {
            $theadtr.append($('<td>' + this.headers[i] + '</td>'));
        }
        $thead.append($theadtr);
        $table.append($thead);

        var $tbody = $('<tbody></tbody>');
        for (var j = 0; j < data.gridData.length; j++) {
            var $tr = $('<tr></tr>');
            var rowData = data.gridData[j].rowData;
            var rowDataSplit = rowData.split(',');
            for (var i = 0; i < this.headers.length; i++) {
                $tr.append($('<td>' + rowDataSplit[i] + '</td>'));
            }
            $tbody.append($tr);
        }
        $table.append($tbody);

        this.$grid = $table;
        return this;
    }

    this.addRow = function () {
			var $content = $('<tr></tr>');
			for (var i = 0; i < this.headers.length; i++) {
					$content.append($('<td>1</td>'));
			}
			this.$grid.children('tbody').append($content);
    }

    this.removeRow = function (trObj) {

    }

    this.disableEdit = function () {

    }

    this.submit = function () {
        console.log(this.result);
    }

    this.getGrid = function () {
        return this.$grid;
    }

    this.setGrid = function ($grid) {
        this.$grid = $grid;
    }

}