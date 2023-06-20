import { useState } from "react";

export function Single() {

    const [file, setFile] = useState()


    const submit = async event => {
        event.preventDefault()

        const formData = new FormData();
        formData.append("image", file)
        }
        const fileSelected = event => {
            const file = event.target.files[0]
            setFile(file)
        }
    return (
        <div className="flex flex-col items-center justify-center">
        
        <form onSubmit={submit}>
        <input onChange={fileSelected} type="file"></input>
        <button type="submit">Submit</button>
        </form>
        
        </div>
    )
}