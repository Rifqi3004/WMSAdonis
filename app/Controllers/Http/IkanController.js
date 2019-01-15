'use strict'
const Ikan = use('App/Models/Ikan') 
const Env = use('Env')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with ikans
 */
class IkanController {
  async getData({request}){    
    const pages = request.input('page')
    const limits = request.input('limit')
    var page = 1

    var limit = 4

    if (pages != null) {
        page = pages
    }
    if (limits != null) {
        limit = limits
    }
    const ikan = await Ikan.query().paginate(page,limit)
    var next = parseInt(page) + 1
    var prev = page - 1
    if (prev < 1) {
        prev = 1
    }

    if (next > ikan.pages.lastPage) {
        next = ikan.pages.lastPage
    }
   
    
    var waktu = [];
    var suhu = [];
    var ph = [];
    var tinggi = [];
    await ikan.rows.map(item => {
        const date = new Date(item.waktu)
        waktu.push(date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear())
        suhu.push(parseFloat(item.suhu))
        ph.push(parseFloat(item.ph))
        tinggi.push(parseFloat(item.tinggi))
    })
    var suhu2 = [];
    var ph2 = [];
    var tinggi2 = [];
    await ikan.rows.map(item => {
        
        const date = new Date(item.waktu)
        const tgl = date
       
        suhu2.push({x:tgl, y:parseFloat(item.suhu)})
        ph2.push({x:tgl, y:parseFloat(item.ph)})
        tinggi2.push({x : tgl,y : parseFloat(item.tinggi)})
    })

    const data2 = {
        nextUrl: Env.get('APP_URL')+'/data?page=' + next,
        prevUrl: Env.get('APP_URL')+'/data?page=' + prev,
        page: ikan.pages.page,
        total: ikan.pages.total,
        perPage: ikan.pages.perPage,
        lastPage: ikan.pages.lastPage,
         suhu2, ph2, tinggi2
    }
    const data = {
      nextUrl: Env.get('APP_URL')+'/data?page=' + next,
      prevUrl: Env.get('APP_URL')+'/data?page=' + prev,
      page: ikan.pages.page,
      total: ikan.pages.total,
      perPage: ikan.pages.perPage,
      lastPage: ikan.pages.lastPage,
      waktu, suhu, ph, tinggi
    }
    // return view.render('chart',{data})
    return data
  }
  async chart({response, view}){
    // const ikan = await Ikan.all();
    // var waktu = [];
    // var suhu = [];
    // var ph = [];
    // var tinggi = [];
    // await ikan.rows.map(item => {
    //     waktu.push(item.waktu)
    //     suhu.push(item.suhu)
    //     ph.push(item.ph)
    //     tinggi.push(item.tinggi)
    // })
    // var data = {
    //     waktu, suhu, ph, tinggi
    // }
    return view.render('chart2')
    // return data
  }

  async table({response, request, view}){
    const pages = request.input('page')
    const limits = request.input('limit')
    var page = 1

    var limit = 5

    if (pages != null) {
        page = pages
    }
    if (limits != null) {
        limit = limits
    }
    const ikan = await Ikan.query().paginate(page,limit)
    var next = parseInt(page) + 1
    var prev = page - 1
    if (prev < 1) {
        prev = 1
    }

    if (next > ikan.pages.lastPage) {
        next = ikan.pages.lastPage
    }

    
    const data = {
      nextUrl: Env.get('APP_URL')+'/table?page=' + next,
      prevUrl: Env.get('APP_URL')+'/table?page=' + prev,
      page: ikan.pages.page,
      total: ikan.pages.total,
      perPage: ikan.pages.perPage,
      lastPage: ikan.pages.lastPage,
      rows: ikan.rows

    }
    
    return view.render('table',{ikan : data})
  }

  /**
   * Show a list of all ikans.
   * GET ikans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({request}) {
    const ikan = await Ikan.all()
    const getph = await Ikan.query().getAvg('ph')
    const ph =  parseFloat(getph).toFixed(1)
    const getsuhu = await Ikan.query().getAvg('suhu')
    const suhu = parseFloat(getsuhu).toFixed(1)
    const gettinggi = await Ikan.query().getAvg('tinggi')
    const tinggi = parseFloat(gettinggi).toFixed(1)

    return {ikan, ph, suhu, tinggi}
  }

  /**
   * Render a form to be used for creating a new ikan.
   * GET ikans/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new ikan.
   * POST ikans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single ikan.
   * GET ikans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing ikan.
   * GET ikans/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update ikan details.
   * PUT or PATCH ikans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a ikan with id.
   * DELETE ikans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = IkanController
