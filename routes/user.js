const express = require('express');
const router = express.Router();
const data = require('../data');
const user = data.user;
const shopData = data.shop;
const productData = data.products;

router.get('/', async (req, res) => {
    try {
        const userList = await user.getAll();
        //console.log(userList)
        const data = {
            title: "All user",
            alluser: userList,
        };
        res.render('allUser', data);
    } catch (e) {
        res.status(500).json({
            error: e
        });
    }
});


router.get('/:id1/allshop', async (req, res) => {
    try {
        const userid = req.params.id1;
        const restaurantList = await shopData.getShopWithItem();
        //console.log(restaurantList)
        //console.log("-------------")
        const userInfo = await user.getUser(userid);
        var userId = userInfo._id
        const data = {
            title: "Shop List",
            allShop: restaurantList,
            userdata: userInfo,
            userId: userId
        };
        res.render('allShopUserView', data);
    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
});

router.get('/:idUser/shop/:shopId', async (req, res) => {
    try {
        const userid = req.params.idUser;
        const shopId = req.params.shopId;

        const userInfo = await user.getUser(userid);
        const shopDetail = await shopData.get(shopId);
        var shopName = shopDetail.name
        var shopIdd = shopDetail._id;
        const allProduct = await productData.getAllProduct(shopId);
        if (allProduct) {
            const dataa = {
                allItem: allProduct.item,
                shopName: shopName,
                shopId: shopIdd,
                userData: userInfo,
                shopDetail: shopDetail
            };
            res.render('userView', dataa);
            return;
        }

    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
});

router.post('/:idUser/shop/:shopId', async (req, res) => {
    const userid = req.params.idUser;
    const shopId = req.params.shopId;
    const {
        message
    } = req.body;
    try {
        const userInfo = await user.getUser(userid);
        const shopInfo = await shopData.get(shopId);
        await shopData.message(userInfo, shopId, message)
        var shopName = shopInfo.name
        var shopIdd = shopInfo._id;
        const allProduct = await productData.getAllProduct(shopId);
        if (allProduct) {
            const dataa = {
                allItem: allProduct.item,
                shopName: shopName,
                shopId: shopIdd,
                userData: userInfo,
                shopDetail: shopInfo,
                mess: "Thanks for sending replay"
            };
            res.render('userView', dataa);
            return;
        }

    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
});

router.post('/', async (req, res) => {
    const userData = req.body;
    const name = userData.name;

    try {
        const userData = await user.create(name);
        const data = {
            title: "All user",
            alluser: userData,
        };
        response.render('alluser', data);
    } catch (e) {
        res.status(500).json({
            error: e
        });
    }
});


module.exports = router;