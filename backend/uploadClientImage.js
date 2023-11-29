const multer = require('multer')
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Src/CustImage')
    },
    filename: (req, file, cb) => {
        cb(null, + Date.now() + path.extname(file.originalname));
    },
})
//controle para que não seja salvo várias imagens iguais 
//controle do mime type da imagem, para que não seja feito o upload de arquivos de extensão diferente de jpg ou png

const save = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Tipo de arquivo não suportado. Apenas imagens jpg ou png são permitidas.'));
        }
    }
})

module.exports = { save }
