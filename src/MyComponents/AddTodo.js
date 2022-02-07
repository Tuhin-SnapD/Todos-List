import React, { useState } from "react"

export const AddTodo = ({ addTodo }) => {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const submit = (e) => {
        e.preventDefault();
        if (!title || !desc) {
            alert("Title or Description cannot be blank")
        }
        else {
            addTodo(title, desc);
            setTitle("");
            setDesc("");
        }
    }

    return (
        <div className="container my-3">
            <h3>Add your Work with Description</h3>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">What is the Work</label>
                    <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }}
                        className="form-control" id="title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description of your Work</label>
                    <input type="text" value={desc} onChange={(e) => { setDesc(e.target.value) }} className="form-control" id="desc" />
                </div>
                <button type="submit" className="btn btn-sm btn-success">Submit</button>
                <hr/>
            </form>
        </div>
    )
}

export default AddTodo;