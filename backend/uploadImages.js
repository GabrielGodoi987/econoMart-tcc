const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Src/Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + path.extname(file.originalname));
    },
})
//controle para que não seja salvo várias imagens iguais 
//controle do mime type da imagem, para que não seja feito o upload de arquivos de extensão diferente de jpg ou png

const save = multer({
    storage: storage,
})

module.exports = { save }   


