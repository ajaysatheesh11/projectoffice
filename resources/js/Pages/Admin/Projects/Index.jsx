import SEO from '@/Components/SEO';
import AdminLayout from '@/Layouts/AdminLayout';
import AGTable from '@/Components/AGTable';
import { Link, useForm } from '@inertiajs/react';

export default function Index({ projects }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this project?')) {
            destroy(route('admin.projects.destroy', id));
        }
    };

    const columns = [
        {
            label: 'Project',
            render: (project) => (
                <div className="flex items-center gap-4">
                    {project.image ? (
                        <img src={`/storage/${project.image}`} alt="" className="h-10 w-10 rounded-lg object-cover border border-white/10" />
                    ) : (
                        <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-white/20">NO IMG</div>
                    )}
                    <div>
                        <div className="font-medium text-white/90">{project.title}</div>
                        {project.link && <div className="text-[10px] text-lime-400/60 truncate max-w-[200px]">{project.link}</div>}
                    </div>
                </div>
            )
        },
        {
            label: 'Category',
            render: (project) => (
                <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium text-white/40">
                    {project.category?.name}
                </span>
            )
        },
        {
            label: 'Actions',
            align: 'right',
            render: (project) => (
                <div className="flex justify-end gap-3">
                    <Link
                        href={route('admin.projects.edit', project.id)}
                        className="text-white/40 hover:text-lime-400 transition"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => handleDelete(project.id)}
                        className="text-white/40 hover:text-red-400 transition"
                    >
                        Delete
                    </button>
                </div>
            )
        }
    ];

    return (
        <AdminLayout title="Projects">
            <SEO title="Projects — Admin" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-white/90">Projects</h2>
                        <p className="mt-1 text-sm text-white/35">Manage your works and portfolio.</p>
                    </div>
                    <Link
                        href={route('admin.projects.create')}
                        className="rounded-xl bg-gradient-to-r from-lime-400 to-emerald-400 px-5 py-2.5 text-sm font-bold text-[#0a0f0a] shadow-[0_0_20px_rgba(163,230,53,0.15)] transition hover:shadow-[0_0_30px_rgba(163,230,53,0.25)]"
                    >
                        Add Project
                    </Link>
                </div>

                <AGTable 
                    columns={columns} 
                    data={projects} 
                    emptyMessage="No projects found." 
                />
            </div>
        </AdminLayout>
    );
}
