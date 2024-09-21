# EDyA2 Project

## Run Backend and Frontend

npm run all

## Run Dev Mode

npm run dev

## Run Server

npm run serv

# BACKEND DOCUMENTATION

To manage the *API*, you shall use: **localhost:3000/api/**

### Endpoints

To **GET** any information from any collection:

<p style="text-align: center;">
  *ENDPOINT/{collection}*
</p>
Where `collection` can be: *Contratistas, Usuarios, Categorias, Citas*

To **create** any document in any collection, make a *POST* request to:

<p style="text-align: center;">
  *ENDPOINT/{collection}/insert*
</p>
*(Remember to send a JSON body)*

To **UPDATE**, make a *PUT* request to:

<p style="text-align: center;">
  *ENDPOINT/collection/update/{ObjectId}*
</p>
Where `ObjectId` is the one you want to update *(remember to send a JSON body)*.

To **DELETE**, make a *DELETE* request to:

<p style="text-align: center;">
  *ENDPOINT/collection/delete/{ObjectId}*
</p>
Where `ObjectId` is the one you want to delete *(you don't need to send any body)*.
