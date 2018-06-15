var ldap = require('ldapjs');
var express = require('express');
var format = require('string-format');

var client = ldap.createClient({
    url: 'ldap://ldap.northamerica.cerner.net:389',
    reconnect: true
});

var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dev-academy-tracker1'
});

var app = express();
var username = 'vs056645@cerner.net';
var password = 'QwErT1@3';
var count = 0;


app.listen(3000, function (req,res) {
    console.log('http://127.0.0.1:3000');
});

app.get('/', function (req,res) {
    res.send(result.managerDetails[1]);
});

client.bind(username,password,function (err) {
    if(err)
    {
        console.log('wrong');
    }
    else
    {
       function functiontofindIndexByKeyValue1(arraytosearch, key) {

            for (var i = 0; i < arraytosearch.length; i++) {

                if (arraytosearch[i].type.toString() === key) {
                    return i;
                }
            }
            return null;
        }


        var opts1 = {
            filter: format('&(objectClass=*)(title={0})',  "*Manager*"),
            //filter: '(objectClass=*)',
            scope: 'sub',
            timeLimit: 6000
        };

        client.search('OU=Users,OU=Bangalore,OU=Office Locations,dc=northamerica,dc=cerner,dc=net', opts1, function (err, res) {
            res.on('searchEntry', function (entry) {
                //console.log(entry);
                var nameIndex = functiontofindIndexByKeyValue1(entry.attributes,'displayName');
                var name = entry.attributes[nameIndex].vals[0].toString().toLowerCase();;
                //worksheet.cell(count,2).string(name);
                var deptIndex = functiontofindIndexByKeyValue1(entry.attributes,'department');
                var team = entry.attributes[deptIndex].vals[0].toString().toLowerCase();
                //worksheet.cell(count,5).string(role);
                var idIndex = functiontofindIndexByKeyValue1(entry.attributes,'sAMAccountName');
                var userId = entry.attributes[idIndex].vals[0].toString().toLowerCase();

                var mailIndex = functiontofindIndexByKeyValue1(entry.attributes,'mail')
                var mailId =  entry.attributes[mailIndex].vals[0].toString().toLowerCase();

                var managerIndex = functiontofindIndexByKeyValue1(entry.attributes,'extensionAttribute6');
                var mgr = entry.attributes[managerIndex].vals[0].toString().toLowerCase();

                var execIndex = functiontofindIndexByKeyValue1(entry.attributes,'extensionAttribute6');
                var execName = entry.attributes[execIndex].vals[0].toString().toLowerCase();

                var teamIndex = functiontofindIndexByKeyValue1(entry.attributes,'extensionAttribute3');
                var teamId = entry.attributes[teamIndex].vals[0].toString().toLowerCase();
                    //worksheet.cell(count,4).string(mgr);

                var options = {
                    filter: format('&(objectClass=*)(displayName={0})',  mgr),
                        //filter: '(objectClass=*)',
                    scope: 'sub',
                    timeLimit: 6000
                }

                userId = "'" + userId + "'";
                mailId = "'" + mailId + "'";
                teamId = "'" + teamId + "'";
                team = "'" + team + "'";
                name = "'" + name + "'";
                client.search('OU=Users,OU=Bangalore,OU=Office Locations,dc=northamerica,dc=cerner,dc=net', options, function (err, res) {
                    res.on('searchEntry',function(entry){
                        var role = 1;
                        count = count + 1;
                        var idIndex = functiontofindIndexByKeyValue1(entry.attributes,'sAMAccountName');
                        var mgrId = entry.attributes[idIndex].vals[0].toString().toLowerCase();
                        mgrId = "'" + mgrId + "'";
                        const insert_query = ("INSERT INTO associate (id, manager_id, email, role_id, full_name) VALUES ( "+userId+","+mgrId+","+mailId+","+role+","+name+")");
                        con.query(insert_query, (err) => {
                            if (err)
                            {
                                console.log(err + "error");
                            }
                            else {
                                console.log("");
                            }

                        });

                    })
                })
                var opt = {
                    filter: format('&(objectClass=*)(displayName={0})',  execName),
                    //filter: '(objectClass=*)',
                    scope: 'sub',
                    timeLimit: 6000
                };
                client.search('OU=Users,OU=Bangalore,OU=Office Locations,dc=northamerica,dc=cerner,dc=net', options, function (err, res){
                    res.on('searchEntry',function (entry){
                        var idIndex = functiontofindIndexByKeyValue1(entry.attributes,'sAMAccountName');
                        var execId = entry.attributes[idIndex].vals[0].toString().toLowerCase();
                        execId = "'" + execId + "'";
                        var tbd = "'"+"TBD"+"'";
                        const insert_query = ("INSERT INTO teams (id, name, exec_id, manager_id, teamscol) VALUES ( "+teamId+","+team+","+execId+","+userId+","+tbd+")");
                        con.query(insert_query, (err) => {
                            if (err)
                            {
                                console.log(err + "error");
                            }
                            else {
                                console.log("");
                            }

                        });

                    })
                })

            });
        });
        console.log('---------');
    }
});
