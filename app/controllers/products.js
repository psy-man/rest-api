import _ from 'lodash';
import Product from '../models/product';

export const list = (req, res) =>
    Product.find().exec()
        .then(products =>
            res.json({
                status: true,
                data: products
            }))
        .catch(err =>
            res.json(500, {
                status: false,
                data: `Error: ${err}`
            }));


export const create = (req, res) => {
    const product = new Product(req.body);

    product.save()
        .then(product =>
            res.json({
                status: true,
                data: product
            }))
        .catch(err =>
            res.json(500, {
                status: false,
                data: `Error: ${err}`
            }));
};

export const view = (req, res) =>
    Product.findById(req.params.id).exec()
        .then(product => {
            if (product) {
                res.json({
                    status: true,
                    data: product
                });
            } else {
                res.json(404, {
                    status: false,
                    data: `Error: Not found`
                });
            }
        })
        .catch(err =>
            res.json(500, {
                status: false,
                data: `Error: ${err}`
            }));


export const update = (req, res) =>
    Product.findById(req.params.id).exec()
        .then(product => {
            if (product) {
                _.extend(product, req.body);
                return product.save();
            } else {
                res.json(404, {
                    status: false,
                    data: `Error: Not found`
                });
            }
        })
        .then(product =>
            res.json({
                status: true,
                data: product
            }))
        .catch(err =>
            res.json(500, {
                status: false,
                data: `Error: ${err}`
            }));

