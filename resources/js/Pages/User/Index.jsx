import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import ChevronTable from "@/Components/ChevronTable";

export default function Index({ auth, users, queryParams = null, success }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route('user.index', queryParams))
    };

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;
        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc';
            } else {
                queryParams.sort_direction = 'asc';
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route('user.index', queryParams))
    }
    const deleteUser = (user) => {
        if (!window.confirm(`Are you sure you want to delete User ${user.name}?`)) {
            return;
        }
        router.delete(route("user.destroy", user.id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    users</h2>
                <Link href={route('user.create')} className="bg-emerald-500 py-1 px-3 text-white rounded shadown transition-all hover:bg-emerald-600">Add new</Link>
            </div>}>
            <Head title="users" />
            {
                success && (
                    <div className="bg-green-100 border-t-4 border-green-500 text-green-700 px-4 py-3" role="alert">
                        <p className="font-bold">{success}</p>
                    </div>
                )
            }

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th
                                                onClick={e => sortChanged('id')}>
                                                <div className="px-3 py-3 cursor-pointer hover:bg-gray-950 flex items-center justify-between gap-1">
                                                    ID
                                                    <ChevronTable
                                                        sort_direction={queryParams.sort_direction}
                                                        sort_field={queryParams.sort_field}
                                                        field="id"
                                                    />
                                                </div>
                                            </th>

                                            <th
                                                onClick={e => sortChanged('name')}
                                                className="w-[400px]">
                                                <div
                                                    className="px-3 py-3 cursor-pointer  hover:bg-gray-950 flex items-center justify-between gap-1">
                                                    User Name
                                                    <ChevronTable
                                                        sort_direction={queryParams.sort_direction}
                                                        sort_field={queryParams.sort_field}
                                                        field="name"
                                                    />
                                                </div>
                                            </th>

                                            <th
                                                onClick={e => sortChanged('email')}>
                                                <div
                                                    className="px-3 py-3 cursor-pointer  hover:bg-gray-950 flex items-center justify-between gap-1">
                                                    User Email
                                                    <ChevronTable
                                                        sort_direction={queryParams.sort_direction}
                                                        sort_field={queryParams.sort_field}
                                                        field="email"
                                                    />
                                                </div>

                                            </th>

                                            <th
                                                onClick={e => sortChanged('created_at')}>
                                                <div
                                                    className="px-3 py-3 cursor-pointer  hover:bg-gray-950 flex items-center justify-between gap-1">
                                                    Create Date
                                                    <ChevronTable
                                                        sort_direction={queryParams.sort_direction}
                                                        sort_field={queryParams.sort_field}
                                                        field="created_at"
                                                    />
                                                </div>

                                            </th>
                                            <th
                                                onClick={e => sortChanged('')}
                                                className="px-3 py-3 text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap ">
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.name}
                                                    placeholder="User Name"
                                                    onBlur={e => searchFieldChanged('name', e.target.value)}
                                                    onKeyPress={e => onKeyPress('name', e)}
                                                />
                                            </th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.email}
                                                    placeholder="Email Name"
                                                    onBlur={e => searchFieldChanged('email', e.target.value)}
                                                    onKeyPress={e => onKeyPress('email', e)}
                                                />
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3 text-right"></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {users.data.map((user) => (
                                            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-3 py-2" >{user.id}</td>
                                                <th className="px-3 py-3 hover:underline text-gray-100 text-nowrap" ><Link href={route("user.show", user.id)} >{user.name}</Link></th>
                                                <td className="px-3 py-3" >{user.email}</td>
                                                <td className="px-3 py-3 text-nowrap" >{user.created_at}</td>
                                                <td className="px-3 py-3" >
                                                    <Link href={route("user.edit", user.id)}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        onClick={e => deleteUser(user)}
                                                        className="font-medium text-redf-600 dark:text-red-500 hover:underline mx-1">
                                                        Delete
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={users.meta.links} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}