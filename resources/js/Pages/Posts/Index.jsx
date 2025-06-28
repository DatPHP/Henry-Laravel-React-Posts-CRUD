import React, { useCallback, useMemo } from 'react';
import { Head, usePage, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function PostsIndex(props) {
    const { posts } = usePage().props;

    const handleDelete = useCallback((e) => {
        const postId = e.currentTarget.id;
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(route('posts.destroy', postId));
        }
    }, []);

    const tableRows = useMemo(() => {
        if (posts.length === 0) {
            return (
                <tr>
                    <td className="px-6 py-4 border-t text-center text-gray-500" colSpan="4">
                        No posts found.
                    </td>
                </tr>
            );
        }

        return posts.map(({ id, title, body }) => (
            <tr key={id} className="hover:bg-gray-50 transition-colors">
                <td className="border px-4 py-2 text-center">{id}</td>
                <td className="border px-4 py-2 max-w-xs truncate" title={title}>
                    {title}
                </td>
                <td className="border px-4 py-2 max-w-md truncate" title={body}>
                    {body}
                </td>
                <td className="border px-4 py-2 text-center">
                    <Link
                        className="inline-block px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        href={route('posts.edit', id)}
                    >
                        Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        id={id}
                        type="button"
                        className="ml-2 px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ));
    }, [posts, handleDelete]);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Posts
                </h2>
            }
        >
            <Head title="Posts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    href={route('posts.create')}
                                >
                                    Create Post
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="px-4 py-2 w-20 border border-gray-300 font-semibold">
                                                No.
                                            </th>
                                            <th className="px-4 py-2 border border-gray-300 font-semibold text-left">
                                                Title
                                            </th>
                                            <th className="px-4 py-2 border border-gray-300 font-semibold text-left">
                                                Body
                                            </th>
                                            <th className="px-4 py-2 border border-gray-300 font-semibold">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableRows}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}