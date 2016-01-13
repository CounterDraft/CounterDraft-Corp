"use strict";

function BaseApi() {
    this.tag = 'baseApi';

    this.create = function(req, res){

        if (req.body) {
            res.status(201).json({
                success: true
            });
        }else{
            this.getErrorApi().sendError(1004, 400, res);
        }
        
    }

    this.retrieve = function(req, res){
        if (req.body.username === 'admin@counterdraft.com') {
            req.session.user = {
                username: req.body.username,
                permissions: ['session:*']
            }
            //TODO: need to makes a message.resourse file so we can keep all the strings in it.
            res.status(200).json({
                user: req.session.user,
                success: true
            });
        }else{
            this.getErrorApi().sendError(1001, 403, res);
        }
    }
}

module.exports = BaseApi;
