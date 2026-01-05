"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Send,
  User,
  MapPin,
  Monitor,
  AlertTriangle,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function ReportForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ======================
     DROPDOWN DATA
     ====================== */
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);

  /* ======================
     FORM DATA
     ====================== */
  const [formData, setFormData] = useState({
    name: "",
    building_id: "",
    floor_id: "",
    room_id: "",
    equipment: "Projektor",
    description: "",
  });

  /* ======================
     FETCH BUILDINGS
     ====================== */
  useEffect(() => {
    const fetchBuildings = async () => {
      const { data } = await supabase
        .from("buildings")
        .select("*")
        .order("name");

      setBuildings(data || []);
    };
    fetchBuildings();
  }, []);

  /* ======================
     FETCH FLOORS
     ====================== */
  useEffect(() => {
    if (!formData.building_id) return;

    const fetchFloors = async () => {
      const { data } = await supabase
        .from("floors")
        .select("*")
        .eq("building_id", formData.building_id)
        .order("floor_name");

      setFloors(data || []);
      setRooms([]);
      setFormData((prev) => ({ ...prev, floor_id: "", room_id: "" }));
    };
    fetchFloors();
  }, [formData.building_id]);

  /* ======================
     FETCH ROOMS
     ====================== */
  useEffect(() => {
    if (!formData.floor_id) return;

    const fetchRooms = async () => {
      const { data } = await supabase
        .from("rooms")
        .select("*")
        .eq("floor_id", formData.floor_id)
        .order("room_name");

      setRooms(data || []);
      setFormData((prev) => ({ ...prev, room_id: "" }));
    };
    fetchRooms();
  }, [formData.floor_id]);

  /* ======================
     HANDLE CHANGE
     ====================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ======================
     HANDLE SUBMIT
     ====================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("reports").insert([
      {
        name: formData.name,
        building_id: formData.building_id,
        floor_id: formData.floor_id,
        room_id: formData.room_id,
        equipment: formData.equipment,
        description: formData.description,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Gagal hantar laporan, sila cuba lagi.");
      console.error(error);
    } else {
      setSubmitted(true);
    }
  };

  /* ======================
     SUCCESS PAGE
     ====================== */
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Laporan Dihantar!
          </h2>
          <p className="text-gray-600 mb-8">
            Terima kasih. Pasukan teknikal kami akan menyemak aduan anda.
          </p>
          <Link
            href="/"
            className="inline-block bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-800 transition shadow-lg"
          >
            Kembali ke Laman Utama
          </Link>
        </div>
      </div>
    );
  }

  /* ======================
     FORM UI (STYLE SAME)
     ====================== */
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <nav className="w-full border-b border-gray-200 py-4 bg-white shadow-sm mb-8">
        <div className="flex items-center justify-between mx-auto px-4 max-w-4xl">
          <Link href="/" className="flex items-center text-indigo-700 font-bold">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali
          </Link>
          <span className="text-xl font-extrabold text-gray-800 tracking-wider">
            BORANG ADUAN AV
          </span>
          <div className="w-10"></div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-indigo-700 p-8 text-white">
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
              Laporkan Masalah Teknikal
            </h1>
            <p className="text-indigo-100 mt-2">
              Sila isi butiran di bawah untuk bantuan segera.
            </p>
          </div>

          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {/* Nama Pemohon */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 items-center gap-2">
                <User className="w-4 h-4" /> Nama Pemohon
              </label>
            <input
              name="name"
              required
              placeholder="Nama Pemohon"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-black"
            />
            </div>

          {/* Bangunan */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 items-center gap-2">
                <MapPin className="w-4 h-4" /> Bangunan
              </label>
            <select
              name="building_id"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-black"
            >
              <option value="">Pilih Bangunan</option>
              {buildings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
            </div>

          {/* Aras */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 items-center gap-2">
                <MapPin className="w-4 h-4" /> Aras
              </label>
            <select
              name="floor_id"
              required
              disabled={!floors.length}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-black"
            >
              <option value="">Pilih Aras</option>
              {floors.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.floor_name}
                </option>
              ))}
            </select>
            </div>

          {/* Bilik */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 items-center gap-2">
                <MapPin className="w-4 h-4" /> Bilik
              </label>
            <select
              name="room_id"
              required
              disabled={!rooms.length}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-black"
            >
              <option value="">Pilih Bilik</option>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.room_name}
                </option>
              ))}
            </select>
            </div>

          {/* Jenis Peralatan */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 items-center gap-2">
                <Monitor className="w-4 h-4" /> Jenis Peralatan
              </label>
            <select
              name="equipment"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-black"
            >
              <option>Projektor</option>
              <option>Sistem Bunyi (Speaker/Mic)</option>
              <option>Kabel HDMI / Adaptor</option>
              <option>Lain-lain</option>
            </select>
            </div>

          {/* Perincian Masalah */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 items-center gap-2">
                <FileText className="w-4 h-4" /> Perincian Masalah
              </label>
            <textarea
              name="description"
              required
              rows="4"
              placeholder="Perincian Masalah"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-black"
            />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all 
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-700 hover:bg-indigo-800 active:scale-95"
                }`}
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Hantar Laporan
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
