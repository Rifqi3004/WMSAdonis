'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ikan extends Model {
    static get table () {
        return 'tbl_ikan'
      }
}

module.exports = Ikan
