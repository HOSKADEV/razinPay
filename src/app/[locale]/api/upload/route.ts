import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req : NextRequest, res:NextResponse) => {
    const formData = await req.formData();
    const file = formData.get("image");
    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }
    
    const fileBlob = await (file as any).blob();
    console.log("File Blob", fileBlob);
    const buffer = await new Promise<Buffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            resolve(Buffer.from(arrayBuffer));
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(fileBlob);
    });

    const filename = Date.now() + (file as File).name.replaceAll(" ", "_");
    try {
        await writeFile(
          path.join(process.cwd(), "public/uploads/" + filename),
          buffer
        );
        return NextResponse.json({ Message: "Success", status: 201 });
    } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ Message: "Failed", status: 500 });
    }
};