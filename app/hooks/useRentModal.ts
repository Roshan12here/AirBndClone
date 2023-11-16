"use client"

import { create } from 'zustand';

interface CarRentalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const HomeRentModal= create<CarRentalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default HomeRentModal;
