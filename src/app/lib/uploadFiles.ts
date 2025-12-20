export const uploadFiles = async (files: (File | Blob)[] | null): Promise<number[] | null> => {
    if (!files || files.length === 0) {
        return null;
    }
    
    const formData = new FormData();
    files.forEach((file) => {
        formData.append("files", file);
    });
    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`, {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            throw new Error(`Upload failed with status ${res.status}`);
        }

        const items = await res.json();
        const idArray = items.map((item: any) => item.id);

        return idArray;
    } catch (err) {
        return null;
    }
}