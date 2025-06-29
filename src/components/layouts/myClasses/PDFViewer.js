import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export function PdfViewer({ file }) {
  const canvasRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [error, setError] = useState(null);

  // Load PDF document
  useEffect(() => {
    if (!file) return;

    const loadingTask = pdfjsLib.getDocument(file);

    loadingTask.promise
      .then(loadedPdf => {
        setPdf(loadedPdf);
        setNumPages(loadedPdf.numPages);
        setPageNumber(1);
        setError(null);
      })
      .catch(err => {
        console.error("Error loading PDF: ", err);
        setError("Impossible de charger le PDF.");
      });
  }, [file]);

  // Render the current page
  useEffect(() => {
    if (!pdf) return;

    pdf.getPage(pageNumber).then(page => {
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      page.render(renderContext);
    });
  }, [pdf, pageNumber]);

  const goPrevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const goNextPage = () => {
    if (pageNumber < numPages) setPageNumber(pageNumber + 1);
  };

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div>
      <div style={{ border: "1px solid #ccc", display: "inline-block" }}>
        <canvas ref={canvasRef} />
      </div>
      <div className="mt-2">
        <button
          onClick={goPrevPage}
          disabled={pageNumber <= 1}
          className="btn btn-secondary me-2"
        >
          ← Page précédente
        </button>
        <button
          onClick={goNextPage}
          disabled={pageNumber >= numPages}
          className="btn btn-secondary"
        >
          Page suivante →
        </button>
        <span className="ms-3">
          Page {pageNumber} sur {numPages}
        </span>
      </div>
    </div>
  );
}
