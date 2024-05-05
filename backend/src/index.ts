import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { auth } from 'express-oauth2-jwt-bearer'

const prisma = new PrismaClient()
const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});

/* Pets CRUD */
app.route('/api/pets')
  .get(async (req, res) => {
    let pets = await prisma.animalPost.findMany({
      select: {
        id: true,
        species: true,
        name: true,
        breed: true,
        color: true
      }
    })
    res.json(pets)
  })

app.route('/api/pets/:id')
  .get(async (req, res) => {
    let pet = await prisma.animalPost.findUnique({
      where: {
        id: Number(req.params.id)
      },
      select: {
        id: true,
        species: true,
        name: true,
        breed: true,
        color: true,
        shelter: true
      }
    })
    res.json(pet)
  })

app.route('/api/pets/:id/image')
  .get(async (req, res) => {
    let data = await prisma.animalPost.findUnique({
      where: {
        id: Number(req.params.id)
      },
      select: {
        imageName: true
      }
    })
    let imagePath = process.cwd() + '/media/' + data.imageName
    res.sendFile(imagePath)
  })

/* Favorites CRUD */
app.route('/api/private/favorites')
  .get(checkJwt, async (req, res) => {
    const userId = req.query.userId;
    const petId = req.query.petId;

    try {
      let pets = await prisma.favorite.findMany({
        where: {
          userId: String(userId),
          petId: Number(petId)
        }
      })
      res.json(pets)
    }
    catch {
      res.sendStatus(500)
    }
  })
  .post(checkJwt, async (req, res) => {
    const body = req.body
    try {
      await prisma.favorite.create({
        data: {
          userId: body.userId,
          petId: Number(body.petId)
        }
      })

      res.sendStatus(201)
    }
    catch (error) {
      res.sendStatus(500)
    }
  })

app.route('/api/private/favorites/:userId')
  .get(checkJwt, async (req, res) => {
    const userId = req.params.userId;

    try {
      const favoritePets = await prisma.favorite.findMany({
        where: {
          userId: userId
        },
        include: {
          pet: true
        }
      })

      res.json(favoritePets)
    }
    catch {
      res.sendStatus(500)
    }
  })

app.route('/api/private/favorites/:userId/:petId')
  .delete(checkJwt, async (req, res) => {
    const userId = req.params.userId;
    const petId = req.params.petId;

    try {
      await prisma.favorite.deleteMany({
        where: {
          userId: userId,
          petId: Number(petId)
        }
      })

      res.sendStatus(200)
    }
    catch {
      res.sendStatus(500)
    }
  })

app.route('/api/shelter')
  .post(checkJwt, async (req, res) => {
    let data = req.body;
    
    try {
      let shelter = await prisma.shelter.create({
        data: {
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone
          
        }
      })
    }
    catch {
      res.sendStatus(500);
    }

    res.sendStatus(201);
  })

app.listen(8080, () => console.log(`Server listening on port 8080`))

