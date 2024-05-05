import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import fs from 'node:fs'

function main() {

    /* Get the large structure of pet previews in the area */
    fetch('https://api-staging.adoptapet.com/search/pet_search?' + new URLSearchParams({
        key: process.env.ADOPT_A_PET_API_KEY,
        v: '3',
        output: 'json',
        city_or_zip: '48103',
        geo_range: '50',
        species: 'cat',
        breed_id: '',
        sex: '',
        age: '',
        color_id: '',
        pet_size_range_id: '',
        hair: '',
        bonded_pair: '',
        special_needs: '',
        include_mixes: '',
        added_after: '',
        start_number: '1',
        end_number: '200',
        meta_only: '0'
    }))
    .then(response => response.json())
    .then(data => {
        if (data.status == 'ok'){
            for (let i = 0; i < data.pets.length; ++i){
                const preview = data.pets[i]

                /* Get more in depth details for each pet */
                let petInfoURL = preview.details_url;
                fetch(petInfoURL)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status == 'ok'){
                            let petInfo = data.pet;

                            if (petInfo.species && petInfo.pet_name && petInfo.primary_breed && petInfo.color) {

                                /* Get an image for the pet */
                                let imageURL = petInfo.images[0].original_url;
                                let imageName = imageURL.split('/').pop()
                                fetch(imageURL)
                                    .then(response => response.blob())
                                    .then(blob => blob.arrayBuffer())
                                    .then(buffer => {

                                        /* Save image to disc */
                                        const ws = fs.createWriteStream('media/' + imageName)
                                        ws.write(new Uint8Array(buffer))
                                        ws.end()
                                    })
                                    .catch(error => console.log("Failed to get pet image"))

                                /* Save information to database */
                                setTimeout( () => {
                                    prisma.animalPost.upsert({
                                        where: {
                                            id: petInfo.pet_id,
                                        },
                                        update: {},
                                        create: {
                                            id: petInfo.pet_id,
                                            species: petInfo.species,
                                            name: petInfo.pet_name,
                                            breed: petInfo.primary_breed,
                                            color: petInfo.color,
                                            imageName: imageName
                                        }
                                    })
                                        .catch(error => console.log(error))
                                }, i*1000)
                            }
                        }
                        else {
                            console.log("Failed to get specific pet info")
                        }

                    })
                    .catch(error => console.log("Failed to get pet info"))
            }
        }
        else {
            console.log("Failed to get large overview")
        }
    })
        .catch(error => {
            console.log("Failed to fetch big structure")
            console.log(error)
        })
}

main()
