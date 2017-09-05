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
    deleteRecord: function (callback, userid) {
        var connection = new Connection(config);
        connection.on('connect', function(err) {
            request = new Request("DELETE FROM dbo.Users WHERE user_id=@UserID;", function(err) {
                if (err) callback(-1, err);  
                else callback(1, 'success');
            });
            request.addParameter('UserID', TYPES.Int, userid);  
            connection.execSql(request);
        });
    },
    storeRecord: function (callback, data) {
        var connection = new Connection(config);
        connection.on('connect', function(err) {
            request = new Request("INSERT dbo.Users (user_full_name, user_email, user_account_name, user_status, created_at, updated_at, deleted_at, grade_id, division_id, office_id) "+ 
                                    "VALUES (@Name, @Email, @UserAccount, 'not active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '', @GradeID, 1, 1);", function(err) {
                if (err) callback(-1, err);  
                else callback(1, 'success');
            });
            
            request.addParameter('Name', TYPES.NVarChar, data.fullname);  
            request.addParameter('UserAccount', TYPES.NVarChar , 'mitrais/'+data.username);
            request.addParameter('Email', TYPES.NVarChar , data.email);
            request.addParameter('GradeID', TYPES.Int , data.grade_id);
            connection.execSql(request);
        });
    },
    getRecords: function(callback, condition) {
        var connection = new Connection(config);
        
        connection.on('connect', function(err) {
            request = new Request("SELECT * FROM dbo.Users "+condition+";", function(err, rowCount, rows) {
                if (err) {
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