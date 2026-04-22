## Convert Markdown CV to A4 PDF

This repository includes a small tool powered by `md-to-pdf` to export CV Markdown to PDF A4.

### 1) Install dependencies

```bash
npm install
```

### 2) Convert default template

```bash
npm run cv:pdf:template
```

Output file: `output/cv-template.pdf`

### 3) Convert your own markdown file

```bash
npm run cv:pdf -- path/to/your-cv.md output/your-cv.pdf
```

If you skip arguments, defaults are:

- Input: `templates/cv-template.md`
- Output: `output/cv.pdf`
