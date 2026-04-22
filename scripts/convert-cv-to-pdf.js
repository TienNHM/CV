const fs = require("fs");
const path = require("path");
const { mdToPdf } = require("md-to-pdf");

async function main() {
  const inputArg = process.argv[2] || "templates/cv-template.md";
  const outputArg = process.argv[3] || "output/cv.pdf";

  const inputPath = path.resolve(process.cwd(), inputArg);
  const outputPath = path.resolve(process.cwd(), outputArg);
  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(inputPath)) {
    console.error(`Input markdown file not found: ${inputPath}`);
    process.exit(1);
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const result = await mdToPdf(
    { path: inputPath },
    {
      dest: outputPath,
      stylesheet: [],
      css: `
        @page {
          size: A4;
          margin: 10mm 12mm;
        }

        * {
          box-sizing: border-box;
        }

        body {
          font-family: "Arial", "Helvetica", sans-serif;
          font-size: 10.3pt;
          line-height: 1.42;
          color: #1a1a1a;
          margin: 0;
        }

        body > * {
          max-width: 100%;
        }

        p {
          margin: 0.2em 0 0.45em 0;
        }

        a {
          color: #0d47a1;
          text-decoration: none;
          border-bottom: 1px solid #90caf9;
        }

        strong {
          color: #0f172a;
        }

        h1, h2, h3 {
          margin: 0;
          page-break-after: avoid;
          break-after: avoid;
        }

        h1 {
          font-size: 18pt;
          line-height: 1.15;
          letter-spacing: 0.3px;
          text-transform: uppercase;
          margin-top: 0;
          margin-bottom: 0.28em;
          color: #0f172a;
        }

        h2 {
          font-size: 11pt;
          font-weight: 700;
          letter-spacing: 0.2px;
          text-transform: uppercase;
          border-bottom: 1px solid #c9d6e8;
          padding-bottom: 4px;
          margin-top: 0.95em;
          margin-bottom: 0.4em;
          color: #0b3a75;
        }

        h3 {
          font-size: 10.4pt;
          font-weight: 700;
          margin-top: 0.5em;
          margin-bottom: 0.24em;
          color: #1f2937;
        }

        ul {
          margin: 0.22em 0 0.52em 0;
          padding-left: 1.08em;
        }

        li {
          margin: 0.14em 0;
        }

        hr {
          border: none;
          border-top: 1px solid #dbe5f1;
          margin: 0.5em 0;
        }

        h2 + ul,
        h3 + ul {
          margin-top: 0.2em;
        }

        h2, h3, p, ul {
          orphans: 3;
          widows: 3;
        }

        h2, h3, li {
          page-break-inside: avoid;
          break-inside: avoid;
        }
      `,
      pdf_options: {
        format: "A4",
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: `<div></div>`,
        footerTemplate: `
          <div style="width:100%; font-size:8.5px; color:#666; padding:0 12mm; font-family:Arial, Helvetica, sans-serif; display:flex; justify-content:flex-end;">
            <span>Page <span class="pageNumber"></span> / <span class="totalPages"></span></span>
          </div>
        `,
        margin: {
          top: "18mm",
          right: "12mm",
          bottom: "18mm",
          left: "12mm"
        }
      }
    }
  );

  if (!result || !result.filename) {
    console.error("Failed to generate PDF.");
    process.exit(1);
  }

  console.log(`PDF generated: ${result.filename}`);
}

main().catch((error) => {
  console.error("Convert markdown to PDF failed.");
  console.error(error);
  process.exit(1);
});
