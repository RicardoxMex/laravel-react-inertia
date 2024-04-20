import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import ChevronTable from "@/Components/ChevronTable";

export default function Index({ auth, projects, queryParams = null, success }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route('project.index', queryParams))
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
        router.get(route('project.index', queryParams))
    }
    const deleteProject = (project) => {
        if (!window.confirm(`Are you sure you want to delete project ${project.name}?`)) {
            return;
        }
        router.delete(route("project.destroy", project.id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Projects</h2>
                <Link href={route('project.create')} className="bg-emerald-500 py-1 px-3 text-white rounded shadown transition-all hover:bg-emerald-600">Add new</Link>
            </div>}>
            <Head title="Projects" />
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
                                                className="px-3 py-3">
                                                Image
                                            </th>
                                            <th
                                                onClick={e => sortChanged('name')}
                                                className="w-[400px]">
                                                <div
                                                    className="px-3 py-3 cursor-pointer  hover:bg-gray-950 flex items-center justify-between gap-1">
                                                    Name
                                                    <ChevronTable
                                                        sort_direction={queryParams.sort_direction}
                                                        sort_field={queryParams.sort_field}
                                                        field="name"
                                                    />
                                                </div>
                                            </th>

                                            <th
                                                onClick={e => sortChanged('status')}>
                                                <div
                                                    className="px-3 py-3 cursor-pointer  hover:bg-gray-950 flex items-center justify-between gap-1">
                                                    Status
                                                    <ChevronTable
                                                        sort_direction={queryParams.sort_direction}
                                                        sort_field={queryParams.sort_field}
                                                        field="status"
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
                                                onClick={e => sortChanged('due_date')}>
                                                <div
                                                    className="px-3 py-3 cursor-pointer  hover:bg-gray-950 flex items-center justify-between gap-1">
                                                    Due Date
                                                    <ChevronTable
                                                        sort_direction={queryParams.sort_direction}
                                                        sort_field={queryParams.sort_field}
                                                        field="due_date"
                                                    />
                                                </div>
                                            </th>
                                            <th
                                                onClick={e => sortChanged('created_by')}>
                                                <div
                                                    className="px-3 py-3 cursor-pointer  hover:bg-gray-950 flex items-center justify-between gap-1">
                                                    Created By
                                                    <ChevronTable
                                                        sort_direction={queryParams.sort_direction}
                                                        sort_field={queryParams.sort_field}
                                                        field="due_date"
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
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.name}
                                                    placeholder="Project Name"
                                                    onBlur={e => searchFieldChanged('name', e.target.value)}
                                                    onKeyPress={e => onKeyPress('name', e)}
                                                />
                                            </th>
                                            <th className="px-3 py3">
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={queryParams.status}
                                                    onChange={e => searchFieldChanged('status', e.target.value)}
                                                >
                                                    <option value="">Select Status</option>
                                                    {Object.entries(PROJECT_STATUS_TEXT_MAP).map(([key, value]) => (
                                                        <option key={key} value={key}>{value}</option>
                                                    ))}
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3 text-right"></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {projects.data.map((project) => (
                                            <tr key={project.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-3 py-2" >{project.id}</td>
                                                <td className="px-3 py-2" >
                                                    <img src={project.image_path} alt={project.name} style={{ width: 60 }} />
                                                </td>
                                                <th className="px-3 py-3 hover:underline text-gray-100 text-nowrap" ><Link href={route("project.show", project.id)} >{project.name}</Link></th>
                                                <td className="px-3 py-3" >
                                                    <span className={
                                                        "px-2 py-1 rounded text-white " +
                                                        PROJECT_STATUS_CLASS_MAP[project.status]
                                                    }>
                                                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3 text-nowrap" >{project.created_at}</td>
                                                <td className="px-3 py-3 text-nowrap" >{project.due_date}</td>
                                                <td className="px-3 py-3" >{project.created_by.name}</td>
                                                <td className="px-3 py-3" >
                                                    <Link href={route("project.edit", project.id)}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        onClick={e => deleteProject(project)}
                                                        className="font-medium text-redf-600 dark:text-red-500 hover:underline mx-1">
                                                        Delete
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}