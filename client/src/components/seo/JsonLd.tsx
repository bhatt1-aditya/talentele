type JsonLdProps = { data: Record<string, unknown> | Record<string, unknown>[] };

/** Renders schema.org structured data. Content comes from our own typed data, never user input. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
