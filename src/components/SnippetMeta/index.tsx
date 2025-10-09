import Link from "next/link";
import LanguageColor from "@/components/LanguageColor";
import UITag from "@/components/UITag";
import { analyzeComplexity } from "@/lib/complexity";

type LanguageRef = { id: string; name: string } | null | undefined;
type TopicEdge = { topic: { id: string; name: string } }[] | undefined;
type UserRef = { id: string; name: string | null } | null | undefined;

const SnippetMeta = ({
  language,
  topics,
  user,
  code,
  previewLength = 240,
  isTopicPage = false,
  isLanguagePage = false,
  isUserProfilePage = false,
}: {
  language?: LanguageRef;
  topics?: TopicEdge;
  user?: UserRef;
  code?: string;
  previewLength?: number;
  isTopicPage?: boolean;
  isLanguagePage?: boolean;
  isUserProfilePage?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-2">
      {!isUserProfilePage && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <p>Created By:</p>
            <Link
              href={`/u/${user?.id ?? ""}`}
              className="hover:underline text-blue-700"
            >
              {user?.name || "Unknown"}
            </Link>
          </div>
        </div>
      )}
      {!isLanguagePage && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <p>Programming Language:</p>
          <Link
            href={`/tags/language/${language?.id ?? ""}`}
            className="hover:underline"
          >
            <LanguageColor language={language?.name || "Unknown"} />
          </Link>
        </div>
      )}
      {!isTopicPage && (
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <p>Topics:</p>
          <div className="flex flex-wrap gap-2">
            {(topics ?? []).length === 0 ? (
              <UITag>—</UITag>
            ) : (
              (topics ?? []).map((t) => (
                <Link
                  key={t.topic.id}
                  href={`/tags/topic/${t.topic.id}`}
                  className="hover:underline"
                >
                  <UITag>{t.topic.name}</UITag>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
      {typeof code === "string" ? (
        <div className="bg-gray-100 rounded-xl p-4 font-mono text-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">Code Preview</span>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                Complexity: {analyzeComplexity(code)}
              </span>
            </div>
          </div>
          <pre className="whitespace-pre-wrap break-words text-gray-800">
            {code.slice(0, previewLength)}
            {code.length > previewLength ? "\n..." : ""}
          </pre>
        </div>
      ) : null}
    </div>
  );
};

export default SnippetMeta;
