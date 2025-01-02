import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const CourseOutline = ({ setCourseOutLine }) => {
    const [items, setItems] = useState([
        { id: 1, placeholder: 'Outline 1', value: '' },
        { id: 2, placeholder: 'Outline 2', value: '' },
    ]);

    const handleAddNew = () => {
        const newCatId = items.length + 1;
        const newCat = { id: newCatId, placeholder: `Outline ${newCatId}`, value: '' };
        setItems([...items, newCat]);
    };

    const handleDelete = (id) => {
        const remainingItems = items.filter(item => item.id !== id);
        setItems(remainingItems);
    };

    const handleChange = (id, newValue) => {
        const updatedItems = items.map(item =>
            item.id === id ? { ...item, value: newValue } : item
        );
        setItems(updatedItems);
    };

    useEffect(() => {
        setCourseOutLine(items);
    }, [items, setCourseOutLine]);

    return (
        <div>
            <div className="mb-5 space-y-3">
                <label>
                    <div className="flex space-x-1 categories-center text-2xl">
                        <h1 className="dark:text-slate-200">Course Outline</h1>
                    </div>
                </label>

                {/* Dynamic input */}
                <div>
                    {items.map(item => (
                        <div key={item.id} className="flex space-x-1 items-center relative">
                            <input
                                type="text"
                                name={`outline-${item.id}`}
                                id={`outline-${item.id}`}
                                placeholder={item.placeholder}
                                value={item.value}
                                onChange={(e) => handleChange(item.id, e.target.value)}
                                className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300 bg-slate-200"
                            />
                            <button className="absolute right-1">
                                <FaTimes
                                    onClick={() => handleDelete(item.id)}
                                    className="text-2xl"
                                />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Static input field */}
                <div className="flex space-x-1 w-full categories-center">
                    <input
                        onClick={handleAddNew}
                        type="text"
                        name="name"
                        id="name"
                        placeholder={`Outline ${items.length + 1} (Optional)`}
                        className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300 bg-slate-200"
                    />
                    <FaTimes className="text-2xl hidden" />
                </div>
            </div>
        </div>
    );
};

export default CourseOutline;
