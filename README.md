# EDyA2 Project

## Run Backend and Frontend

npm run all

## Run dev mode

npm run dev

## Run server

npm run serv

# BACKEND DOCUMENTATION

To manage the *api* you shall use: localhost:3000/api/

To GET any information of any collection: ENDPOINT/{collection}
Where collection can be "Contratistas, Usuarios, Categorias, Citas"

To create any document on any collection you should do a POST petition to:
    =>ENDPOINT/{collection}/insert
(remember to send a json body)


To UPDATE, do a PUT petition to=>
    => ENDPOINT/collection/update/{ObjectId}
Where ObjectId is the one that you'll delete
(remember to send a json body).


To DELETE, do a DELETE petition to=>
    => ENDPOINT/collection/delete/{ObjectId}
Where ObjectId is the one that you'll delete
(You don't need to send any body)

