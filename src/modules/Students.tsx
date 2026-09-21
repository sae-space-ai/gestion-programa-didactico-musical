// =====================================================
// MÓDULO ALUMNADO - Gestión CRUD de estudiantes
// Importación CSV, filtros y ficha individual
// =====================================================

import { useState } from 'react';
import { AppState, Student } from '../types';
import { Plus, Search, Download, Upload, Edit2, Trash2, Eye, X } from 'lucide-react';
import { generateId, exportCSV, parseCSVStudents, getTodayString } from '../utils/helpers';

interface Props {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  showToast: (msg: string, type?: string) => void;
}

export default function Students({ state, updateState, showToast }: Props) {
  const [search, setSearch] = useState('');
  const [filterCourse, setFilterCourse] = useState<number>(0);
  const [filterInstrument, setFilterInstrument] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [form, setForm] = useState<Partial<Student>>({ active: true, course: 1 });

  const instruments = [...new Set(state.students.map(s => s.instrument))].sort();

  const filteredStudents = state.students.filter(s => {
    const matchSearch = !search || `${s.firstName} ${s.lastName} ${s.instrument}`.toLowerCase().includes(search.toLowerCase());
    const matchCourse = !filterCourse || s.course === filterCourse;
    const matchInstrument = !filterInstrument || s.instrument === filterInstrument;
    return matchSearch && matchCourse && matchInstrument;
  });

  const openNewForm = () => {
    setEditingStudent(null);
    setForm({ firstName: '', lastName: '', instrument: '', course: 1, email: '', phone: '', observations: '', active: true, ensembles: [] });
    setShowForm(true);
  };

  const openEditForm = (student: Student) => {
    setEditingStudent(student);
    setForm({ ...student });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.firstName || !form.lastName) {
      showToast('Nombre y apellidos son obligatorios', 'error');
      return;
    }
    if (editingStudent) {
      const updated = state.students.map(s => s.id === editingStudent.id ? { ...s, ...form } as Student : s);
      updateState({ students: updated });
      showToast('Alumno actualizado correctamente');
    } else {
      const newStudent: Student = {
        id: generateId(),
        firstName: form.firstName || '',
        lastName: form.lastName || '',
        instrument: form.instrument || '',
        course: form.course || 1,
        ensembles: form.ensembles || [],
        email: form.email || '',
        phone: form.phone || '',
        observations: form.observations || '',
        registrationDate: getTodayString(),
        active: form.active ?? true,
      };
      updateState({ students: [...state.students, newStudent] });
      showToast('Alumno registrado correctamente');
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Eliminar este alumno?')) {
      updateState({ students: state.students.filter(s => s.id !== id) });
      showToast('Alumno eliminado');
    }
  };

  const handleCSVImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const csv = ev.target?.result as string;
      const parsed = parseCSVStudents(csv);
      const newStudents: Student[] = parsed.map(p => ({
        id: generateId(),
        ...p,
        ensembles: [],
        email: '',
        phone: '',
        observations: '',
        registrationDate: getTodayString(),
        active: true,
      }));
      updateState({ students: [...state.students, ...newStudents] });
      showToast(`${newStudents.length} alumnos importados`);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExportCSV = () => {
    const data = state.students.map(s => ({
      Nombre: s.firstName,
      Apellidos: s.lastName,
      Instrumento: s.instrument,
      Curso: s.course,
      Email: s.email,
      Teléfono: s.phone,
      Activo: s.active ? 'Sí' : 'No',
    }));
    exportCSV(data, 'alumnado');
    showToast('CSV exportado');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--primary)]">Gestión de Alumnado</h1>
          <p className="text-sm text-[var(--text-light)]">{state.students.length} alumnos registrados · {state.students.filter(s => s.active).length} activos</p>
        </div>
        <div className="flex gap-2">
          <button onClick={openNewForm} className="btn btn-primary"><Plus size={16} /> Nuevo alumno</button>
          <label className="btn btn-outline cursor-pointer">
            <Upload size={16} /> Importar CSV
            <input type="file" accept=".csv" onChange={handleCSVImport} className="hidden" />
          </label>
          <button onClick={handleExportCSV} className="btn btn-outline"><Download size={16} /> CSV</button>
        </div>
      </div>

      {/* Filtros */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text" placeholder="Buscar alumno..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--primary)] bg-[var(--bg)]"
            />
          </div>
          <select value={filterCourse} onChange={(e) => setFilterCourse(Number(e.target.value))} className="form-select w-auto">
            <option value={0}>Todos los cursos</option>
            {[1,2,3,4,5,6].map(c => <option key={c} value={c}>{c}º curso</option>)}
          </select>
          <select value={filterInstrument} onChange={(e) => setFilterInstrument(e.target.value)} className="form-select w-auto">
            <option value="">Todos los instrumentos</option>
            {instruments.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
      </div>

      {/* Tabla de alumnos */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Instrumento</th>
              <th>Curso</th>
              <th>Agrupaciones</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id}>
                <td className="font-medium">{student.lastName}, {student.firstName}</td>
                <td>{student.instrument}</td>
                <td>{student.course}º</td>
                <td>
                  {student.ensembles.map(eId => {
                    const ens = state.ensembles.find(e => e.id === eId);
                    return ens ? <span key={eId} className="badge badge-info mr-1">{ens.name}</span> : null;
                  })}
                </td>
                <td>
                  <span className={`badge ${student.active ? 'badge-success' : 'badge-danger'}`}>
                    {student.active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <div className="flex gap-1">
                    <button onClick={() => setViewingStudent(student)} className="p-1.5 rounded hover:bg-gray-100" title="Ver ficha"><Eye size={16} /></button>
                    <button onClick={() => openEditForm(student)} className="p-1.5 rounded hover:bg-gray-100" title="Editar"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(student.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500" title="Eliminar"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr><td colSpan={6} className="text-center py-8 text-[var(--text-muted)]">No se encontraron alumnos</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de formulario */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[var(--primary)]">
                {editingStudent ? 'Editar alumno' : 'Nuevo alumno'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded"><X size={20} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Nombre *</label>
                <input className="form-input" value={form.firstName || ''} onChange={(e) => setForm({...form, firstName: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Apellidos *</label>
                <input className="form-input" value={form.lastName || ''} onChange={(e) => setForm({...form, lastName: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Instrumento</label>
                <input className="form-input" value={form.instrument || ''} onChange={(e) => setForm({...form, instrument: e.target.value})} list="instruments-list" />
                <datalist id="instruments-list">
                  {['Violín','Viola','Violoncello','Contrabajo','Flauta','Oboe','Clarinete','Fagot','Trompa','Trompeta','Trombón','Tuba','Percusión','Piano','Guitarra','Arpa','Canto'].map(i => <option key={i} value={i} />)}
                </datalist>
              </div>
              <div className="form-group">
                <label className="form-label">Curso</label>
                <select className="form-select" value={form.course || 1} onChange={(e) => setForm({...form, course: Number(e.target.value)})}>
                  {[1,2,3,4,5,6].map(c => <option key={c} value={c}>{c}º</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" value={form.email || ''} onChange={(e) => setForm({...form, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Teléfono</label>
                <input className="form-input" value={form.phone || ''} onChange={(e) => setForm({...form, phone: e.target.value})} />
              </div>
              <div className="form-group md:col-span-2">
                <label className="form-label">Observaciones</label>
                <textarea className="form-textarea" value={form.observations || ''} onChange={(e) => setForm({...form, observations: e.target.value})} />
              </div>
              <div className="form-group flex items-center gap-2">
                <input type="checkbox" checked={form.active ?? true} onChange={(e) => setForm({...form, active: e.target.checked})} />
                <label className="form-label mb-0">Activo</label>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowForm(false)} className="btn btn-outline">Cancelar</button>
              <button onClick={handleSave} className="btn btn-primary">Guardar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de ficha individual */}
      {viewingStudent && (
        <div className="modal-overlay" onClick={() => setViewingStudent(null)}>
          <div className="modal-content p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[var(--primary)]">Ficha del Alumno</h2>
              <button onClick={() => setViewingStudent(null)} className="p-1 hover:bg-gray-100 rounded"><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-[var(--bg-alt)]">
                <h3 className="font-bold text-lg">{viewingStudent.firstName} {viewingStudent.lastName}</h3>
                <p className="text-sm text-[var(--text-light)]">{viewingStudent.instrument} · {viewingStudent.course}º curso</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-[var(--text-muted)]">Email:</span> <span>{viewingStudent.email || '-'}</span></div>
                <div><span className="text-[var(--text-muted)]">Teléfono:</span> <span>{viewingStudent.phone || '-'}</span></div>
                <div><span className="text-[var(--text-muted)]">Alta:</span> <span>{viewingStudent.registrationDate}</span></div>
                <div><span className="text-[var(--text-muted)]">Estado:</span> <span className={viewingStudent.active ? 'text-green-600' : 'text-red-600'}>{viewingStudent.active ? 'Activo' : 'Inactivo'}</span></div>
              </div>
              <div>
                <span className="text-sm text-[var(--text-muted)]">Agrupaciones:</span>
                <div className="flex gap-1 mt-1">
                  {viewingStudent.ensembles.map(eId => {
                    const ens = state.ensembles.find(e => e.id === eId);
                    return ens ? <span key={eId} className="badge badge-info">{ens.name}</span> : null;
                  })}
                  {viewingStudent.ensembles.length === 0 && <span className="text-sm text-[var(--text-muted)]">Sin agrupaciones</span>}
                </div>
              </div>
              {viewingStudent.observations && (
                <div>
                  <span className="text-sm text-[var(--text-muted)]">Observaciones:</span>
                  <p className="text-sm mt-1">{viewingStudent.observations}</p>
                </div>
              )}
              {/* Historial de evaluaciones */}
              <div>
                <span className="text-sm text-[var(--text-muted)]">Evaluaciones registradas:</span>
                <p className="text-sm mt-1">
                  {state.assessments.filter(a => a.studentId === viewingStudent.id).length} evaluaciones por criterios ·{' '}
                  {state.tribunals.filter(t => t.studentId === viewingStudent.id).length} evaluaciones de tribunal
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
