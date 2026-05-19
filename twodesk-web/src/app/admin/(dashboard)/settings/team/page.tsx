'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { adminFetch } from '@/lib/admin-fetch';

interface Member {
  id: string;
  email: string;
  name: string | null;
  nickname: string | null;
  role: string;
}

interface FormState {
  email: string;
  password: string;
  name: string;
  nickname: string;
  role: string;
}

const emptyForm: FormState = {
  email: '',
  password: '',
  name: '',
  nickname: '',
  role: 'admin',
};

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Member | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch('/api/admin/users');
      const json = await res.json();
      if (res.ok) setMembers(json.users ?? []);
      else toast.error(json.error ?? 'โหลดรายชื่อไม่สำเร็จ');
    } catch {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setDialogOpen(true);
  }

  function openEdit(m: Member) {
    setEditing(m);
    setForm({
      email: m.email,
      password: '',
      name: m.name ?? '',
      nickname: m.nickname ?? '',
      role: m.role,
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!editing && (!form.email.trim() || !form.password.trim())) {
      toast.error('กรอก email และ password');
      return;
    }
    setSaving(true);
    try {
      const res = editing
        ? await adminFetch(`/api/admin/users/${editing.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: form.name,
              nickname: form.nickname,
              role: form.role,
              ...(form.password ? { password: form.password } : {}),
            }),
          })
        : await adminFetch('/api/admin/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
          });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success(editing ? 'บันทึกสำเร็จ' : 'เพิ่มสมาชิกสำเร็จ');
        setDialogOpen(false);
        load();
      } else {
        toast.error(json.error ?? 'บันทึกไม่สำเร็จ');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      const res = await adminFetch(`/api/admin/users/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success('ลบสมาชิกแล้ว');
        setDeleteTarget(null);
        load();
      } else {
        toast.error(json.error ?? 'ลบไม่สำเร็จ');
      }
    } catch {
      toast.error('Network error');
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Team Management</h1>
          <p className="text-[13px] text-[#999]">Manage admin users and roles</p>
        </div>
        <Button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#1A1A1A] text-white hover:bg-black"
        >
          <Plus className="size-4" />
          Add Member
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-lg bg-[#F0EFED]"
            />
          ))}
        </div>
      ) : members.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[#E5E4E2] bg-white py-20 text-center text-[13px] text-[#999]">
          ยังไม่มีสมาชิก — เพิ่มคนแรกได้เลย
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m) => (
            <div
              key={m.id}
              className="flex flex-col items-center gap-3 rounded-lg border border-[#E5E4E2] bg-white p-6 text-center"
            >
              <div className="flex size-16 items-center justify-center rounded-full bg-[#F0EFED]">
                <span className="text-[15px] font-semibold text-[#6B6B6B]">
                  {(m.nickname || m.name || m.email)
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-[15px] font-semibold text-[#1A1A1A]">
                  {m.name || '—'}
                </p>
                <p className="text-[13px] text-[#6B6B6B]">
                  {m.nickname ? `(${m.nickname})` : m.email}
                </p>
                <span className="mt-1 inline-block rounded-full bg-[#F0EFED] px-3 py-0.5 text-[11px] font-medium text-[#6B6B6B]">
                  {m.role}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(m)}
                  className="flex size-7 items-center justify-center rounded-md border border-[#E5E4E2] text-[#6B6B6B] hover:bg-[#F0EFED]"
                  title="Edit"
                >
                  <Pencil className="size-3.5" />
                </button>
                <button
                  onClick={() => setDeleteTarget(m)}
                  className="flex size-7 items-center justify-center rounded-md border border-[#E5E4E2] text-[#6B6B6B] hover:bg-[#C0392B] hover:text-white"
                  title="Delete"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md border-[#E5E4E2] bg-white">
          <DialogHeader>
            <DialogTitle className="text-[#1A1A1A]">
              {editing ? 'แก้ไขสมาชิก' : 'เพิ่มสมาชิก'}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-2">
            <div className="flex flex-col gap-1.5">
              <Label className="text-[13px]">Email</Label>
              <Input
                type="email"
                value={form.email}
                disabled={!!editing}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="user@twodesk.studio"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-[13px]">
                {editing ? 'รหัสผ่านใหม่ (เว้นว่าง = ไม่เปลี่ยน)' : 'Password'}
              </Label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                placeholder="••••••••"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-[13px]">ชื่อ</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="ชื่อ-นามสกุล"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-[13px]">ชื่อเล่น</Label>
              <Input
                value={form.nickname}
                onChange={(e) =>
                  setForm((f) => ({ ...f, nickname: e.target.value }))
                }
                placeholder="Nut"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-[13px]">Role</Label>
              <Select
                value={form.role}
                onValueChange={(v) =>
                  v && setForm((f) => ({ ...f, role: v }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">admin</SelectItem>
                  <SelectItem value="super_admin">super_admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-[#E5E4E2] text-[#1A1A1A]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#1A1A1A] text-white hover:bg-black"
            >
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent className="border-[#E5E4E2] bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#1A1A1A]">
              ลบสมาชิก
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#6B6B6B]">
              ลบ{' '}
              <span className="font-medium text-[#1A1A1A]">
                {deleteTarget?.email}
              </span>{' '}
              ออกจากระบบ? ย้อนกลับไม่ได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#E5E4E2] text-[#1A1A1A]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-[#C0392B] text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
