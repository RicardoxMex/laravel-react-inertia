import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";

export default function FormUser({ user = null, type }) {
    const { data, setData, post, errors } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        password: user?.password || '',
        password_confirmation: user?.password_confirmation || '',
        _method: type
    })

    const onSubmit = (e) => {
        e.preventDefault()
        if (type == 'POST') {
            post(route('user.store'))
        } else if (type == 'PUT') {
            post(route('user.update', user.id))
        };

    }
    return (
        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg" enctype="multipart/form-data">
            <div className="mt-4">
                <InputLabel htmlFor="name" value="User Name:" />
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
                <InputLabel htmlFor="email" value="Email:" />
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError className="mt-2" message={errors.email} />
            </div>
            <div className="mt-4">
                <InputLabel htmlFor="password" value="Password" />
                <TextInput
                    id="password"
                    type="password"
                    name="name"
                    value={data?.password}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('password', e.target.value)}
                />

                <InputError className="mt-2" message={errors.password} />
            </div>
            <div className="mt-4">
                <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                <TextInput
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data?.password_confirmation}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                />

                <InputError className="mt-2" message={errors.name} />
            </div>
            <div className="mt-4 text-right">
                <Link href={route('user.index')} className="inline-block bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2 text-sm">
                    Cancel
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadown transition-all hover:bg-emerald-600 text-sm">Submit</button>
            </div>
        </form>
    );
}