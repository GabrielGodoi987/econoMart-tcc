const multer = require('multer')
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Src/CustImage')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + uuidv4();
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
})
//controle para que não seja salvo várias imagens iguais 
//controle do mime type da imagem, para que não seja feito o upload de arquivos de extensão diferente de jpg ou png

const save = multer({
    storage: storage,
})

module.exports = { save }
