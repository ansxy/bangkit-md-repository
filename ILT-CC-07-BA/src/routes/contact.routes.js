const { addContact, getContact, updateContactById, deleteContactById } = require("../controller/contact.controller")

const contactRoute = [
    {
        method: 'POST',
        path: '/contact',
        handler: addContact
    },
    {
        method: 'GET',
        path: '/contact' ,
        handler: getContact
    },
    {
        method: 'PUT',
        path: '/contact/{id}',
        handler: updateContactById
    },
    {
        method: 'DELETE',
        path: '/contact/{id}',
        handler: deleteContactById
    }
]

module.exports = {contactRoute}