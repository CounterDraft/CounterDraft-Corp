function ContactsController() {
    this.tag = 'contactsController';

    this.init = function(req, res) {
        var verb = req.method || 'UNKNOWN';
        switch (verb.toUpperCase()) {
                // @post(/v2/contacts)
            case 'POST':
                // TODO: checks to make sure req.body has the correct information.
                var self = this;
                 getApi('base-api').create(req.body).then(function(user) {
                        res.status(201).json({
                            user: user,
                            success: true
                        });
                        return;
                    })
                    .catch(function(err) {
                        self.getErrorApi().setErrorWithMessage(err, 400, res);
                        return;
                    });
                break;
                // @get(/v2/contacts)
            case 'GET':
                var self = this;
                 getApi('base-api').retrieve(req.body).then(function(user) {
                        res.status(201).json({
                            user: user,
                            success: true
                        });
                    })
                    .catch(function(err) {
                        console.log(err);
                        self.getErrorApi().sendError(1004, 400, res);
                    });

                break;
                // @put(/v2/contacts) 
            case 'PUT':
                this.getErrorApi().sendError(1001, 403, res);
                break;
                // @delete(/v2/contacts)     
            case 'DELETE':
                this.getErrorApi().sendError(1001, 403, res);
                break;
            default:
                this.getErrorApi().sendError(1001, 403, res);
                break;
        }
    }
}

module.exports = ContactsController;
