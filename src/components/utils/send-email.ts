// import { FormData } from "../forms/AbstractForm";
export interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
    file?: File;
    formLabel?: string;
  
    [key: string]: string | File | undefined;
  }

export const sendEmail = async (formData: FormData): Promise<boolean> => {
    
    if (formData.file && formData.file.size > 5 * 1024 * 1024) {
        console.error('File is too large');
        return false;
    }

    let payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        formLabel: formData.formLabel
    } as any;
    // convert file to base64, include filename in payload
    if (formData.file) {
        // console.log("file", formData.file);
        const reader = new FileReader();
        reader.readAsDataURL(formData.file);
        await new Promise<void>((resolve, reject) => {
            reader.onload = () => {
                if (reader.result) {
                    payload.file = reader.result as string;
                    payload.fileName = formData.file?.name;
                    resolve();
                } else {
                    reject();
                }
            };
        })
    }
    // console.log("keys", Object.keys(payload));

    
    const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        // console.error('Failed to send email');
        return false;
    } else {
        // console.log('Email sent successfully');
        return true;
    }
}

// export const sendEmail = async (formData: FormData): Promise<boolean> => {
//     const form = new FormData();

//     // Add all fields to the form data
//     Object.keys(formData).forEach(key => {
//         if (key === 'file' && formData.file instanceof File) {
//             // check if file is less than 5mb
//             if (formData.file.size > 5 * 1024 * 1024) {
//                 console.error('File is too large');
//                 return false;
//             }
//             form.append('file', formData.file, formData.file.name);
//         } else if (formData[key] !== undefined) {
//             form.append(key, formData[key] as string);
//         }
//     });

//     try {
//         const response = await fetch('/api/email', {
//             method: 'POST',
//             body: form,
//             // No need to set Content-Type header, it will be set automatically
//         });

//         if (!response.ok) {
//             console.error('Failed to send email');
//             return false;
//         } else {
//             console.log('Email sent successfully');
//             return true;
//         }
//     } catch (error) {
//         console.error('Error sending email:', error);
//         return false;
//     }
// }