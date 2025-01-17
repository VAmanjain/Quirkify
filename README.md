# Quirkify

**Quirkify** is a social media platform designed to let users post their quirky thoughts without worrying about others' points of view or reactions. Built with Next.js, MongoDB Atlas, Cloudinary, and Google Authentication (via NextAuth), Quirkify offers a unique, no-judgment space to express yourself.

![image](https://github.com/user-attachments/assets/3356d1a8-3666-4a76-aa35-fd905fa2fff7)

<img src="https://github.com/user-attachments/assets/3356d1a8-3666-4a76-aa35-fd905fa2fff7" style="border-radius: 15px; overflow: hidden"/>



## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Environment Variables](#environment-variables)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)

## Tech Stack

- **Frontend**: Next.js
- **Backend**: MongoDB Atlas, NextAuth (Google Authentication)
- **Database**: MongoDB Atlas
- **Image Storage**: Cloudinary
- **Authentication**: NextAuth (Google Auth)

## Features

- Post quirky thoughts without the fear of judgment
- Use Google Authentication for easy login
- Image storage powered by Cloudinary
- Clean and responsive UI powered by Next.js

## Environment Variables

Ensure you have the following environment variables set up in your `.env.local` file:

```bash
GOOGLE_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>

MONGODB_URI=<your-mongodb-uri>

NEXTAUTH_URL=<your-nextauth-url>
NEXTAUTH_URL_INTERNAL=<your-internal-nextauth-url>

NEXTAUTH_SECRET=<your-nextauth-secret>

NEXT_PUBLIC_BASE_URI=<your-base-uri>

CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=<your-cloudinary-upload-preset>
```

## Setup

To get started with the project:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/quirkify.git
    cd quirkify
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables (as shown above).

4. Start the development server:
    ```bash
    npm run dev
    ```

The app will be available at `http://localhost:3000`.

## Usage

- Visit the homepage to sign in using Google.
- Once logged in, you can post your quirky thoughts and upload images.
- Browse the quirky thoughts from other users.

## Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -am 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.



Feel free to modify the details or adjust the instructions based on your project structure.
