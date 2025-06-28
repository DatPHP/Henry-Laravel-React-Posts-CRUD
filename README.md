# Henry-Laravel-React-Posts-CRUD

A CRUD application using Laravel (backend) and React (frontend).

## Reference

Tutorial: [Laravel React JS CRUD Application](https://www.itsolutionstuff.com/post/laravel-react-js-crud-application-tutorialexample.html)

---

## Setup Instructions

### 1. Create a New Laravel Project

```bash
composer create-project laravel/laravel:^11.0 your-project-name
```

### 2. Install and Set Up Breeze (Authentication)

Install Laravel Breeze:

```bash
composer require laravel/breeze --dev
```

Install Breeze with React:

```bash
php artisan breeze:install react
```

### 3. Install Node.js Dependencies

```bash
npm install
```

### 4. Start the Vite Development Server

```bash
npm run dev
```

Keep this command running to enable hot reloading for your React frontend.

### 5. Run Database Migrations

```bash
php artisan migrate
```

This will create the necessary tables in your database.

### 6. Create Migration and Model for Posts

Create a migration for the `posts` table:

```bash
php artisan make:migration create_posts_table
```

Create a model for posts (if not already created):

```bash
php artisan make:model Post
```

---

## Additional Resources

- [Laravel Livewire CRUD Application Tutorial](https://www.itsolutionstuff.com/post/laravel-livewire-crud-application-tutorialexample.html)