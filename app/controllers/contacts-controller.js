function ContactsController() {
    this.tag = 'contactsController';

    this.init = function(req, res) {
        var verb = req.method || 'UNKNOWN';
        switch (verb.toUpperCase()) {
                // @post(/v2/contacts)
            case 'POST':
                getApi('base-api').create(req, res);
                break;
                // @get(/v2/contacts)
            case 'GET':
                getApi('base-api').retrieve(req, res);
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
