const { v4: uuidv4 } = require('uuid')
const contacts = require('../lib/contact')

const addContact = (request,h ) => {
    const {name ,phone , email}= request.payload
    const id = uuidv4()
    if(name !== undefined) {
        const newContact = {id,name,phone,email}
        contacts.push(newContact)
        const isSuccess = contacts.filter((contact) =>  contact.id === id).length > 0
        if(isSuccess){
            const response = h.response({
                status: 'success',
                message: 'Data Berhasil Ditambahkan',
                data: newContact
            })
            response.code(201)
            return response
        }
    }
    const response = h.response({
        status: 'Fail',
        message: 'Isikan nama anda , nama tidak boleh kosong'
    })
    response.code(400)
    return response
}

const getContact = (request,h) => {
    const {search} = request.query
    if(search !== undefined) {
        const getContactByName = contacts.filter((contact) => contact.name.toLowerCase().includes(search.toLowerCase()))
        if(getContactByName.length > 0 === false ) {
            const response = h.response({
                status: 'fail',
                message: 'Nama tidak ditemukan'
            })
            response.code(404)
            return response    
        } else {
            const response = h.response({
                status: ' success',
                data: {contact : getContactByName}
            })
            response.code(200)
            return response
        }
    }
    const response = h.response({
        status: ' success',
        data: {
            contacts
        }
    })
    response.code(200)
    return response
}

const deleteContactById = (request,h) => {
    const {id} = request.params
    const checkId = contacts.findIndex((contact) => contact.id === id)
    if(checkId !== -1){
        contacts.splice(checkId,1)
        const response = h.response({
            status:'success',
            message: 'Contact berhasil dihapus'
        })
        response.code(200)
        return response
    }
    const response = h.response({
        status: 'fail',
        message: 'Id tidak dapat ditemukan'
    })
    response.code(404)
    return response

}

const updateContactById =(request,h) => {
    const {id} = request.params
    const {name,email,phone} = request.payload
    const checkId = contacts.findIndex((contact) => contact.id === id)
    if(checkId !== -1) {
        if(name !== undefined) {
            const newContact = {id,name,phone,email}
            contacts[checkId] = {
                ...contacts[checkId],
                name,
                email,
                phone
            }
            const response = h.response({
                    status: 'success',
                    message: 'Data Berhasil Dirubah',
                    data: newContact
                })
                response.code(200)
                return response
        }
        const response = h.response({
            status: 'Fail',
            message: 'Isikan nama anda , nama tidak boleh kosong'
        })
        response.code(400)
        return response
    }
    const response = h.response({
        status: 'fail',
        message: 'id tidak ditemukan'
    })
    response.code(404)
    return response
}

module.exports = {addContact, getContact,updateContactById,deleteContactById}