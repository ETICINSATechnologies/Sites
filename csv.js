function csvToJsonArray(csv) {
    var rows = csv.split('\r\n');
    var jsonArray = [];
    var keys = [];
    rows.forEach((row, rowIndex) => {
        var cells = row.split(',');
        if (rowIndex == 0) {
            cells.forEach(cell => { keys.push(cell) });
        } else {
            jsonArray[rowIndex-1] = {};
            jsonItem = jsonArray[rowIndex-1];
            cells.forEach((cell, cellIndex) => {
                jsonItem[keys[cellIndex]] = cell;
            })
        }
    });
    return jsonArray;
}
