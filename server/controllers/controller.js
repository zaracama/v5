const {
    User,
    Cuisine,
    Bin,
    Catalog
} = require('../models')
const { Op } = require("sequelize");
const axios = require('axios')
const url = require('url')
const {
    signToken
} = require('../helpers/jwt')
const midtransClient = require('midtrans-client');

class Controller {

    static async discordLogin(req, res, next) {
        try {
            const {
                code
            } = req.query

            if (code) {
                const formData = new url.URLSearchParams({
                    client_id: process.env.DISCORD_CLIENT_ID,
                    client_secret: process.env.DISCORD_CLIENT_SECRET,
                    grant_type: 'authorization_code',
                    code: code.toString(),
                    redirect_uri: 'https://K-eat-b54c2.web.app'
                })

                const output = await axios.post('https://discord.com/api/v10/oauth2/token',
                    formData, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                    })

                if (output.data) {
                    const access = output.data.access_token

                    const userInfo = await axios.get('https://discord.com/api/v10/users/@me', {
                        headers: {
                            'Authorization': `Bearer ${access}`,
                        },
                    })

                    const [user, isCreated] = await User.findOrCreate({
                        where: {
                            discord: userInfo.data.id
                        },
                        defaults: {
                            username: userInfo.data.username
                        },
                        hooks: false
                    });

                    const access_token = signToken({
                        id: user.id
                    })
                    
                    let isStatus = 200
                    if (isCreated) isStatus = 201

                    res.status(isStatus).json({
                        access_token
                    })
                }
            }
        } catch (err) {
            next(err)
        }
    }

    static async cuisines(req, res, next) {
        try {
            const { search, filterCatalog } = req.query
            const where = {}
            if (search) {
                where.name = {
                    [Op.iLike]: `%${search}%`
                }
            }
            if (filterCatalog) {
                where.CatalogId = {
                    [Op.eq]: filterCatalog
                }
            }

            const cuisines = await Cuisine.findAll({
                include: Catalog,
                order: [['CatalogId', 'ASC']],
                where
            })
            
            res.json(cuisines)
        } catch (err) {
            next(err)
        }
    }

    static async catalogs(req, res, next) {
        try {
            const catalogs = await Catalog.findAll()
            res.json(catalogs)
        } catch (err) {
            next(err)
        }
    }

    static async bins(req, res, next) {
        try {
            const bins = await Bin.findAll({
                where: {
                    UserId: req.userId
                },
                include: Cuisine,
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            
            res.json(bins)
        } catch (err) {
          next(err)  
        }
    }

    static async createBin(req, res, next) {
        try {
            const { cuisineId } = req.params
            const cuisine = await Cuisine.findByPk(cuisineId)
            if (!cuisine) {
                throw {name: 'no_cuisine'}
            }

            await Bin.create({
                UserId: req.userId,
                CuisineId: cuisine.id
            });

            res.status(201).json({message: 'Add new chart successfully'})
        } catch (err) {
            next(err)
        }
    }

    static async deleteBin(req, res, next) {
        try {
            const { id } = req.params
            const bin = await Bin.findByPk(id)
            if (!bin) {
                throw {name: 'no_bin'}
            }
            await Bin.destroy({
                where: {
                    id
                }
            })

            res.json({message: `Success delete from bin`})
        } catch (err) {
           next(err) 
        }
    }

    static async getFeaturedCuisines(req, res, next) {
        try {
            const featuredCuisines = await Catalog.findAll({
                include: {
                    model: Cuisine,
                    limit: 1
                }
            })
            res.json(featuredCuisines)
        } catch (err) {
           next(err) 
        }
    }

    static async patchBin(req, res, next) {
        try {
            const { qty } = req.body
            const { id } = req.params
            const bin = await Bin.findByPk(id)
            if (!bin) {
                throw {name: 'no_bin'}
            }
            await bin.increment('quantity', {by: qty}, {
                where: {
                    id: bin.id
                }
            })

            res.json({message: 'Bin updated successfully'})

        } catch (err) {
            next(err)
        }
    }

    static async generateMidtransToken(req, res, next) {
        try {
            let totalAmount = 0

            const user = await User.findByPk(req.userId)
            const bins = await Bin.findAll({
                where: {
                    UserId: req.userId
                },
                include: Cuisine,
                order: [
                    ['updatedAt', 'DESC']
                ]
            })

            bins.forEach((el) => {
                totalAmount += el.Cuisine.price * el.quantity
            })

            let snap = new midtransClient.Snap({
                // Set to true if you want Cuisineion Environment (accept real transaction).
                isCuisineion : false,
                serverKey : process.env.MIDTRANS_SERVER_KEY
            });

            let parameter = {
                "transaction_details": {
                    "order_id": "I-PROJECT-" + Math.floor(Math.random() * 1000000000),
                    "gross_amount": totalAmount
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    username: user.username
                }
            };

            const midtransToken = await snap.createTransaction(parameter)
            res.status(201).json(midtransToken)
        } catch (err) {
           next(err) 
        }
    }

    static async clearBinAfterPayment(req, res, next) {
        try {
            await Bin.destroy({
                where: {
                    UserId: req.userId
                }
            })
            res.status(200).json({message: 'Thankyou for your order'})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller