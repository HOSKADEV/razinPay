import React, { useState } from 'react';
import { Input } from './ui/input';
import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ExclamationTriangleIcon } from "@radix-ui/react-icons" 
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"
import { useTranslation } from 'react-i18next';
import { useEdgeStore } from "@/providers/edgestore-provider";

const DragAndDrop = () => {
    const [dragging, setDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(false);
    const { edgestore } = useEdgeStore();

    const {t} = useTranslation(["common"]);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        setIsUploading(true);
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);

        const files = e.dataTransfer.files;
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (files?.length && files.length > 1) {
            setIsUploading(false);
            return;
        }
        const file = files[0];
        if (allowedTypes.includes(file.type)) {
            setSelectedFile(file);
            uploadImage(file); // Call the uploadImage function
        } else {
            setError(true);
        }
        setIsUploading(false);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsUploading(true);
        const files = e.target.files;
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

        if (files?.length && files.length > 1) {
            setIsUploading(false);
            return;
        }
        if (files) {
            const file = files[0];
            if (allowedTypes.includes(file.type)) {
                setSelectedFile(file);
                const imageUrl = uploadImage(file); 
            } else {
                setError(true);
            }
        }
        setIsUploading(false);
    };

    const uploadImage = async (file: File) => {
        const response = await edgestore.publicFiles.upload({ 
          file
        });
    
        return response.url;
    }

    return (
        <div>
            <label>
                <div
                    className={` ${dragging ? 'dragging' : ''} border-2 border-dashed border-primary rounded-md p-10 grid place-items-center`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <ImagePlus size={24} className='text-primary' />
                </div>
                <Input type="file" accept="image/*" onChange={handleFileInputChange} className='hidden' />
            </label>
            {selectedFile && !error && !isUploading && (
                <div className='relative'>
                    <Image src={URL.createObjectURL(selectedFile)} alt="Preview" height={101} width={162} />
                    <Button variant="ghost" size="icon" className='absolute top-0 right-0' onClick={() => setSelectedFile(null)}><X /></Button>
                </div>
            )}
            {
                error && (
                    <Alert variant="destructive" className='my-4'>
                        <div className='flex'>
                            <ExclamationTriangleIcon className="h-4 w-4 rtl:ml-2 ltr:mr-2" />
                            <AlertTitle>{t("common:error.title")}</AlertTitle>
                        </div>
                      <AlertDescription>
                        {t("common:error.uploading-image")}
                      </AlertDescription>
                    </Alert>
                )
            }
        </div>
    );
};

export default DragAndDrop;
