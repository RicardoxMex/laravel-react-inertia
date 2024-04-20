import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"

export default ({ sort_field, sort_direction, field }) => {

    return (
        <div>
            <ChevronUpIcon className={"w-4 ml-1 " + (sort_direction==="asc" && sort_field == field ? "text-white" : "")} />
            <ChevronDownIcon className={"w-4 ml-1 " + (sort_direction==="desc" &&  sort_field == field ? "text-white" : "")} />
        </div>
    )
}