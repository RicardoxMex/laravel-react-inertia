import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";

import { Link, router } from "@inertiajs/react";
import ChevronTable from "@/Components/ChevronTable";

export default function TasksTable({ tasks, queryParams = null, routeGet = "", hideProjectColumn = false }) {

    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route(routeGet, queryParams))
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
        router.get(route('task.index', queryParams))
    }
    return (
        <>
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
                            {!hideProjectColumn && (
                                <th className="px-3 py-3">Project Name</th>
                            )}
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
                            {!hideProjectColumn && (
                                <th className="px-3 py-3"></th>
                            )}
                            <th className="px-3 py-3">
                                <TextInput
                                    className="w-full"
                                    defaultValue={queryParams.name}
                                    placeholder="Task Name"
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

                        {tasks.data.map((task) => (
                            <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-3 py-2" >{task.id}</td>
                                <td className="px-3 py-2" >
                                    <img src={task.image_path} alt={task.name} style={{ width: 60 }} />
                                </td>
                                {!hideProjectColumn && (
                                    <td className="px-3 py-3" >{task.project.name}</td>
                                )}

                                <td className="px-3 py-3" >{task.name}</td>
                                <td className="px-3 py-3" >
                                    <span className={
                                        "px-2 py-1 rounded text-white " +
                                        PROJECT_STATUS_CLASS_MAP[task.status]
                                    }>
                                        {PROJECT_STATUS_TEXT_MAP[task.status]}
                                    </span>
                                </td>
                                <td className="px-3 py-3 text-nowrap" >{task.created_at}</td>
                                <td className="px-3 py-3 text-nowrap" >{task.due_date}</td>
                                <td className="px-3 py-3" >{task.created_by.name}</td>
                                <td className="px-3 py-3" >
                                    <Link href={route("task.edit", task.id)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                        Edit
                                    </Link>
                                    <Link href={route("task.destroy", task.id)}
                                        className="font-medium text-redf-600 dark:text-red-500 hover:underline mx-1">
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            <Pagination links={tasks.meta.links} />
        </>
    )
}