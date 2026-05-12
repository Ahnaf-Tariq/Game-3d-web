import { Constant } from "@/data/Data";

export const SectionLabel = ({
  tag,
  accent = Constant.cyan,
}: {
  tag: string;
  accent?: string;
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 12,
      }}
    >
      <span
        style={{
          width: 28,
          height: 1,
          background: accent,
          display: "inline-block",
          boxShadow: `0 0 8px ${accent}`,
        }}
      />
      <span
        style={{
          fontFamily: Constant.font,
          fontSize: 11,
          letterSpacing: "0.35em",
          color: accent,
          textTransform: "uppercase",
        }}
      >
        {tag}
      </span>
    </div>
  );
};
