import express from 'express';

import middlewareUploadSingleFile from '../src/upload.js'
import newShop from '../src/createShop.js';
import saveImgS3 from '../src/saveImgS3.js';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('/get:', { url: req.url, query: req.query });

    res.json({ success: true });
});


router.post('/', async (req, res) => {
    console.log('req.body in form.js', req.body);
    const ret = await newShop(req.body);
    
    if (!ret) {
       return res.json({ success: false, error: "Erreur enregistrement shop" });
    }
    res.json({ success: true, body: req.body, ret: ret });    
});

<<<<<<< HEAD
router.post('/upload-image', async (req, res) => {
    const ret = await saveImgS3(req);
    if (ret) {
    // if (!ret) {
       return res.json({ success: false, error: "Erreur enregistrement image dans AWS_S3" });
    }
    res.json({ success: true, body: req.body, ret: ret, urlImage: 'testURLimage'  });    
=======

router.post('/upload-image', middlewareUploadSingleFile, async (req, res) => {
    console.log('\n\n/upload-image', { fileLocation: req.file?.location })
    
    res.json({ success: true, urlImage: req.file.location || null });
>>>>>>> bf3a73a6c263b192026138edecb1eedf881df360
});


export default router;