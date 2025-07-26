import React, { useState } from "react";

export const AddTodo = ({ addTodo, loading = false }) => {
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
        <div className="todo-container">
            <div className="todo-form">
                <h3>Add New Task</h3>
                <form onSubmit={submit}>
                    <div className="form-group">
                        <label htmlFor="title">Task Title</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={handleChange}
                            className="form-control"
                            id="title"
                            required
                            autoFocus
                            placeholder="What needs to be done?"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc">Description</label>
                        <input
                            type="text"
                            value={form.desc}
                            onChange={handleChange}
                            className="form-control"
                            id="desc"
                            required
                            placeholder="Add some details..."
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Adding Task...
                            </>
                        ) : (
                            'Add Task'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTodo;