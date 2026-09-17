---
name: clean-converted-markdown
description:
  Clean and reconstruct converted Markdown (.md) produced by AnyDoc,
  PDF-to-Markdown, HTML-to-Markdown, OCR, or Office document converters while
  preserving all real content. Use when the user asks to clean, fix, normalize,
  format, or remove conversion artifacts from an existing Markdown file.
---

# Clean Converted Markdown

Clean the Markdown file supplied by the user in place unless they explicitly
request a different output file. The source PDF, HTML page, or office document
is not required and should not be opened unless the user asks for source
comparison.

The goal is a readable, structurally correct GitHub-Flavored Markdown document
with the original semantic content intact.

## Non-negotiable preservation rules

1. Preserve every unique piece of meaningful content: titles, paragraphs,
   definitions, examples, exercises, warnings, names, dates, numbers, captions,
   citations, footnotes, links, image references, code, and table data.
2. Do not summarize, shorten, modernize, translate, or silently rewrite the
   author's ideas.
3. Do not invent missing words, table cells, headings, relationships, or reading
   order. If reconstruction is uncertain, retain the text and apply only safe
   formatting.
4. Do not correct factual claims. Correct spelling, punctuation, mojibake, and
   obvious extraction errors only when the intended text is unambiguous.
5. Remove text only when it is clearly conversion noise or repeated page
   furniture, never merely because it looks unimportant.
6. Preserve intentional repetition. Merge repeated text only when it is clearly
   a running header, footer, page label, or continuation title introduced by the
   source layout.
7. Preserve valid raw HTML when Markdown has no equivalent or conversion would
   lose meaning, including details, superscripts, subscripts, and complex
   tables.

## Workflow

### 1. Inspect before editing

Read the complete Markdown file. For large files, read it in broad consecutive
sections and keep enough overlap to identify paragraphs or tables split across
boundaries.

Determine:

- The apparent document hierarchy and section numbering.
- Whether the source was probably paginated, slide-based, HTML, OCR, or a
  spreadsheet.
- Which repeated elements are real content and which are page furniture.
- Whether tables represent actual tabular data or accidental layout detection.
- Whether line breaks carry meaning, as in poetry, addresses, code, or verse.

Do not start with global replacements before understanding these patterns.

### 2. Establish the structure

- Keep one level-1 heading for the document title when a title exists.
- Use heading levels in order without skipping levels unnecessarily.
- Convert bold text used solely as a section title into a real heading.
- Separate headings that were concatenated with body text or another heading.
- Rebuild a converted table of contents as a nested Markdown list when it is not
  genuinely tabular.
- Keep section numbers consistent, including punctuation such as `2.3.1.`.
- Merge continuation headings such as `(cont.)` into the existing section when
  they only indicate a page or slide break. Retain `(cont.)` if it has semantic
  significance.
- Do not create a heading from an emphasized sentence that functions as body
  text, a warning, or a callout.

### 3. Reconstruct prose and lists

- Join lines split by page width when they belong to the same paragraph.
- Join words hyphenated only because of a line or page break. Preserve genuine
  compound words and intentional hyphens.
- Split concatenated paragraphs when a clear topic, list, or heading boundary
  exists.
- Convert embedded bullet glyphs such as `o`, `v`, `Ø`, `•`, `▪`, `●`, `✓`, or
  copied numbering into properly nested Markdown lists.
- Preserve list ordering and nesting. Do not turn an unordered list into an
  ordered process unless the text establishes an order.
- Place definitions, labels, examples, responsible parties, dates, and budgets
  at the correct list depth when the relationship is clear.
- Add missing spaces around punctuation only when doing so cannot alter code,
  URLs, identifiers, or mathematical notation.
- Remove accidental duplicate spaces and excessive blank lines.

### 4. Repair tables conservatively

Keep a Markdown table only when the content has a real row-and-column
relationship and each row can be reconstructed confidently.

For malformed layout tables:

- Convert the content to headings, paragraphs, definition-style entries, or
  nested lists.
- Preserve every meaningful cell in a sensible reading order.
- Remove empty layout columns and repeated page furniture.
- Never guess missing cells or align unrelated fragments merely to retain table
  syntax.

For genuine data tables:

- Ensure every row has the same number of columns.
- Add a valid delimiter row.
- Escape literal pipe characters inside cells.
- Keep units, signs, empty values, and column labels intact.
- Use raw HTML tables only when row spans, column spans, or multiline content
  cannot be represented without loss in Markdown.

### 5. Handle source-specific artifacts

#### PDF and slide conversions

Look for:

- Running headers, footers, course names, document titles, and isolated page or
  slide numbers repeated on every page.
- Reading-order errors caused by columns, diagrams, text boxes, or speaker-note
  layouts.
- Headers duplicated with `(cont.)` on each slide.
- Bullets flattened into prose and nested bullets represented by arbitrary
  glyphs.
- Diagrams converted into pseudo-tables. Express them as prose or lists only
  when their relationships are recoverable.
- Captions detached from images or figures. Reattach them when the association
  is clear.

#### HTML-to-Markdown conversions

Look for:

- Unconverted entities such as `&nbsp;`, `&amp;`, `&lt;`, numeric entities, and
  zero-width characters.
- Empty anchors, duplicated linked text, broken fragment links, and bare URLs
  accidentally joined together.
- Navigation, cookie notices, share controls, breadcrumbs, sidebars, repeated
  site chrome, and footer boilerplate. Remove these only when they are clearly
  unrelated to the document's main content.
- Raw `style`, `script`, tracking, SVG, or template fragments that have no
  content value.
- Headings created from menus, buttons, or accessibility labels.
- Excessive `<br>` tags, empty HTML elements, and nested emphasis tags.
- Code blocks that lost their fences or language identifiers.

#### Word, PowerPoint, and office conversions

Look for:

- Headers, footers, slide numbers, revision fields, and empty placeholders.
- Text split because formatting changed mid-sentence.
- SmartArt or text boxes emitted in the wrong order.
- Lists whose numbering restarted because of page boundaries.
- Spreadsheet ranges converted into uneven tables.
- Speaker notes mixed into slide content. Preserve them under a clearly labeled
  notes subsection when they are meaningful.

#### OCR and encoding artifacts

Look for:

- Mojibake such as `Â`, `Ã`, `â€™`, or replacement characters.
- Ligatures and look-alike characters, such as `ﬁ`, `ﬂ`, `0/O`, or `1/l`.
- Words broken by page boundaries, stray repeated punctuation, and isolated
  glyphs.
- Incorrect accents or symbols only when the intended character is certain from
  context.

Do not guess illegible text. Preserve uncertain text rather than replacing it
with a plausible invention.

### 6. Normalize Markdown

- Use GitHub-Flavored Markdown consistently.
- Leave one blank line around headings, lists, fenced code blocks, blockquotes,
  and tables.
- Use `-` for unordered lists and `1.` style numbering for ordered lists.
- Use consistent nested-list indentation.
- Remove fragmented emphasis such as adjacent `**one** **phrase**` when it is a
  single emphasized phrase.
- Keep emphasis only where it appears meaningful; do not bold every label or
  heading redundantly.
- Use fenced code blocks for multiline code and preserve code exactly.
- Give links descriptive text when the existing context supplies it; otherwise
  preserve the original URL.
- Keep image syntax and alt text. Do not remove an image merely because the
  referenced file is unavailable.
- Decode safe HTML entities but preserve entities needed to avoid Markdown or
  HTML ambiguity.
- Apply typographic consistency without changing meaning, names, identifiers,
  quoted wording, or values.

### 7. Validate after editing

Read the final document again, including transitions around every area that was
heavily reconstructed.

Check that:

- All original semantic sections remain present.
- Heading levels form a coherent hierarchy.
- Lists render with the intended nesting.
- Genuine tables are valid and false tables are gone.
- Code fences, links, images, and HTML tags are balanced.
- No paragraph ends abruptly and resumes in an unrelated section.
- No obvious page furniture, mojibake, continuation labels, or embedded bullet
  glyphs remain.
- No conversion cleanup note or agent commentary was inserted into the document.

Useful searches, adapted to the document language and observed artifacts:

```bash
rg -n "Â|Ã|â€™|�|\\(cont\\.\\)|[Ø✓•▪●]" "document.md"
rg -n "^\\|.*\\|$|^#{1,6} .*#{1,6}|\\*\\*\\s+\\*\\*" "document.md"
```

Format and lint when Node tooling is available:

```bash
npx -y prettier --write --prose-wrap always "document.md"
npx -y markdownlint-cli2 "document.md"
```

Treat linter findings as review prompts, not permission to remove or rewrite
content. Resolve valid structural findings. If a rule conflicts with faithful
preservation, preserve the content and explain the remaining exception to the
user.

## Completion report

Report:

- The path of the cleaned file.
- The main artifact classes corrected.
- Whether formatting and lint validation passed.
- Any ambiguous fragment deliberately left unchanged to avoid content loss.

Do not claim that content was preserved unless the complete resulting file was
reviewed after editing.
