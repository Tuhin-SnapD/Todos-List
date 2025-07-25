import React, { useState } from "react";

export const AddTodo = ({ addTodo }) => {
    const [form, setForm] = useState({ title: "", desc: "" });

    const handleChange = e => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const submit = e => {
        e.preventDefault();
        if (!form.title.trim() || !form.desc.trim()) {
            alert("Title or Description cannot be blank");
            return;
        }
        addTodo(form.title, form.desc);
        setForm({ title: "", desc: "" });
    };

    return (
        <div className="container my-3">
            <h3>Add your Work with Description</h3>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">What is the Work</label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={handleChange}
                        className="form-control"
                        id="title"
                        required
                        autoFocus
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description of your Work</label>
                    <input
                        type="text"
                        value={form.desc}
                        onChange={handleChange}
                        className="form-control"
                        id="desc"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-sm btn-success">Submit</button>
                <hr />
            </form>
        </div>
    );
};

export default AddTodo;