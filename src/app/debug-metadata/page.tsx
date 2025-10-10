import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debug Metadata Test",
  description: "This is a test page to verify metadata is working",
  keywords: ["test", "debug", "metadata"],
  openGraph: {
    title: "Debug Metadata Test",
    description: "This is a test page to verify metadata is working",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Debug Metadata Test",
    description: "This is a test page to verify metadata is working",
  },
};

export default function DebugMetadataPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Metadata Test</h1>
      <p>
        Check the page source (Ctrl+U) to see if metadata is present in the
        &lt;head&gt; tag.
      </p>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="font-bold mb-2">Expected metadata in &lt;head&gt;:</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            &lt;title&gt;Debug Metadata Test | Code Snippets
            Platform&lt;/title&gt;
          </li>
          <li>
            &lt;meta name=&quot;description&quot; content=&quot;This is a test
            page...&quot;&gt;
          </li>
          <li>
            &lt;meta name=&quot;keywords&quot; content=&quot;test, debug,
            metadata&quot;&gt;
          </li>
          <li>
            &lt;meta property=&quot;og:title&quot; content=&quot;Debug Metadata
            Test&quot;&gt;
          </li>
          <li>
            &lt;meta property=&quot;og:description&quot; content=&quot;This is a
            test page...&quot;&gt;
          </li>
          <li>
            &lt;meta name=&quot;twitter:card&quot;
            content=&quot;summary_large_image&quot;&gt;
          </li>
        </ul>
      </div>
    </div>
  );
}
