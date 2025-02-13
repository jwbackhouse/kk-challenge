# Task submission

## Running the app

The client and server are separate apps inside this repository.

1. Client
  ```sh
  cd client
  yarn
  yarn dev
  ```

2. Server

  ```sh
  cd server
  yarn
  yarn start:dev
  ```

The app will now be running on [http://localhost:5173](http://localhost:5173), with the backend on [http://localhost:3000](http://localhost:3000)

By default, the client will redirect you to a URL containing a valid user ID. You can obviously then change the user ID to see different responses or how it handles errors.

## Approach

### Backend

This is my first time working with NestJS, so the code structure may not be typical! I have created a separate `comms` module to handle the `/comms/your-next-delivery/:userId` endpoint, and imported that into the main `AppModule`.

Tests are written using Supertest to allow for full integration testing of the endpoint. Coverage could certainly be improved, and it probably makes sense to add unit tests for the service.

### Frontend

I have used Vite with vanilla CSS for the frontend. I would definitely look at either CSS frameworks or CSS modules for production, but this was a quick way to get a basic UI up and running.

I used React Query to handle API requests, and Zod to validate the response. As mentioned in a comment in the code, the ideal would be to have end-to-end type safety with the server using something like OpenAPI or ts-rest.

## Limitations

As a prototype with a limited amount of time spent on it, there's inevitably a lot of things I would like to improve... Were this a real project and I was asked to continue working on it, here are some of my priorities:

- **Testing**: The backend has some integration tests, but could definitely benefit from more unit tests. The frontend has no tests at all

- **Content management**: Allowing content changes independently of the code would likely be very helpful. This could be achieved with a CMS or storing the text in a database

- **CSS**: As mentioned above, I would look at using a CSS framework or CSS modules for production. There are also no shared design tokens, except for the colours which I set as variables on the root

