import express,{Response,Request} from 'express';
import multer from 'multer';
import bodyParser from 'body-parser';
import {AppDataSource} from "./src/data-source";
import {Product} from "./src/entity/Product";
const upload = multer()

AppDataSource
.initialize()
.then(() => {
    console.log('Data Source has been initialized!')
})
.catch((err) => {
    console.error("Error during Data Source initialization:", err)
})

const app = express()
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static( './src/public'));

app.get('/products', async (req: Request, res: Response) => {
    let products = await AppDataSource.getRepository(Product) .find();
    res.render('list', {products: products});
})

app.get('/products/create', (req: Request, res:Response) => {
    res.render('create')
})


app.post('/products/create', upload.single('image'), async (req: any, res: any) => {

    try{
        let product = new Product();
        product.price = req.body.price;
        product.name = req.body.name;
        product.image = req.file.originalname;
        product.author = req.body.author;
        const productRepository = AppDataSource.getRepository(Product);
        await productRepository.save(product);
        res.redirect('/products');
        console.log(product)
    }catch (e) {
        console.log(e.message)
    }
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/upload')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname)
    }
})


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})