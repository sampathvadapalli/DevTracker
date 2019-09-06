var path = require('path');
var ldap = require('ldapjs');
var express = require('express');
var app = express();
var format = require('string-format');
var passport = require('passport');
var passportLocal = require('passport-local');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var client = ldap.createClient({
    url: '',
    reconnect: true,
});
var axios = require('axios');
var excelToJson = require('convert-excel-to-json');
var excel_results = excelToJson({
    sourceFile: 'trackerRequests.xlsx',
    columnToKey: {
        A: 'request_id',
        B: 'request_team_id',
        C: 'request_manager_id',
        D: 'request_job_id',
        E: 'request_card_number',
        F: 'request_submitted_on',
        G: 'request_status',
        H: 'request_placement_by',
        I: 'request_placed',
        J: 'request_mentor_name'
    }
});
var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dev-academy-tracker1'
});

var flash = require('connect-flash');
app.use(express.static(__dirname +'./../../')); //serves the LoginPage.ejs
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    key: 'session_id',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

con.connect(function (err) {
    if(err){
        console.log("Error connecting to the DB");
    }
    else {
        console.log("Connected to the DB");
    }
})

function functiontofindIndexByKeyValue1(arraytosearch, key) {

    for (var i = 0; i < arraytosearch.length; i++) {

        if (arraytosearch[i].type.toString() === key) {
            return i;
        }
    }
    return null;
}

function verifyCreds(username, password, done){

    var temp = username + "@cerner.net";
    client.bind(temp, password, function (err) {
        if (err) {
            done(null, false, {message: 'Invalid LDAP login credentials. Please try again.'});
        }
        else {
            var userFilter = {
                filter: format('&(objectClass=*)(sAMAccountName={0})',  username),
                scope: 'sub',
            };
            pushExcelRequestsToTable();
            client.search('OU=Users,OU=Bangalore,OU=Office Locations,dc=northamerica,dc=cerner,dc=net', userFilter, function (err, res) {
                res.on('searchEntry', function (entry) {

                    var nameIndex = functiontofindIndexByKeyValue1(entry.attributes,'displayName');
                    var name = entry.attributes[nameIndex].vals[0].toString();
                    var execIndex = functiontofindIndexByKeyValue1(entry.attributes,'extensionAttribute4');
                    var exec = entry.attributes[execIndex].vals[0].toString();
                    var depIndex = functiontofindIndexByKeyValue1(entry.attributes,'department');
                    var department = entry.attributes[depIndex].vals[0].toString();
                    var title = functiontofindIndexByKeyValue1(entry.attributes,'title');
                    var profile = entry.attributes[title].vals[0].toString();
                    var userIdIndex = functiontofindIndexByKeyValue1(entry.attributes,'sAMAccountName');
                    var userId = entry.attributes[userIdIndex].vals[0].toString().toLowerCase();
                    var teamIdIndex = functiontofindIndexByKeyValue1(entry.attributes,'extensionAttribute3');
                    var teamId = entry.attributes[teamIdIndex].vals[0].toString();
                    if(profile.includes("Manager"))
                    {
                        done(null, {givenId: userId, userName: name, prof: profile, dept: department, executiveName: exec, teamId: teamId});
                        console.log("Access Granted");
                    }
                    else {
                        done(null, false, {message: 'Access Denied'});
                    }
                });
            });
        }
    })
}
passport.use(new passportLocal.Strategy(verifyCreds));

passport.serializeUser(function(user, done){
    done(null, user);
});
passport.deserializeUser(function(user, done){
    done(null, user);
});

app.get('/main', function(req, res, next){
    res.render(path.join(__dirname + './../.././views/MainPage.ejs'), {
        isAuthenticated: req.isAuthenticated(),
        user: req.user,
    });
});

function pushExcelRequestsToTable(){
        var results = excel_results.trackerRequests;
        for (var i=0; i<results.length; i++)
        {
            var id = excel_results.trackerRequests[i].request_id;
            var team_id = excel_results.trackerRequests[i].request_team_id;
            var manager_id = "'" + excel_results.trackerRequests[i].request_manager_id + "'";
            var job_id = excel_results.trackerRequests[i].request_job_id;
            var card_number = "'" + excel_results.trackerRequests[i].request_card_number + "'";
            var submitted_on = "'" + excel_results.trackerRequests[i].request_submitted_on + "'";
            var status = "'"+excel_results.trackerRequests[i].request_status.toString() +"'";
            var placement_by = "'"+excel_results.trackerRequests[i].request_placement_by.toString().substring(0,10)+"'";
            var placed = excel_results.trackerRequests[i].request_placed;
            var mentor_name = "'"+excel_results.trackerRequests[i].request_mentor_name+"'";

            const insert_query = "INSERT INTO requests (id, team_id, manager_id, job_id, card_number, submitted_on, status, placement_by, placed, mentor_name) VALUES ( "+id+", "+team_id+", "+manager_id+", "+job_id+", "+card_number+", "+submitted_on+", "+status+", "+placement_by+", "+placed+", "+mentor_name+")";
            con.query(insert_query, (err) => {
                if (err)
                {
                    console.log("");
                }
                else
                {
                    console.log("Requests Table Updated");
                }

            });
        };

}

app.get('/login',function (req,res){
    res.render(path.join(__dirname + './../.././views/LoginPage.ejs'), {
        message: req.flash('error'),
    })
});


app.get('/main/data', function (req,res) {
    if(req.isAuthenticated())
    {
        res.json(req.user);
    }
    else
    {
        res.sendStatus(404);
    }
});

app.post('/login', passport.authenticate('local', {
        successRedirect: '/main',
        failureRedirect: '/login',
        badRequestMessage: 'Missing Credentials. Enter Cerner Credentials',
        failureFlash: true
    })
);

app.get('/allRequests',function (req,res) {
   if(req.isAuthenticated()){
       con.query("SELECT requests.id, teams.name, associate.full_name, requests.job_id, requests.card_number, requests.submitted_on, requests.status, requests.placement_by, requests.placed, requests.mentor_name from requests, associate, teams where requests.team_id = teams.id AND requests.manager_id = associate.id", function (err,result) {
           if(!!err)
           {
               console.log(err);
               res.sendStatus(200);
           }
           else {
               res.json(result);
           }
       })
   }
   else {
       res.sendStatus(404);
   }
});

app.get('/db',function (req,res) {
    if(req.isAuthenticated())
    {
        con.query("SELECT * from superusers", function (err,result) {
            if(!!err)
            {
                console.log(err);
                res.sendStatus(200);
            }
            else
            {
                for(var i=0;i<result.length;i++)
                {
                    if(req.user.givenId===result[i].associate_id)
                    {
                        con.query("SELECT requests.id, teams.name, associate.full_name, requests.job_id, requests.card_number, requests.submitted_on, requests.status, requests.placement_by, requests.placed, requests.mentor_name from requests, associate, teams where requests.team_id = teams.id AND requests.manager_id = associate.id", function (err,result) {
                            if(!!err)
                            {
                                console.log(err);
                            }
                            else {
                                res.json(result);
                            }
                        })
                    }
                }

                con.query('SELECT requests.id, teams.name, associate.full_name, requests.job_id, requests.card_number, requests.submitted_on, requests.status, requests.placement_by, requests.placed, requests.mentor_name, associate.manager_id from requests, associate, teams WHERE requests.manager_id in (SELECT id FROM associate WHERE manager_id = "'+req.user.givenId+'" OR id="'+req.user.givenId+'") AND requests.team_id = teams.id AND requests.manager_id = associate.id', function (err,result) {
                    if(!!err)
                    {
                        res.send(err);
                    }
                    else {
                        res.json(result);
                    }
                })

            }
        });
    }
    else {
        res.sendStatus(404);
    }
});


app.get('/addRequest',function(req,res){
    if(req.isAuthenticated())
    {
        const {id, team_id, manager_id, job_id, card_number, submitted_on, status, placement_by, placed, mentor_name} = req.query;
        const insert_query = "INSERT INTO requests (id, team_id, manager_id, job_id, card_number, submitted_on, status, placement_by, placed, mentor_name) VALUES ( "+id+", "+team_id+", "+manager_id+", "+job_id+", "+card_number+", "+submitted_on+", "+status+", "+placement_by+", "+placed+", "+mentor_name+")";
        con.query(insert_query, (err,result) => {
            if (err)
            {
                console.log(err);
            }
            else
            {
                res.json(result);
            }

        });
    }
    else
    {
        res.sendStatus(404);
    }
});
app.get('/logout', function(req,res){
    req.session.destroy();
    res.redirect('/main');
});

module.exports = app;
