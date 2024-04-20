import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";

export default function FormProject({ project=null, type }) {
    const { data, setData, post, errors, reset, patch, put } = useForm({
        image: "",
        name: project?.name || '',
        status: project?.status || '',
        description: project?.description || '',
        due_date: project?.due_date || '',
        _method: type
    })

    const onSubmit = (e) => {
        e.preventDefault()
        if (type == 'POST') {
            post(route('project.store'))
        } else if (type == 'PUT') {
            post(route('project.update', project.id))
        };

    }
    return (
        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" enctype="multipart/form-data">
            {project?.image_path && (<div>
                <img className="w-1/3" src={project.image_path} alt="" />
            </div>)}
            <div>
                <InputLabel htmlFor="project_image_path" value="Project Image" />
                <TextInput
                    id="project_image_path"
                    type="file"
                    name="image"
                    className="mt-1 block w-full"
                    onChange={e => setData('image', e.target.files[0])} 
                    //onChange={e => {console.log(e.target.files[0])}} 
                    />

                <InputError className="mt-2" message={errors.image} />
            </div>
            <div className="mt-4">
                <InputLabel htmlFor="name" value="Project Name" />
                <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={data?.name}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('name', e.target.value)}
                />

                <InputError className="mt-2" message={errors.name} />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="description" value="Project Description" />
                <TextAreaInput
                    id="description"
                    type="text"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('description', e.target.value)}
                ></TextAreaInput>

                <InputError className="mt-2" message={errors.description} />
            </div>
            <div className="mt-4">
                <InputLabel htmlFor="due_date" value="Project Deadline" />
                <TextInput
                    id="due_date"
                    type="date"
                    name="due_date"
                    value={data.due_date}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('due_date', e.target.value)}
                />

                <InputError className="mt-2" message={errors.due_date} />
            </div>
            <div className="mt-4">
                <InputLabel htmlFor="status" value="Project Status" />
                <SelectInput
                    name="status"
                    id="project_status"
                    className="mt-1 block w-full"
                    onChange={e => setData("status", e.target.value)}>
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progres</option>
                    <option value="completed">Complete</option>

                </SelectInput>

                <InputError className="mt-2" message={errors.status} />
            </div>
            <div className="mt-4 text-right">
                <Link href={route('project.index')} className="inline-block bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2 text-sm">
                    Cancel
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadown transition-all hover:bg-emerald-600 text-sm">Submit</button>
            </div>
        </form>
    );
}