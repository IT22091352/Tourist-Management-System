import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PdfComp from './PdfComp';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function SendPdf() {

    const [title, setTitle] = useState("");
    const [file, saveFile] = useState("");
    const [allpdf, setAllPdf] = useState(null);
    const [pdfFile, setPDFFile] = useState(null);


    useEffect(() => {
        getpdf();
    }, []);

    const getpdf = async () => {
        const result = await axios.get("http://localhost:5000/getFile");
        console.log(result.data.data);
        setAllPdf(result.data.data);
    };

    const submitPdf = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append("file", file);
        console.log(title, file);



        try {
            const result = await axios.post("http://localhost:5000/uploadFile",
                formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log(result);

            if (result.data.status === 200) {
                alert("Upload Success")
                getpdf();
            } else {
                alert("Upload Error");
            }

        } catch (error) {
            console.error("Error Uploading : " + error.message);
            alert("Error Uploading :  ");
        }
    };

    const showPdf = (pdf) =>{
        setPDFFile(`http://localhost:5000/file/${pdf}`);
    };
    return (
        <div>
            <h1>Send PDF</h1>
            <form onSubmit={submitPdf}>
                <label>Pdf Title</label><br />
                <input required type='text' onChange={(e) => setTitle(e.target.value)} /><br />
                <label>Select PDF File</label><br />
                <input type='file' accept='application/pdf' onChange={(e) => saveFile(e.target.files[0])} required /><br /><br />
                <button>Submit</button>
            </form>
        <div>
            <h4>PDF details</h4>
            {allpdf == null ? "" : allpdf.map((data)=>(
                <div key={data._id}>
                    <h1>Title:{data.title}</h1>
               
                    <button onClick={() => showPdf(data.pdf)}>Show PDF</button>
                    </div>
            ))}
            
            </div>
            <PdfComp pdfFile={pdfFile}/>
        </div>
    );
}

export default SendPdf;
