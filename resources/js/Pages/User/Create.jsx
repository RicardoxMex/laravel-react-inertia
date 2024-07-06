import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import FormUser from "./FormProject";


export default function Create({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Create new User </h2>}>
            <Head title="Create new User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <FormUser type='POST' />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}