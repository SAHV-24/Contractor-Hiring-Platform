# 👷React Contractor Hiring Platform (React Vanilla)

![Demo Image](https://i.imgur.com/5cgihwD.png)

This project is a contractor hiring platform built using *React Vanilla* (without Create React App), leveraging Context API and *Redux for state management*, and *Firebase* **Authentication** and **Realtime Database** for user authentication and data persistence.

## Running the Application

### Prerequisites

* Node.js (version >= 16)
* npm (Node Package Manager)

### Running Backend and Frontend Simultaneously

```bash
npm run all
```

### Running in Development Mode

```bash
npm run dev
```

### Running the Backend Server

```bash
npm run serv
```

## Backend API Documentation

The API for managing data is accessible at `http://localhost:3000/api/`.

### API Endpoints

#### Retrieving Data (GET)

To retrieve all documents from a specific collection, make a **GET** request to:

/api/{collection}


Where `{collection}` can be one of the following:

* `Contratistas` (Contractors)
* `Usuarios` (Users)
* `Categorias` (Categories)
* `Citas` (Appointments)

**Example:** To get all contractors, access `/api/Contratistas`.

#### Creating Data (POST)

To create a new document in a specific collection, make a **POST** request to:

`/api/{collection}/insert`


The request body must contain a JSON object representing the data to be inserted.

**Example:** To create a new user, send a POST request to `/api/Usuarios/insert` with a JSON body containing the user's information.

#### Updating Data (PUT)

To update an existing document in a specific collection, make a **PUT** request to:

`/api/{collection}/update/{ObjectId}`


Replace `{ObjectId}` with the unique identifier of the document you want to update. The request body must contain a JSON object with the updated data.

**Example:** To update a contractor with the ID `someUniqueId`, send a PUT request to `/api/Contratistas/update/someUniqueId` with a JSON body containing the updated contractor details.

#### Deleting Data (DELETE)

To delete a document from a specific collection, make a **DELETE** request to:

`/api/{collection}/delete/{ObjectId}`


Replace `{ObjectId}` with the unique identifier of the document you want to delete. No request body is required for this operation.
