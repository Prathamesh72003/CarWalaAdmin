"use client";

import type React from "react";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CarOwnerData {
  name: string;
  phoneNumber: string;
}

export default function CarNumberSearch({ isAdmin = false }) {
  const [carNumber, setCarNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ownerData, setOwnerData] = useState<CarOwnerData | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");

  // Mock function to fetch car owner data
  const fetchCarOwnerData = async (carNumber: string) => {
    setIsLoading(true);
    setError("");

    try {
      // In a real implementation, this would be an API call
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock response - in production this would come from your API
      if (carNumber.trim().toUpperCase() === "MH12KJ0650") {
        setOwnerData({
          name: "BALAJI RAMHARI LONDHE",
          phoneNumber: "9876543210",
        });
      } else {
        setError("No data found for this car number");
        setOwnerData(null);
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again." + err);
      setOwnerData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (carNumber.trim()) {
      fetchCarOwnerData(carNumber);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check if file is PDF
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed");
        return;
      }
      setSelectedFile(file);
      setError("");
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setError("Please select a PDF file first");
      return;
    }
    setShowConfirmation(true);
  };

  const confirmUpload = async () => {
    setShowConfirmation(false);
    setIsLoading(true);

    try {
      // In a real implementation, this would be an API call to upload the file
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form after successful upload
      setSelectedFile(null);
      setCarNumber("");
      setOwnerData(null);
      // Show success message
      alert("PDF uploaded successfully");
    } catch (err) {
      setError("Failed to upload PDF. Please try again." + err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 rounded-xl bg-green-100 shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 font-handwriting">
        Enter car number
      </h2>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <Input
            type="text"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
            className="pr-10 py-2 text-lg rounded-md border-gray-300 bg-white"
            placeholder="Enter car number"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            disabled={isLoading}
          >
            <Search className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {ownerData && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1">
              <div className="mb-1">Car owner&aposs name</div>
              <Input
                type="text"
                value={ownerData.name}
                readOnly
                className="bg-white py-2 text-lg"
              />
            </div>
            {isAdmin && (
              <div className="md:w-64">
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  <div className="h-10 px-4 py-2 bg-white rounded-md border border-input flex items-center justify-center text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground">
                    {selectedFile
                      ? selectedFile.name.substring(0, 20) + "..."
                      : "Select PDF"}
                  </div>
                  <input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1">
              <div className="mb-1">Owner&aposs phone number</div>
              <Input
                type="text"
                value={ownerData.phoneNumber}
                readOnly
                className="bg-white py-2 text-lg"
              />
            </div>
            {isAdmin && (
              <div className="md:w-64">
                <Button
                  onClick={handleUpload}
                  disabled={!selectedFile || isLoading}
                  className="w-full"
                >
                  Upload PDF
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Upload</DialogTitle>
            <DialogDescription>
              Are you sure you want to upload this PDF?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
            >
              No
            </Button>
            <Button onClick={confirmUpload}>Yes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}