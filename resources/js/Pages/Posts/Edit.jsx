import React, { useCallback, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, Link } from '@inertiajs/react'; 
import NavLink from '@/Components/NavLink';

export default function Edit(props) {
    const { post } = usePage().props;
    
    const { data, setData, put, errors, processing } = useForm({
        title: post.title || '',
        body: post.body || '',
    });

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        put(route('posts.update', post.id));
    }, [put, post.id]);

    const handleInputChange = useCallback((field, value) => {
        setData(field, value);
    }, [setData]);

    const isFormValid = useMemo(() => {
        return data.title.trim() && data.body.trim();
    }, [data.title, data.body]);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Post
                </h2>
            }
        >
            <Head title="Edit Post" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {/* Navigation */}
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                                    href={route('posts.index')}
                                >
                                    ← Back to Posts
                                </Link>
                                
                                <NavLink 
                                    href={route('posts.index')} 
                                    active={route().current('posts.index')}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Posts
                                </NavLink>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    {/* Title Field */}
                                    <div>
                                        <label 
                                            htmlFor="title" 
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Title
                                        </label>
                                        <input
                                            id="title"
                                            type="text"
                                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                                                errors.title 
                                                    ? 'border-red-500 focus:ring-red-500' 
                                                    : 'border-gray-300'
                                            }`}
                                            name="title"
                                            value={data.title}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                            placeholder="Enter post title..."
                                            disabled={processing}
                                        />
                                        {errors.title && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.title}
                                            </p>
                                        )}
                                    </div>

                                    {/* Body Field */}
                                    <div>
                                        <label 
                                            htmlFor="body" 
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Body
                                        </label>
                                        <textarea
                                            id="body"
                                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-vertical min-h-[120px] ${
                                                errors.body 
                                                    ? 'border-red-500 focus:ring-red-500' 
                                                    : 'border-gray-300'
                                            }`}
                                            name="body"
                                            value={data.body}
                                            onChange={(e) => handleInputChange('body', e.target.value)}
                                            placeholder="Enter post content..."
                                            disabled={processing}
                                        />
                                        {errors.body && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.body}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing || !isFormValid}
                                        className={`px-6 py-2 font-semibold text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                                            processing || !isFormValid
                                                ? 'bg-gray-400 cursor-not-allowed focus:ring-gray-400'
                                                : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
                                        }`}
                                    >
                                        {processing ? 'Updating...' : 'Update Post'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}