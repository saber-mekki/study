import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { useTranslation } from "react-i18next";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export function PdfViewer({ file }) {
  const canvasRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!file) return;

    const loadingTask = pdfjsLib.getDocument({ url: file });

    loadingTask.promise
      .then(loadedPdf => {
        setPdf(loadedPdf);
        setNumPages(loadedPdf.numPages);
        setPageNumber(1);
        setError(null);
      })
      .catch(err => {
        console.error("Error loading PDF: ", err);
        setError(t("Impossible de charger le PDF."));
      });
  }, [file]);

  useEffect(() => {
    if (!pdf) return;

    pdf.getPage(pageNumber).then(page => {
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      page.render({ canvasContext: context, viewport });
    });
  }, [pdf, pageNumber]);

  return error ? (
    <div className="text-danger">{error}</div>
  ) : (
    <div>
      <div style={{ border: "1px solid #ccc", display: "inline-block" }}>
        <canvas ref={canvasRef} />
      </div>
      <div className="mt-2">
        <button
          onClick={() => setPageNumber(p => Math.max(1, p - 1))}
          disabled={pageNumber <= 1}
          className="btn btn-secondary me-2"
        >
          ← {t("Page précédente")}
        </button>
        <button
          onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
          disabled={pageNumber >= numPages}
          className="btn btn-secondary"
        >
          {t("Page suivante")} →
        </button>
        <span className="ms-3">
          {t("Page")} {pageNumber} {t("sur")} {numPages}
        </span>
      </div>
    </div>
  );
}
