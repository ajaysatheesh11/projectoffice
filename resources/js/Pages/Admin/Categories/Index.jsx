import SEO from '@/Components/SEO';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminModal from '@/Components/AdminModal';
import AGTable from '@/Components/AGTable';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

function AdminInput({ label, name, value, onChange, error, placeholder, className = '' }) {
    return (
        <label className={`block ${className}`}>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/40">{label}</span>
            <input
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white/90 outline-none transition placeholder:text-white/20 focus:border-lime-400/30 focus:bg-white/[0.06] focus:ring-1 focus:ring-lime-400/20"
                name={name}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
            />
            {error && <span className="mt-1.5 block text-xs text-red-400">{error}</span>}
        </label>
    );
}

export default function Index({ categories }) {
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    
    const { delete: destroy } = useForm();
    const form = useForm({
        name: '',
    });

    const openCreateModal = () => {
        setEditingCategory(null);
        form.setData('name', '');
        form.clearErrors();
        setShowModal(true);
    };

    const openEditModal = (category) => {
        setEditingCategory(category);
        form.setData('name', category.name);
        form.clearErrors();
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        form.reset();
        form.clearErrors();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingCategory) {
            form.put(route('admin.categories.update', editingCategory.id), {
                onSuccess: closeModal,
            });
        } else {
            form.post(route('admin.categories.store'), {
                onSuccess: closeModal,
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this category?')) {
            destroy(route('admin.categories.destroy', id));
        }
    };

    const columns = [
        { 
            label: 'Name', 
            key: 'name',
            className: 'font-medium text-white/90'
        },
        { 
            label: 'Actions', 
            align: 'right',
            render: (category) => (
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => openEditModal(category)}
                        className="text-white/40 hover:text-lime-400 transition"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(category.id)}
                        className="text-white/40 hover:text-red-400 transition"
                    >
                        Delete
                    </button>
                </div>
            )
        }
    ];

    return (
        <AdminLayout title="Categories">
            <SEO title="Categories — Admin" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-white/90">Categories</h2>
                        <p className="mt-1 text-sm text-white/35">Manage project categories.</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="rounded-xl bg-gradient-to-r from-lime-400 to-emerald-400 px-5 py-2.5 text-sm font-bold text-[#0a0f0a] shadow-[0_0_20px_rgba(163,230,53,0.15)] transition hover:shadow-[0_0_30px_rgba(163,230,53,0.25)]"
                    >
                        Add Category
                    </button>
                </div>

                <AGTable 
                    columns={columns} 
                    data={categories} 
                    emptyMessage="No categories found." 
                />
            </div>

            {/* Category Modal (Create/Edit) */}
            <AdminModal
                show={showModal}
                onClose={closeModal}
                title={editingCategory ? 'Edit Category' : 'Create New Category'}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <AdminInput
                        label="Category Name"
                        name="name"
                        value={form.data.name}
                        onChange={(e) => form.setData('name', e.target.value)}
                        error={form.errors.name}
                        placeholder="e.g. Web Development"
                    />

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white/40 transition hover:bg-white/5 hover:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="rounded-xl bg-gradient-to-r from-lime-400 to-emerald-400 px-6 py-2.5 text-sm font-bold text-[#0a0f0a] shadow-[0_0_20px_rgba(163,230,53,0.15)] transition hover:shadow-[0_0_30px_rgba(163,230,53,0.25)] disabled:opacity-50"
                        >
                            {form.processing ? (editingCategory ? 'Updating...' : 'Creating...') : (editingCategory ? 'Update Category' : 'Create Category')}
                        </button>
                    </div>
                </form>
            </AdminModal>
        </AdminLayout>
    );
}
