import { ReactChildren, ReactChild, MouseEventHandler } from 'react';

export type props = {
    type?: "button"|"submit"|"reset"|undefined,
    color?: string|undefined,
    radius?: string|number|undefined,
    onClick?: MouseEventHandler<HTMLButtonElement>|undefined,
    children: ReactChild
        | ReactChildren
        | ReactChild[]
        | ReactChildren[]
}

function Button(
    {
        color = 'primary',
        radius = '0.3rem',
        type = "button",
        children,
        onClick,
    }: props,
    device: string
) {
    return (
        <button
            type={type}
            className={`w-100 btn btn-${device} btn-${color}`}
            style={{borderRadius: radius}}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export function XlButton(props: props) {
    return Button(props, 'xl');
}

export function LgButton(props: props) {
    return Button(props, 'lg');
}

export function MdButton(props: props) {
    return Button(props, 'md');
}

export function SmButton(props: props) {
    return Button(props, 'sm');
}