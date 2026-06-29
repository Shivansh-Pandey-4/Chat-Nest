import clsx from "clsx"

interface IInput extends React.ComponentProps<"input"> {
    className?: string;
}

export default function Input({ className, ...props }: IInput) {

    const baseStyle = "ui:border ui:px-4 ui:py-1 ui:rounded-md"

    return (
        <input {...props} className={clsx(className, baseStyle)} />
    )
}