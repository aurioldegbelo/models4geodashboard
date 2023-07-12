import { ReactComponentElement, ReactElement } from "react"

interface Props {
    className?: string
    children: ReactElement[] | ReactElement
}
 
export default function Card(props: Props) {
    return <div className={`${props.className} bg-white rounded-lg p-5`}>
        {props.children}
    </div>
}