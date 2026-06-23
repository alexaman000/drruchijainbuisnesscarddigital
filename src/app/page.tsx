"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
 Phone,
 MessageCircle,
 Mail,
 MapPin,
 Clock,
 Share2,
 Download,
 Calendar,
 X,
 Stethoscope,
 ShieldCheck,
 HeartPulse,
 User,
 ChevronRight,
 ChevronDown,
 QrCode
} from "lucide-react";

const doctorInfo = {
 name: "Dr. Ruchi Jain",
 title: "Consultant Dentist",
 clinic: "Radiaance Dentistry",
 phone: "8696781255",
 phoneDisplay: "+91 86967 81255",
 email: "drruchijain30@gmail.com",
 address: "Shop no 518, 5th floor, Western Business Park, Vesu, Surat 395007",
 timings: "10:00 AM to 7:00 PM",
 instagram: "https://instagram.com/Radiaance_dentistry",
 whatsapp: "https://wa.me/918696781255?text=Hello%20Dr.%20Ruchi,%20I%20would%20like%20to%20book%20an%20appointment.",
 mapUrl: "https://maps.google.com/?q=Shop+no+518,+5th+floor,+Western+Business+Park,+Vesu,+Surat+395007",
};

const services = [
 "Root Canal",
 "Dental Implants",
 "Braces",
 "Teeth Whitening",
 "Smile Design",
 "Pediatric Dentistry",
 "Tooth Extraction",
];

// VCF Generator Helper
const generateVCard = () => {
 const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${doctorInfo.name}
ORG:${doctorInfo.clinic}
TITLE:${doctorInfo.title}
TEL;TYPE=WORK,VOICE:+91${doctorInfo.phone}
EMAIL;TYPE=PREF,INTERNET:${doctorInfo.email}
ADR;TYPE=WORK:;;${doctorInfo.address}
URL:${window.location.origin}
END:VCARD`;

 const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
 const url = URL.createObjectURL(blob);
 const link = document.createElement("a");
 link.href = url;
 link.setAttribute("download", `${doctorInfo.name.replace(/ /g, "_")}.vcf`);
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
};

export default function DigitalCard() {
 const [isQRModalOpen, setIsQRModalOpen] = useState(false);
 const [isSpecializationsOpen, setIsSpecializationsOpen] = useState(false);
 const [currentUrl, setCurrentUrl] = useState("");

 useEffect(() => {
 setCurrentUrl(window.location.href);
 }, []);

 const handleShare = async () => {
 if (navigator.share) {
 try {
 await navigator.share({
 title: doctorInfo.name,
 text: `Check out ${doctorInfo.name}'s digital visiting card!`,
 url: currentUrl,
 });
 } catch (err) {
 console.error("Error sharing:", err);
 }
 } else {
 // Fallback: Copy to clipboard
 navigator.clipboard.writeText(currentUrl);
 alert("Link copied to clipboard!");
 }
 };

 return (
 <main className="relative min-h-screen pb-24 max-w-md mx-auto bg-slate-50 shadow-2xl overflow-hidden">
 {/* Background Decorative Elements */}
 <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-teal-600 to-teal-800 rounded-b-[40px] z-0 shadow-lg"></div>
 
 <div className="relative z-10 px-5 pt-10">
 
 {/* Top Bar Actions */}
 <motion.div 
 initial={{ opacity: 0, y: -20 }}
 animate={{ opacity: 1, y: 0 }}
 className="flex justify-between items-center mb-6 text-white"
 >
 <button onClick={() => setIsQRModalOpen(true)} className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition">
 <QrCode size={20} />
 </button>
 <button onClick={handleShare} className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition">
 <Share2 size={20} />
 </button>
 </motion.div>

 {/* Profile Card */}
 <motion.div 
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: 0.1 }}
 className="bg-white rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden ring-1 ring-slate-100 "
 >
 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-500"></div>
 
 <div className="mx-auto w-32 h-32 relative rounded-full border-4 border-white shadow-md overflow-hidden mb-4 bg-white">
 {/* If the user doesn't have the photo, it will just show the alt. For now we assume doctor-photo.jpeg is present. */}
 <Image 
 src="/doctor-photo.jpeg" 
 alt={doctorInfo.name} 
 fill
 className="object-cover"
 onError={(e) => {
 // Fallback if image not found
 e.currentTarget.style.display = 'none';
 }}
 />
 {/* Fallback Icon if image fails */}
 <div className="absolute inset-0 flex items-center justify-center bg-teal-100 text-teal-600 -z-10">
 <User size={48} />
 </div>
 </div>

 <h1 className="text-2xl font-bold text-slate-900 mb-1">{doctorInfo.name}</h1>
 <p className="text-teal-600 font-medium mb-1">{doctorInfo.title}</p>
 <p className="text-sm text-slate-500 mb-4">{doctorInfo.clinic}</p>

 <p className="italic text-slate-600 text-sm mb-6 pb-4 border-b border-slate-200 ">
 "Compassionate Care. Trusted Expertise."
 </p>

 {/* Quick Actions Grid */}
 <div className="grid grid-cols-4 gap-3">
 <a href={`tel:+91${doctorInfo.phone}`} className="flex flex-col items-center gap-2 group">
 <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
 <Phone size={20} />
 </div>
 <span className="text-[10px] font-medium text-slate-600 ">Call</span>
 </a>
 
 <a href={doctorInfo.whatsapp} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
 <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
 <MessageCircle size={20} />
 </div>
 <span className="text-[10px] font-medium text-slate-600 ">WhatsApp</span>
 </a>

 <a href={doctorInfo.mapUrl} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
 <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
 <MapPin size={20} />
 </div>
 <span className="text-[10px] font-medium text-slate-600 ">Location</span>
 </a>

 <button onClick={generateVCard} className="flex flex-col items-center gap-2 group">
 <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
 <Download size={20} />
 </div>
 <span className="text-[10px] font-medium text-slate-600 ">Save</span>
 </button>
 </div>
 </motion.div>

 {/* Highlights */}
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 className="flex justify-between items-center mt-6 px-2"
 >
 <div className="flex flex-col items-center text-center">
 <ShieldCheck className="text-teal-600 mb-1" size={24} />
 <span className="text-[11px] text-slate-600 ">Trusted<br/>Expertise</span>
 </div>
 <div className="flex flex-col items-center text-center">
 <HeartPulse className="text-teal-600 mb-1" size={24} />
 <span className="text-[11px] text-slate-600 ">Patient<br/>Focused</span>
 </div>
 <div className="flex flex-col items-center text-center">
 <Stethoscope className="text-teal-600 mb-1" size={24} />
 <span className="text-[11px] text-slate-600 ">Modern<br/>Approach</span>
 </div>
 </motion.div>

 {/* Social Links */}
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.25 }}
 className="mt-6 mb-2 flex justify-center gap-4"
 >
 <a href={doctorInfo.instagram} target="_blank" rel="noreferrer" className="p-3 bg-white rounded-full shadow-sm text-pink-600 hover:scale-110 transition-transform">
 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
 </a>
 <a href={doctorInfo.whatsapp} target="_blank" rel="noreferrer" className="p-3 bg-white rounded-full shadow-sm text-green-600 hover:scale-110 transition-transform">
 <MessageCircle size={20} />
 </a>
 <a href={`mailto:${doctorInfo.email}`} className="p-3 bg-white rounded-full shadow-sm text-red-500 hover:scale-110 transition-transform">
 <Mail size={20} />
 </a>
 </motion.div>

 {/* Services Section */}
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.3 }}
 className="mt-8"
 >
 <button 
 onClick={() => setIsSpecializationsOpen(!isSpecializationsOpen)}
 className="w-full flex justify-between items-center px-2 mb-4 group"
 >
 <h2 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors">Specializations</h2>
 <ChevronDown 
 size={20} 
 className={`text-slate-500 transition-transform duration-300 ${isSpecializationsOpen ? 'rotate-180' : ''}`}
 />
 </button>
 
 <AnimatePresence>
 {isSpecializationsOpen && (
 <motion.div 
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: "auto", opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 className="overflow-hidden"
 >
 <div className="grid grid-cols-2 gap-3 pb-2">
 {services.map((service, idx) => (
 <div key={idx} className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2">
 <div className="w-2 h-2 rounded-full bg-teal-500"></div>
 <span className="text-xs font-medium text-slate-700 ">{service}</span>
 </div>
 ))}
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </motion.div>

 {/* Contact Info Section */}
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.4 }}
 className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-100 p-5"
 >
 <h2 className="text-lg font-bold text-slate-900 mb-4">Contact Details</h2>
 
 <div className="space-y-4">
 <div className="flex items-start gap-4">
 <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
 <Phone size={18} />
 </div>
 <div>
 <p className="text-xs text-slate-500 ">Mobile</p>
 <a href={`tel:+91${doctorInfo.phone}`} className="text-sm font-medium text-slate-800 block">{doctorInfo.phoneDisplay}</a>
 </div>
 </div>

 <div className="flex items-start gap-4">
 <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
 <Mail size={18} />
 </div>
 <div>
 <p className="text-xs text-slate-500 ">Email</p>
 <a href={`mailto:${doctorInfo.email}`} className="text-sm font-medium text-slate-800 block">{doctorInfo.email}</a>
 </div>
 </div>

 <div className="flex items-start gap-4">
 <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
 <Clock size={18} />
 </div>
 <div>
 <p className="text-xs text-slate-500 ">Timing</p>
 <p className="text-sm font-medium text-slate-800 ">{doctorInfo.timings}</p>
 </div>
 </div>

 <div className="flex items-start gap-4">
 <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
 <MapPin size={18} />
 </div>
 <div>
 <p className="text-xs text-slate-500 ">Address</p>
 <p className="text-sm font-medium text-slate-800 leading-tight mb-1">{doctorInfo.address}</p>
 <a href={doctorInfo.mapUrl} target="_blank" rel="noreferrer" className="text-xs text-teal-600 font-medium inline-flex items-center">
 Get Directions <ChevronRight size={12} className="ml-1"/>
 </a>
 </div>
 </div>
 </div>
 </motion.div>

 {/* Spacer for bottom bar */}
 <div className="h-10"></div>
 </div>

 {/* Sticky Bottom Action Bar */}
 <motion.div 
 initial={{ y: 100 }}
 animate={{ y: 0 }}
 transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 20 }}
 className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white/90 backdrop-blur-md border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-40 px-4 py-3 flex justify-between items-center"
 >
 <button onClick={generateVCard} className="flex flex-col items-center text-slate-600 hover:text-teal-600 transition-colors">
 <Download size={20} className="mb-1" />
 <span className="text-[10px] font-medium">Save</span>
 </button>
 
 <a href={doctorInfo.whatsapp} target="_blank" rel="noreferrer" className="flex-1 max-w-[200px] mx-4">
 <div className="bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white py-3 rounded-full flex items-center justify-center font-semibold text-sm shadow-lg transform transition active:scale-95">
 <Calendar size={18} className="mr-2" />
 Book Appointment
 </div>
 </a>

 <a href={`tel:+91${doctorInfo.phone}`} className="flex flex-col items-center text-slate-600 hover:text-teal-600 transition-colors">
 <Phone size={20} className="mb-1" />
 <span className="text-[10px] font-medium">Call</span>
 </a>
 </motion.div>

 {/* QR Code Modal */}
 <AnimatePresence>
 {isQRModalOpen && (
 <motion.div 
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
 >
 <motion.div 
 initial={{ scale: 0.9, y: 20 }}
 animate={{ scale: 1, y: 0 }}
 exit={{ scale: 0.9, y: 20 }}
 className="bg-white rounded-[2.5rem] p-6 w-full max-w-sm shadow-2xl relative overflow-hidden ring-1 ring-slate-100 "
 >
 {/* Premium Gradient Header for Modal */}
 <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-teal-500 to-teal-700 rounded-t-[2.5rem] -z-10"></div>
 
 <button 
 onClick={() => setIsQRModalOpen(false)}
 className="absolute top-4 right-4 p-2 bg-black/10 backdrop-blur-sm rounded-full text-white hover:bg-black/20 transition"
 >
 <X size={20} />
 </button>
 
 <div className="text-center mt-6">
 <div className="mx-auto w-16 h-16 relative rounded-full border-[3px] border-white shadow-md overflow-hidden mb-3 bg-white">
 <Image 
 src="/doctor-photo.jpeg" 
 alt={doctorInfo.name} 
 fill 
 className="object-cover"
 onError={(e) => {
 e.currentTarget.style.display = 'none';
 }}
 />
 <div className="absolute inset-0 flex items-center justify-center bg-teal-100 text-teal-600 -z-10">
 <User size={24} />
 </div>
 </div>
 
 <h3 className="text-xl font-bold text-slate-900 mb-1">{doctorInfo.name}</h3>
 <p className="text-xs text-teal-600 font-bold mb-6 uppercase tracking-wider">{doctorInfo.clinic}</p>
 
 <div className="bg-white p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100 inline-block mx-auto transform hover:scale-105 transition-transform duration-300">
 {currentUrl ? (
 <QRCodeSVG 
 value={currentUrl} 
 size={180} 
 level="H" 
 includeMargin={false} 
 imageSettings={{
 src: "/doctor-photo.jpeg",
 x: undefined,
 y: undefined,
 height: 40,
 width: 40,
 excavate: true,
 }}
 />
 ) : (
 <div className="w-[180px] h-[180px] bg-slate-100 animate-pulse rounded-lg"></div>
 )}
 </div>

 <p className="text-xs text-slate-500 mt-6 mb-4 px-4 leading-relaxed">
 Scan to view digital visiting card and book an appointment.
 </p>

 <div className="mt-2">
 <button onClick={handleShare} className="w-full py-3.5 bg-teal-50 text-teal-700 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-teal-100 transition shadow-sm">
 <Share2 size={16} /> Share Link
 </button>
 </div>
 </div>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>

 </main>
 );
}
