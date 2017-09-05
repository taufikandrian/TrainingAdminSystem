var config = {
    userName: 'thor',
    password: 's4teliliT',
    server: 'jptrainingsql', 
    database: 'TAS_Thor',
    options: {
        rowCollectionOnRequestCompletion: true
    }
};

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES; 

module.exports = {
    deleteRecord: function (callback, id) {
        var connection = new Connection(config);
        connection.on('connect', function(err) {
            request = new Request("DELETE FROM dbo.Grade WHERE grade_id=@id;", function(err) {
                if (err) callback(-1, err);  
                else callback(1, 'success');
            });
            request.addParameter('id', TYPES.Int, id);  
            connection.execSql(request);
        });
    },
    storeRecord: function (callback, data) {
        var connection = new Connection(config);
        connection.on('connect', function(err) {
            request = new Request("INSERT dbo.Grade (grade_code, grade_name, grade_description) "+ 
                                    "VALUES (@grade_code, @grade_name, @grade_description);", function(err) {
                if (err) callback(-1, err);  
                else callback(1, 'success');
            });
            request.addParameter('grade_code', TYPES.NVarChar, data.grade_code);  
            request.addParameter('grade_name', TYPES.NVarChar , data.grade_name);
            request.addParameter('grade_description', TYPES.NVarChar , data.grade_description);
            connection.execSql(request);
        });
    },
    getRecords: function(callback, condition) {
        var connection = new Connection(config);
        
        connection.on('connect', function(err) {
            request = new Request("SELECT * FROM dbo.Grade "+condition+";", function(err, rowCount, rows) {
                if (err) {
                    console.log(err);
                    callback(-1, err);
                } else {
                    var rowsResult = new Array();
                    rows.forEach(function(columns) {
                        var row = {};
                        columns.forEach(function(column) {
                            row[column.metadata.colName] = column.value;
                        });
                        rowsResult.push(row);
                    });
                    callback(1, rowsResult);
                }
            });

            connection.execSql(request);
        });
    },
};