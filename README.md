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

#### Example Migration (`database/migrations/xxxx_xx_xx_xxxxxx_create_posts_table.php`):

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('body');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('posts');
    }
};
```

#### Example Model (`app/Models/Post.php`):

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'body',
    ];
}
```

### 7. Create Routes

Add the following resource route in `routes/web.php`:

```php
use App\Http\Controllers\PostController;

Route::resource('posts', PostController::class);
```

Add or keep the default routes for the homepage and dashboard:

```php
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';
```

### 8. Create Controller

Generate the controller:

```bash
php artisan make:controller PostController
```

Example `app/Http/Controllers/PostController.php`:

```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        return Inertia::render('Posts/Index', ['posts' => $posts]);
    }

    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'title' => ['required'],
            'body' => ['required'],
        ])->validate();

        Post::create($request->all());
        return redirect()->route('posts.index');
    }

    public function edit(Post $post)
    {
        return Inertia::render('Posts/Edit', [
            'post' => $post
        ]);
    }

    public function update($id, Request $request)
    {
        Validator::make($request->all(), [
            'title' => ['required'],
            'body' => ['required'],
        ])->validate();

        Post::find($id)->update($request->all());
        return redirect()->route('posts.index');
    }

    public function destroy($id)
    {
        Post::find($id)->delete();
        return redirect()->route('posts.index');
    }
}
```

### 9. Create React Pages

Create the following files in `resources/js/Pages/Posts/`:
- `Index.jsx`
- `Create.jsx`
- `Edit.jsx`

#### Example: `Index.jsx`

```jsx
import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage, Link } from '@inertiajs/inertia-react';

export default function Index(props) {
    const { posts } = usePage().props;

    function destroy(e) {
        if (confirm("Are you sure you want to delete this post?")) {
            Inertia.delete(route("posts.destroy", e.currentTarget.id));
        }
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Posts</h2>}
        >
            <Head title="Posts" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                    href={ route("posts.create") }
                                >
                                    Create Post
                                </Link>
                            </div>
                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 w-20">No.</th>
                                        <th className="px-4 py-2">Title</th>
                                        <th className="px-4 py-2">Body</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map(({ id, title, body }) => (
                                        <tr key={id}>
                                            <td className="border px-4 py-2">{ id }</td>
                                            <td className="border px-4 py-2">{ title }</td>
                                            <td className="border px-4 py-2">{ body }</td>
                                            <td className="border px-4 py-2">
                                                <Link
                                                    tabIndex="1"
                                                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                    href={route("posts.edit", id)}
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={destroy}
                                                    id={id}
                                                    tabIndex="-1"
                                                    type="button"
                                                    className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {posts.length === 0 && (
                                        <tr>
                                            <td className="px-6 py-4 border-t" colSpan="4">
                                                No posts found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
```

#### Example: `Create.jsx`

```jsx
import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, useForm, Link } from '@inertiajs/inertia-react';

export default function Create(props) {
    const { data, setData, errors, post } = useForm({
        title: "",
        body: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("posts.store"));
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Post</h2>}
        >
            <Head title="Posts" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={ route("posts.index") }
                                >
                                    Back
                                </Link>
                            </div>
                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            name="title"
                                            value={data.title}
                                            onChange={(e) => setData("title", e.target.value)}
                                        />
                                        <span className="text-red-600">{errors.title}</span>
                                    </div>
                                    <div className="mb-0">
                                        <label>Body</label>
                                        <textarea
                                            className="w-full rounded"
                                            name="body"
                                            value={data.body}
                                            onChange={(e) => setData("body", e.target.value)}
                                        />
                                        <span className="text-red-600">{errors.body}</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
```

#### Example: `Edit.jsx`

```jsx
import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, useForm, usePage, Link } from '@inertiajs/inertia-react';

export default function Edit(props) {
    const { post } = usePage().props;
    const { data, setData, put, errors } = useForm({
        title: post.title || "",
        body: post.body || "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("posts.update", post.id));
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Post</h2>}
        >
            <Head title="Posts" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={ route("posts.index") }
                                >
                                    Back
                                </Link>
                            </div>
                            <form name="editForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            name="title"
                                            value={data.title}
                                            onChange={(e) => setData("title", e.target.value)}
                                        />
                                        <span className="text-red-600">{errors.title}</span>
                                    </div>
                                    <div className="mb-0">
                                        <label>Body</label>
                                        <textarea
                                            className="w-full rounded"
                                            name="body"
                                            value={data.body}
                                            onChange={(e) => setData("body", e.target.value)}
                                        />
                                        <span className="text-red-600">{errors.body}</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
```

### 10. Add Posts Link to Navbar

In your `Authenticated.jsx` layout, add a link to the posts page:

```jsx
<NavLink href={route('posts.index')} active={route().current('posts.index')}>
    Posts
</NavLink>
```

### 11. Run the Application

Start the Laravel backend:

```bash
php artisan serve
```

Start the Vite development server (for React hot reload):

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

Visit [http://localhost:8000](http://localhost:8000) in your browser to view the app.

---

## Additional Resources

- [Laravel Livewire CRUD Application Tutorial](https://www.itsolutionstuff.com/post/laravel-livewire-crud-application-tutorialexample.html)