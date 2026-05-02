interface StarRatingProps {
  value: number;
  max?: number;
}

export function StarRating({ value, max = 5 }: StarRatingProps) {
  return (
    <span className="text-sm">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} style={{ color: i < value ? "#f59e0b" : "#374151" }}>
          ★
        </span>
      ))}
    </span>
  );
}
