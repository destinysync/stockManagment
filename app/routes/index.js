'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {

    // function isLoggedIn (req, res, next) {
    // 	if (req.isAuthenticated()) {
    // 		return next();
    // 	} else {
    // 		res.redirect('/login');
    // 	}
    // }

    var clickHandler = new ClickHandler();

    app.route('/')
        .get(function (req, res) {
            res.sendFile(path + '/public/index.html');
        });

    app.route('/logout')
        .get(function (req, res) {
            req.logout();
            res.redirect('/');
        });

    app.route('/auth/local')
        .post(passport.authenticate('local', {failureRedirect: '/login'}),
            function (req, res) {
                res.redirect('/');
            });

    app.route('/inbound/*')
        .post(clickHandler.inbound);

    app.route('/admin')
        .get(function (req, res) {
            if (req.isAuthenticated()) {
                if (req.user.local.id == 'admin@qq.com') {
                    res.sendFile(path + '/public/admin.html');
                } else {
                    res.sendFile(path + '/public/admin-agent.html');
                }
            } else {
                res.redirect('/');
            }
        })
        .post(clickHandler.getInventory);

    app.route('/addModel/*')
        .post(clickHandler.addModel);

    app.route('/addAgent')
        .post(clickHandler.addAgent);

    app.route('/signInOrSignUp/')
        .post(passport.authenticate('signup', {
            successRedirect: '/admin',
            failureRedirect: '/',
            failureFlash: true
        }));

    app.route('/changeLoginIcon')
        .post(clickHandler.changeLoginIcon);

    app.route('/profile')
        .get(clickHandler.sendProfilePage);

    app.route('/updateList')
        .post(clickHandler.updateList);

    app.route('/displayMyBooks')
        .post(clickHandler.displayMyBooks);

    app.route('/addBooks/*')
        .post(clickHandler.addBooks);

    app.route('/delMyBookFromDB/*')
        .post(clickHandler.delMyBookFromDB);

    app.route('/displayAllBooks')
        .get(clickHandler.displayAllBooks);

    app.route('/getProfile')
        .get(clickHandler.getProfile);

    app.route('/sendTradeRequest/*')
        .post(clickHandler.sendTradeRequest);

    app.route('/deleteRequestToMe/*')
        .post(clickHandler.deleteRequestToMe);

    app.route('/requestsToOthers')
        .post(clickHandler.requestsToOthers);

    app.route('/changePassword/*')
        .post(clickHandler.changePassword);

    app.route('/requestsToMe')
        .post(clickHandler.requestsToMe);

    app.route('/delRequestsToOthers/*')
        .post(clickHandler.delRequestsToOthers);

    app.route('/approveRequestToMe/*')
        .post(clickHandler.approveRequestToMe);

    app.route('/getApprovedRequestCouint')
        .post(clickHandler.getApprovedRequestCouint);


    app.route('/isAuthenticated')
        .post(function (req, res) {
            if (req.isAuthenticated()) {
                res.json({
                    'auth': 'true',
                    'userID': req.user._id
                });
            } else {
                res.json({
                    'auth': 'false',
                    'userID': 'none'
                });
            }
        })

};
