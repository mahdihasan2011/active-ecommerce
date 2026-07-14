'use client';

import React, { useState } from 'react';
import { Shield, User, Key, Save, ChevronLeft, Plus } from 'lucide-react';
import Link from 'next/link';

export default function StaffManagement() {
  const [staffList, setStaffList] = useState([
    { id: '1', name: 'Robert Vance', email: 'robert@bumppa.com', role: 'Support Specialist', permissions: ['MANAGE_PRODUCTS', 'MANAGE_VENDORS'] },
    { id: '2', name: 'Angela Martin', email: 'angela@bumppa.com', role: 'Financial Auditor', permissions: ['MANAGE_FINANCE'] },
  ]);

  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [editPermissions, setEditPermissions] = useState<string[]>([]);

  const availablePermissions = [
    { key: 'MANAGE_STAFF', label: 'Manage Admin Staff & Roles' },
    { key: 'MANAGE_SETTINGS', label: 'Configure Global Settings & Integrations' },
    { key: 'MANAGE_VENDORS', label: 'Audit Vendor compliance & KYC documents' },
    { key: 'MANAGE_PRODUCTS', label: 'Moderate full catalog items' },
    { key: 'MANAGE_FINANCE', label: 'Reconcile ledger accounts & clear payouts' },
  ];

  const handleSelectStaff = (member: any) => {
    setSelectedStaff(member);
    setEditPermissions(member.permissions);
  };

  const handleTogglePermission = (key: string) => {
    setEditPermissions((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  const handleSavePermissions = () => {
    if (!selectedStaff) return;
    setStaffList((prev) =>
      prev.map((s) => (s.id === selectedStaff.id ? { ...s, permissions: editPermissions } : s))
    );
    setSelectedStaff(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans py-12 px-6 relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-cyan-900/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl space-y-8">
        
        {/* Header navigation */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-slate-400 hover:text-white flex items-center text-xs space-x-1.5 transition-colors">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-xs font-semibold shadow-lg shadow-cyan-500/15 flex items-center space-x-1 transition-all">
            <Plus className="h-4 w-4" />
            <span>Add New Staff</span>
          </button>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Staff Permissions Control
          </h1>
          <p className="text-sm text-slate-400 font-light mt-1">
            Audit admin team roles and adjust permission access bounds dynamically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Staff Roster List */}
          <div className="md:col-span-2 space-y-4">
            <div className="rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-md overflow-hidden">
              <div className="p-4 border-b border-slate-900 bg-slate-950/40 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Staff Directory
              </div>
              <div className="divide-y divide-slate-900">
                {staffList.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => handleSelectStaff(member)}
                    className="p-5 flex justify-between items-center hover:bg-slate-900/40 cursor-pointer transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-white">{member.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {member.role}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-light">{member.email}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-500 font-mono">
                        {member.permissions.length} Scopes Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Permissions edit panel */}
          <div>
            {selectedStaff ? (
              <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 backdrop-blur-md space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wide">
                    Configure Access
                  </span>
                  <h3 className="text-lg font-bold text-white">{selectedStaff.name}</h3>
                  <p className="text-xs text-slate-500">{selectedStaff.email}</p>
                </div>

                <div className="space-y-4">
                  {availablePermissions.map((perm) => {
                    const isChecked = editPermissions.includes(perm.key);
                    return (
                      <div
                        key={perm.key}
                        onClick={() => handleTogglePermission(perm.key)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isChecked
                            ? 'border-cyan-500/50 bg-cyan-500/10 text-white'
                            : 'border-slate-850 bg-slate-950/20 text-slate-400 hover:border-slate-800'
                        }`}
                      >
                        <span className="text-xs font-semibold leading-relaxed pr-2">
                          {perm.label}
                        </span>
                        <div className={`h-4 w-4 rounded flex items-center justify-center border transition-all ${
                          isChecked ? 'bg-cyan-500 border-cyan-500' : 'border-slate-700'
                        }`}>
                          {isChecked && <div className="h-1.5 w-1.5 rounded-full bg-slate-950" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={handleSavePermissions}
                  className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 shadow-lg shadow-cyan-500/15 transition-all"
                >
                  <Save className="h-4 w-4" />
                  <span>Update Permissions</span>
                </button>
              </div>
            ) : (
              <div className="p-8 text-center border border-slate-900 border-dashed rounded-2xl bg-slate-900/5 flex flex-col items-center justify-center min-h-[300px]">
                <Shield className="h-8 w-8 text-slate-700 mb-3" />
                <p className="text-xs text-slate-500 font-light">
                  Select a staff member from the roster directory list to assign active scopes.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
